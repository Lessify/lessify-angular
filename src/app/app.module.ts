import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {LESSIFY_CONFIG, LessifyModuleConfig, LessifyNgxTranslateHttpLoader, LessifyTranslationService,} from '@lessify/angular-core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslocoRootModule} from './transloco-root.module';

// AoT requires an exported function for factories
export function NgxTranslateHttpLoaderFactory(service: LessifyTranslationService) {
  return new LessifyNgxTranslateHttpLoader(service);
}

// AoT requires an exported function for factories


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TranslocoRootModule,
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
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
