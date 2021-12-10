import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {SchoolPageComponent} from "../school/school-page/school-page.component";
import {TrainerPageComponent} from "../trainer/trainer-page/trainer-page.component";
import {VingTsunPageComponent} from "../ving-tsun/ving-tsun-page/ving-tsun-page.component";
import {InfoPageComponent} from "../infos/info-page/info-page.component";
import {ArcievPageComponent} from "../archiev/arciev-page/arciev-page.component";

const routes: Routes = [
  {path:  '', component: WelcomePageComponent},
  {
    path: 'schools',
    component: SchoolPageComponent
  },
  {
    path: 'trainer',
    component: TrainerPageComponent
  },
  {
    path: 'ving-tsun',
    component: VingTsunPageComponent
  },
  {
    path: 'info',
    component:InfoPageComponent
  },
  {
    path: 'ariev',
    component:ArcievPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
