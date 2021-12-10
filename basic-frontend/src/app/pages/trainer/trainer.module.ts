import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';


@NgModule({
  declarations: [
    TrainerPageComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule
  ]
})
export class TrainerModule { }
