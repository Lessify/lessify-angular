import {NgModule, Optional} from '@angular/core';
import {LessifyTranslationDirective} from './directives/lessify-translation.directive';
import {LessifyConfigurationDirective} from './directives/lessify-configuration.directive';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';
import {DesignAction, DesignEvent, DesignModelType} from './models/design.model';

const LESSIFY_WINDOW = 'lessify';

@NgModule({
  declarations: [
    LessifyTranslationDirective,
    LessifyConfigurationDirective
  ],
  exports: [
    LessifyTranslationDirective,
    LessifyConfigurationDirective
  ]
})
export class LessifyEditorModule {
  constructor(
      @Optional() private readonly translateService: TranslateService,
      @Optional() private readonly translocoService: TranslocoService
  ) {
    console.log(`LessifyEditorModule : constructor -> ${this.isInIframe()} - ${window.location}`);
    if (this.isInIframe() && !window[LESSIFY_WINDOW]) {
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
                this.translateService.set(event.data.id, event.data.value, event.data.locale);
              } else if (this.translocoService) {
                this.translocoService.setTranslationKey(event.data.id, event.data.value, event.data.locale);
              }
              break;
            }
            case DesignModelType.CONFIGURATION: {
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

  isInIframe(): boolean {
    return window.location !== window.parent.location;
  }
}
