import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NgxTranslateRoutingModule} from './ngx-translate-routing.module';
import {NgxTranslateComponent} from './ngx-translate.component';



@NgModule({
  imports: [
    NgxTranslateRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [NgxTranslateComponent],
})
export class NgxTranslateModule {
}
