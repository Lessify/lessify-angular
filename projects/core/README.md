# Lessify Angular Core

This library is library for integration of your Angular project with [Lessify](https://lessify.io/).

## NGX-Translate Integration

You can import an existing `TranslateLoader` implemented by Lessfy with name `LessifyTranslateV1HttpLoader`.

Here is how you would use the `LessifyTranslateV1HttpLoader` to load translations from Lessify API:

```ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {
  LessifyCoreModule,
  LessifyTranslateV1HttpLoader,
  TranslationV1Service
} from '@lessify/angular-core';
import {AppComponent} from './app'; 

// AoT requires an exported function for factories
export function HttpLoaderFactory(service: TranslationV1Service) {
    return new LessifyTranslateV1HttpLoader(service);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        LessifyCoreModule.forRoot(
            {
              space: {
                spaceId: 'your-space-id',
                environment: 'master',
                apiKey: 'your-api-key'
              }
            }
        ),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [TranslationV1Service]
            },
            defaultLanguage: 'en'
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

