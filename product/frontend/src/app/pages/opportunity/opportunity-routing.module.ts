import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpportunityDetailComponent } from './opportunity-detail/opportunity-detail.component';
import { OpportunityFormComponent } from './opportunity-detail/form/opportunity-form.component';
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';

const routes: Routes = [
  {
    path: '',
    component: OpportunityListComponent,
  },
  {
    path: 'new',
    component: OpportunityFormComponent,
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: OpportunityDetailComponent,
      },
      {
        path: 'edit',
        component: OpportunityFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunityRoutingModule {}
