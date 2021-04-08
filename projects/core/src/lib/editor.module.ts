import {NgModule} from '@angular/core';
import {LessifyTranslationDirective} from './directives/lessify-translation.directive';
import {LessifyConfigurationDirective} from './directives/lessify-configuration.directive';
import {EditorService} from './services/editor.service';

@NgModule({
  declarations: [
    LessifyTranslationDirective,
    LessifyConfigurationDirective
  ],
  exports: [
    LessifyTranslationDirective,
    LessifyConfigurationDirective
  ],
  providers: [
    EditorService
  ]
})
export class LessifyEditorModule {
}
