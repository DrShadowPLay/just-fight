import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import {NbAccordionModule, NbCardModule, NbListModule, NbSelectModule} from "@nebular/theme";


@NgModule({
  declarations: [
    UserProfilePageComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    NbAccordionModule,
    NbCardModule,
    NbSelectModule,
    NbListModule
  ]
})
export class UserProfileModule {

}
