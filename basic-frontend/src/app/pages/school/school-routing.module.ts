import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchoolPageComponent} from "./school-page/school-page.component";
import {EverySchoolPageComponent} from "./every-school-page/every-school-page.component";

const routes: Routes = [
  {
    path: "",
    component: SchoolPageComponent,

  },
  {
    path: ':school_id',
    component: EverySchoolPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }

