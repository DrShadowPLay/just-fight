import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VingTsunPageComponent} from "./ving-tsun-page/ving-tsun-page.component";
import {YipManPageComponent} from "./yip-man-page/yip-man-page.component";
import {WongShunLeungPageComponent} from "./wong-shun-leung-page/wong-shun-leung-page.component";

const routes: Routes = [
  {
    path: "",
    component: VingTsunPageComponent

  },
  {
    path: 'yip-man',
    component: YipManPageComponent
  },
  {
    path: 'wong-shun-leugn',
    component: WongShunLeungPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VingTsunRoutingModule {
}
