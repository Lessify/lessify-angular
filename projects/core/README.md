# Lessify Angular Core

This library is library for integration of your Angular project with [Lessify](https://lessify.io/).

## Translations

### NGX-Translate Integration

You can import an existing `TranslateLoader` implemented by Lessfy with name `LessifyNgxTranslateHttpLoader`.

Here is how you would use the `LessifyNgxTranslateHttpLoader` to load translations from Lessify API:

```ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {
  LESSIFY_CONFIG, LessifyModuleConfig,
  LessifyCoreModule,
  LessifyTranslateHttpLoader,
  LessifyTranslationService
} from '@lessify/angular-core';
import {AppComponent} from './app'; 

// AoT requires an exported function for factories
export function NgxTranslateHttpLoaderFactory(service: LessifyTranslationService) {
    return new LessifyNgxTranslateHttpLoader(service);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        LessifyCoreModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: NgxTranslateHttpLoaderFactory,
                deps: [LessifyTranslationService]
            },
            defaultLanguage: 'en'
        })
    ],
    providers: [
        {
          provide: LESSIFY_CONFIG,
          useValue: {
            spaceId: 'your-space-id',
            environment: 'master',
            apiKey: 'your-api-key'
          } as LessifyModuleConfig
        }
      ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

### ngneat Transloco Integration

You can import an existing `TranslateLoader` implemented by Lessfy with name `LessifyTranslocoHttpLoader`.

Here is how you would use the `LessifyTranslocoHttpLoader` to load translations from Lessify API:

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {
  LESSIFY_CONFIG, LessifyModuleConfig,
  LessifyCoreModule,
  LessifyTranslocoHttpLoader,
  LessifyTranslationService
} from '@lessify/angular-core';
import {TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule} from '@ngneat/transloco';

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
    LessifyCoreModule,
  ],
  providers: [
    {
      provide: LESSIFY_CONFIG,
      useValue: {
        spaceId: 'your-space-id',
        environment: 'master',
        apiKey: 'your-api-key'
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
```

### Configurations

Our Recommendation is to subscribe to configuration changes in your component:

````ts
import {Component, OnInit} from '@angular/core';
import {Configurations, LessifyConfigurationService} from '@lessify/angular-core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  configurations: Configurations;

  constructor(
      private readonly configurationService: LessifyConfigurationService,
  ) {
  }

  ngOnInit(): void {
    this.configurationService.configsChanges$.subscribe(it => this.configurations = it);
  }
  //...
}
````

## Editor

Use Lessify directives in order to annotate your code with additional metadata that will help you to visualise in Design Mode.

### Translation

Use the ``lessifyTransl`` directive to annotate a specific translation ID to be visible and manageable in Design Mode.

```html
<div lessifyTransl="login.form.email">{{ ... }}</div>
```

### Configuration

Use the ``lessifyConfig`` directive to annotate a specific configuration ID to be visible and manageable in Design Mode.

```html
<div *ngIf="config.maintenance" lessifyConfig="maintenance">
  ...
</div>
```

## Testing
In your project, link the @lessify/angular-core we just built:

``npm link $PATH_TO_PROJECT``

Replace **$PATH_TO_PROJECT** with the path to the **@lessify/angular-core** project’s root.
Note that users will install instead of linking, this is just to iterate faster locally while developing.
