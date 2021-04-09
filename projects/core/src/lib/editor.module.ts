import {NgModule, Optional} from '@angular/core';
import {LessifyTranslationDirective} from './directives/lessify-translation.directive';
import {LessifyConfigurationDirective} from './directives/lessify-configuration.directive';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';
import {DesignEvent} from './models/design.model';

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
        console.log(event);
      });
    }
  }

  isInIframe(): boolean {
    return window.location !== window.parent.location;
  }
}
