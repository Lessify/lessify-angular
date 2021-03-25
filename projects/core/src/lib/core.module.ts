import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ConfigurationService} from './services/configuration.service';
import {TranslationService} from './services/translation.service';
import {LessifyTranslationDirective} from './directives/lessify-translation.directive';
import {LessifyConfigurationDirective} from './directives/lessify-configuration.directive';
import {LessifyCoreModuleConfig, SpaceConfig} from './models/module.model';

@NgModule({
  declarations: [
    LessifyTranslationDirective,
    LessifyConfigurationDirective
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    LessifyTranslationDirective,
    LessifyConfigurationDirective
  ]
})
export class LessifyCoreModule {
  static forRoot(config: LessifyCoreModuleConfig): ModuleWithProviders<LessifyCoreModule> {
    return {
      ngModule: LessifyCoreModule,
      providers: [
        {
          provide: SpaceConfig,
          useValue: config.space
        },
        ConfigurationService,
        TranslationService
      ]
    };
  }

  static forChild(config: LessifyCoreModuleConfig): ModuleWithProviders<LessifyCoreModule> {
    return {
      ngModule: LessifyCoreModule,
      providers: [
        {
          provide: SpaceConfig,
          useValue: config.space
        },
        ConfigurationService,
        TranslationService
      ]
    };
  }
}
