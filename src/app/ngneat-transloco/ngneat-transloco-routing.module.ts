import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NgneatTranslocoComponent} from './ngneat-transloco.component';


const routes: Routes = [
  {
    path: '',
    component: NgneatTranslocoComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgneatTranslocoRoutingModule { }
