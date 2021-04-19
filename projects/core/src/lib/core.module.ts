import {NgModule, Optional} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ConfigurationService} from './services/configuration.service';
import {TranslationService} from './services/translation.service';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';
import {DesignAction, DesignEvent, DesignModelType} from './models/design.model';
import {DesignUtil} from './utils/design.util';
import {TranslationDirective} from './directives/translation.directive';
import {ConfigurationDirective} from './directives/configuration.directive';
import {Router} from '@angular/router';

const LESSIFY_WINDOW = 'lessify';

@NgModule({
  id: 'lessify-core',
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
    ConfigurationService,
    TranslationService
  ]
})
export class LessifyCoreModule {
  constructor(
      private readonly configurationService: ConfigurationService,
      @Optional() private readonly translateService: TranslateService,
      @Optional() private readonly translocoService: TranslocoService,
      private readonly router: Router,
  ) {
    // console.log(`LessifyEditorModule : constructor -> ${this.isInIframe()} - ${window.location}`);
    if (DesignUtil.isInIframe() && !window[LESSIFY_WINDOW]) {
      window[LESSIFY_WINDOW] = {editor: true};
      console.log('Start message listener');
      window.addEventListener('message', (event: MessageEvent<DesignEvent>) => {
        if (event.origin !== 'https://app.lessify.io' && event.origin !== 'https://dev-app.lessify.io' && event.origin !== 'http://localhost:4200') {
          return;
        }
        console.log(event);
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
              console.log('Unknown data type.');
            }
          }
        } else if (event.data.action === DesignAction.RELOAD) {
          window.location.reload();
        } else {
          console.log('Unknown data action.');
        }
      });
    }
  }
}
