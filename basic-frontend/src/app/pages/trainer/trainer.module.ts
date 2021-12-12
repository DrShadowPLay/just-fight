import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { OneTrainerPageComponent } from './one-trainer-page/one-trainer-page.component';
import {NbCardModule} from "@nebular/theme";


@NgModule({
  declarations: [
    TrainerPageComponent,
    OneTrainerPageComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    NbCardModule
  ]
})
export class TrainerModule { }
