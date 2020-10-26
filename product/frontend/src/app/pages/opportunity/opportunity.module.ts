import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityDetailModule } from './opportunity-detail/opportunity-detail.module';
import { OpportunityListModule } from './opportunity-list/opportunity-list.module';
import { OpportunityRoutingModule } from './opportunity-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OpportunityRoutingModule,
    OpportunityListModule,
    OpportunityDetailModule,
  ],
  exports: [],
})
export class OpportunityModule {}
