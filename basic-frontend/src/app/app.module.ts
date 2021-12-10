import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  NbAccordionModule, NbActionsModule,
  NbButtonModule, NbCardModule,
  NbContextMenuModule, NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbSidebarService
} from '@nebular/theme';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {HeaderComponent} from "./core/header/header.component";
import {FooterComponent} from "./core/footer/footer.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbSidebarModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import {AccordionComponent} from "./core/sidebar/accordion/accordion.component";
import {config} from "rxjs";
import {SchoolPageComponent} from "./pages/school/school-page/school-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidebarComponent,
    AccordionComponent,
    SchoolPageComponent,
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
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
