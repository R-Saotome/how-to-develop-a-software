import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailModule } from './company-detail/company-detail.module';
import { CompanyListModule } from './company-list/company-list.module';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CompanyListModule,
    CompanyDetailModule,
  ],
  exports: [],
})
export class CompanyModule {}
