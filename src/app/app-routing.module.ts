import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'ngx-translate',
    loadChildren: () => import('./ngx-translate/ngx-translate.module').then(it => it.NgxTranslateModule)
  },
  {
    path: 'ngneat-transloco',
    loadChildren: () => import('./ngneat-transloco/ngneat-transloco.module').then(it => it.TranslocoLoginModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
