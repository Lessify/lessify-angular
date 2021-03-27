import {NgModule} from '@angular/core';
import {LessifyTranslationDirective} from './directives/lessify-translation.directive';
import {LessifyConfigurationDirective} from './directives/lessify-configuration.directive';

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
}
