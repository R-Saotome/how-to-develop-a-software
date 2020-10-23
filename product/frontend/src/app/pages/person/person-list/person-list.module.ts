import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [PersonListComponent],
  imports: [CommonModule, TableModule, MatButtonModule, MatIconModule],
  exports: [PersonListComponent],
})
export class PersonListModule {}
