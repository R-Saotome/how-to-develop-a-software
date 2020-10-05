import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list.component';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [CompanyListComponent],
  imports: [CommonModule, TableModule],
  exports: [CompanyListComponent],
})
export class CompanyListModule {}
