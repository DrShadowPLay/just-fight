import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EverySchoolPageComponent } from './every-school-page/every-school-page.component';
import {SchoolPageComponent} from "./school-page/school-page.component";
import {SchoolRoutingModule} from "./school-routing.module";
import {NbAccordionModule, NbCardModule} from "@nebular/theme";


@NgModule({
  declarations: [
    SchoolPageComponent,
    EverySchoolPageComponent,

  ],

  imports: [
    CommonModule,
    SchoolRoutingModule,
    NbCardModule,
    NbAccordionModule
  ],
})
export class SchoolModule {}
