import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {
  LESSIFY_CONFIG,
  LessifyCoreModule, LessifyModuleConfig,
  LessifyNgxTranslateHttpLoader, LessifyTranslationService,
  LessifyTranslocoHttpLoader,
} from '@lessify/angular-core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule} from '@ngneat/transloco';

// AoT requires an exported function for factories
export function NgxTranslateHttpLoaderFactory(service: LessifyTranslationService) {
  return new LessifyNgxTranslateHttpLoader(service);
}
// AoT requires an exported function for factories
export function TranslocoHttpLoaderFactory(service: LessifyTranslationService) {
  return new LessifyTranslocoHttpLoader(service);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TranslocoModule,
    LessifyCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: NgxTranslateHttpLoaderFactory,
        deps: [LessifyTranslationService]
      },
      defaultLanguage: 'en'
    }),
  ],
  providers: [
    {
      provide: LESSIFY_CONFIG,
      useValue: {
        spaceId: 'e600fed0-0674-11eb-8ebc-355c3e3200ae',
        environment: 'master',
        apiKey: 'api-key-Tqcgc-38872940-0d32-11eb-8a0e-61e5b1516e7a-Zlh7j',
        logLevel: 'debug'
      } as LessifyModuleConfig
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        defaultLang: 'en',
        availableLangs: ['en', 'de'],
        flatten: {
          aot: true
        },
        // Remove this option if your application
        // doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: false,
      })
    },
    { provide: TRANSLOCO_LOADER, useFactory: TranslocoHttpLoaderFactory, deps: [LessifyTranslationService]}
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
