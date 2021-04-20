import {NgModule, Optional} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';
import {DesignAction, DesignEvent, DesignModelType} from './models/design.model';
import {DesignUtil} from './utils/design.util';
import {TranslationDirective} from './directives/translation.directive';
import {ConfigurationDirective} from './directives/configuration.directive';
import {LessifyConfigurationService} from './services/configuration.service';
import {LessifyTranslationService} from './services/translation.service';
import {LessifyLoggerService} from './services/logger.service';

const LESSIFY_WINDOW = 'lessify';

@NgModule({
  declarations: [
    TranslationDirective,
    ConfigurationDirective,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    TranslationDirective,
    ConfigurationDirective,
  ],
  providers: [
    LessifyConfigurationService,
    LessifyTranslationService,
    LessifyLoggerService
  ]
})
export class LessifyCoreModule {
  constructor(
      private readonly configurationService: LessifyConfigurationService,
      @Optional() private readonly translateService: TranslateService,
      @Optional() private readonly translocoService: TranslocoService,
      private readonly logger: LessifyLoggerService,
  ) {
    this.logger.debug(`LessifyCoreModule : constructor -> ${DesignUtil.isInIframe()} - ${window.location}`);
    if (DesignUtil.isInIframe() && !window[LESSIFY_WINDOW]) {
      window[LESSIFY_WINDOW] = {editor: true};
      this.logger.debug('Start message listener');
      window.addEventListener('message', (event: MessageEvent<DesignEvent>) => {
        if (event.origin !== 'https://app.lessify.io' && event.origin !== 'https://dev-app.lessify.io' && event.origin !== 'http://localhost:4200') {
          return;
        }
        this.logger.debug(event);
        if (event.data.action === DesignAction.UPDATE) {
          switch (event.data.type) {
            case DesignModelType.TRANSLATION: {
              if (this.translateService) {
                this.translateService.set(event.data.id, event.data.value.toString(), event.data.locale);
              } else if (this.translocoService) {
                this.translocoService.setTranslationKey(event.data.id, event.data.value.toString(), event.data.locale);
              }
              break;
            }
            case DesignModelType.CONFIGURATION: {
              this.configurationService.set(event.data.id, event.data.value);
              break;
            }
            default: {
              this.logger.warn('Unknown data type.');
            }
          }
        } else if (event.data.action === DesignAction.RELOAD) {
          window.location.reload();
        } else {
          this.logger.warn('Unknown data action.');
        }
      });
    }
  }
}
