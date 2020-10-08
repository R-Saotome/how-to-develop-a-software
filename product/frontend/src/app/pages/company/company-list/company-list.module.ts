import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [CompanyListComponent],
  imports: [CommonModule, TableModule, MatButtonModule, MatIconModule],
  exports: [CompanyListComponent],
})
export class CompanyListModule {}
