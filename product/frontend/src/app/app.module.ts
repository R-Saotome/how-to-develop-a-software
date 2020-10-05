import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CalendarModule } from './components/calendar/calendar.module';
import { MenuModule } from './components/menu/menu.module';
import { CompanyDetailModule } from './pages/company/company-detail/company-detail.module';
import { CompanyListModule } from './pages/company/company-list/company-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    CalendarModule,
    MenuModule,
    CompanyListModule,
    CompanyDetailModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
