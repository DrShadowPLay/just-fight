import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosRoutingModule } from './infos-routing.module';
import { InfoPageComponent } from './info-page/info-page.component';


@NgModule({
  declarations: [
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    InfosRoutingModule
  ]
})
export class InfosModule { }
