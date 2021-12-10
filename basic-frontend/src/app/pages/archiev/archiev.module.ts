import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchievRoutingModule } from './archiev-routing.module';
import { ArcievPageComponent } from './arciev-page/arciev-page.component';


@NgModule({
  declarations: [
    ArcievPageComponent
  ],
  imports: [
    CommonModule,
    ArchievRoutingModule
  ]
})
export class ArchievModule { }
