import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrainerPageComponent} from "./trainer-page/trainer-page.component";

const routes: Routes = [ {
  path: "",
  component: TrainerPageComponent,

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
