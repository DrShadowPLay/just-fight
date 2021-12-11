import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosRoutingModule } from './infos-routing.module';
import { InfoPageComponent } from './info-page/info-page.component';
import { TrainingszeitenPageComponent } from './trainingszeiten-page/trainingszeiten-page.component';
import {NbCardModule} from "@nebular/theme";


@NgModule({
  declarations: [
    InfoPageComponent,
    TrainingszeitenPageComponent
  ],
    imports: [
        CommonModule,
        InfosRoutingModule,
        NbCardModule
    ]
})
export class InfosModule { }
