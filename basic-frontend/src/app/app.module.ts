import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  NbAccordionModule, NbActionsModule,
  NbButtonModule, NbCardModule,
  NbContextMenuModule, NbDialogModule,
  NbIconModule, NbInputModule,
  NbMenuModule, NbSelectModule,
  NbSidebarService
} from '@nebular/theme';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {HeaderComponent} from "./core/header/header.component";
import {FooterComponent} from "./core/footer/footer.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbSidebarModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {SidebarComponent} from './core/sidebar/sidebar.component';
import {AccordionComponent} from "./core/sidebar/accordion/accordion.component";
import {VingTsunPageComponent} from "./pages/ving-tsun/ving-tsun-page/ving-tsun-page.component";
import {YipManPageComponent} from "./pages/ving-tsun/yip-man-page/yip-man-page.component";
import {WongShunLeungPageComponent} from "./pages/ving-tsun/wong-shun-leung-page/wong-shun-leung-page.component";
import {KostenPageComponent} from "./pages/infos/kosten-page/kosten-page.component";
import {SchoolService} from "./core/services/school.service";
import {StudentService} from './core/services/student.service';
import {TrainingsPlanService} from "./core/services/trainings-plan.service";

//import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidebarComponent,
    AccordionComponent,
    VingTsunPageComponent,
    YipManPageComponent,
    WongShunLeungPageComponent,
    KostenPageComponent,
    //PagesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbAccordionModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    NbSelectModule,

  ],
  providers: [NbSidebarService, SchoolService, StudentService, TrainingsPlanService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
