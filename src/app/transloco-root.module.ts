import {
  provideTransloco, TRANSLOCO_LOADER,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, isDevMode, NgModule } from '@angular/core';

import {LessifyTranslationService, LessifyTranslocoHttpLoader} from '@lessify/angular-core';

export function TranslocoHttpLoaderFactory(service: LessifyTranslationService) {
  return new LessifyTranslocoHttpLoader(service);
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    provideTransloco({
      config: {
        defaultLang: 'en',
        availableLangs: ['en', 'de'],
        flatten: {
          aot: true
        },
        // Remove this option if your application
        // doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: false,
      },
    }),
    { provide: TRANSLOCO_LOADER, useFactory: TranslocoHttpLoaderFactory, deps: [LessifyTranslationService]}
  ],
})
export class TranslocoRootModule {
}
