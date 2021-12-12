import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VingTsunRoutingModule } from './ving-tsun-routing.module';
import { WongShunLeungPageComponent } from './wong-shun-leung-page/wong-shun-leung-page.component';
import {NbCardModule} from "@nebular/theme";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VingTsunRoutingModule,
    NbCardModule
  ]
})
export class VingTsunModule { }
