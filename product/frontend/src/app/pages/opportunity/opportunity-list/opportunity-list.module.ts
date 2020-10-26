import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityListComponent } from './opportunity-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [OpportunityListComponent],
  imports: [CommonModule, TableModule, MatButtonModule, MatIconModule],
  exports: [OpportunityListComponent],
})
export class OpportunityListModule {}
