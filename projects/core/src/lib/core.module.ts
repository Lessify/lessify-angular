import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ConfigurationService} from './services/configuration.service';
import {TranslationService} from './services/translation.service';
import {LessifyCoreModuleConfig, SpaceConfig} from './models/module.model';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: []
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
