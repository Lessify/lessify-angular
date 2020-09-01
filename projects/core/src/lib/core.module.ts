import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ConfigurationV1Service} from './v1/configuration-v1.service';
import {TranslationV1Service} from './v1/translation-v1.service';

export interface LessifyCoreModuleConfig {
  space: SpaceConfig;
}

export class SpaceConfig {
  spaceId: string;
  environment: string;
  apiKey: string;
  beta?: boolean;
}

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
        ConfigurationV1Service,
        TranslationV1Service
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
        ConfigurationV1Service,
        TranslationV1Service
      ]
    };
  }
}
