import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {NbButtonModule, NbCardModule} from "@nebular/theme";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";


@NgModule({
  declarations: [
    WelcomePageComponent
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule,
    NbButtonModule,
    NbCardModule
  ]
})
export class WelcomeModule {
}
