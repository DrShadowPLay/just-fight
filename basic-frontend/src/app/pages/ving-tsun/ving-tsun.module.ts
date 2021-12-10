import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VingTsunRoutingModule } from './ving-tsun-routing.module';
import { VingTsunPageComponent } from './ving-tsun-page/ving-tsun-page.component';


@NgModule({
  declarations: [
    VingTsunPageComponent
  ],
  imports: [
    CommonModule,
    VingTsunRoutingModule
  ]
})
export class VingTsunModule { }
