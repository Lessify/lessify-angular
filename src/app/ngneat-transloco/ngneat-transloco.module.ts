import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {NgneatTranslocoRoutingModule} from './ngneat-transloco-routing.module';
import {NgneatTranslocoComponent} from './ngneat-transloco.component';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  imports: [
    NgneatTranslocoRoutingModule,
    SharedModule,
    TranslocoModule,
  ],
  providers: [],
  declarations: [NgneatTranslocoComponent],
})
export class TranslocoLoginModule {
}
