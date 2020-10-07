import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailComponent } from './company-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CompanyDetailComponent],
  imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule],
  exports: [CompanyDetailComponent],
})
export class CompanyDetailModule {}
