import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrainerPageComponent} from "./trainer-page/trainer-page.component";
import {OneTrainerPageComponent} from "./one-trainer-page/one-trainer-page.component";

const routes: Routes = [ {
  path: "",
  component: TrainerPageComponent,

},
  {
    path: ':teacher_id',
    component: OneTrainerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
