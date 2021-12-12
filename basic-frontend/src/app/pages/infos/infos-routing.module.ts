import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InfoPageComponent} from "./info-page/info-page.component";
import {TrainingszeitenPageComponent} from "./trainingszeiten-page/trainingszeiten-page.component";
import {KostenPageComponent} from "./kosten-page/kosten-page.component";

const routes: Routes = [
  {
    path: '',
    component: InfoPageComponent

  },
  {
    path: 'trainingszeiten',
    component: TrainingszeitenPageComponent

  },
  {
    path: 'kosten',
    component: KostenPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfosRoutingModule { }
