import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ArcievPageComponent} from "./pages/archiev/arciev-page/arciev-page.component";
import {KostenPageComponent} from "./pages/infos/kosten-page/kosten-page.component";

const routes: Routes = [

  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'school',
    loadChildren: () => import("./pages/school/school.module").then(m => m.SchoolModule)
  },


  {
    path: 'trainer',
    loadChildren: () => import("./pages/trainer/trainer.module").then(m => m.TrainerModule)
  },

  {
    path: 'ving-tsun',
    loadChildren: () => import("./pages/ving-tsun/ving-tsun.module").then(m => m.VingTsunModule)
  },
  {
    path: 'yip-man',
    loadChildren: () => import("./pages/ving-tsun/ving-tsun.module").then(m => m.VingTsunModule)
  },
  {
    path: 'wong-shun-leugn',
    loadChildren: () => import("./pages/ving-tsun/ving-tsun.module").then(m => m.VingTsunModule)
  },


  {
    path: 'info',
    loadChildren: () => import("./pages/infos/infos.module").then(m => m.InfosModule)
  },
  {
    path: 'kosten',
    loadChildren: () => import("./pages/infos/infos.module").then(m => m.InfosModule)
  },
  {
    path: 'trainingszeiten',
    loadChildren: () => import("./pages/infos/infos.module").then(m => m.InfosModule)
  },
  {
    path: 'ariev',
    loadChildren: () => import("./pages/archiev/archiev.module").then(m => m.ArchievModule)
  },

  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

