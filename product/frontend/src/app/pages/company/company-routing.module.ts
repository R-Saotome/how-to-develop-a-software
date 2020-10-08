import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { FormComponent } from './company-detail/form/form.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
  },
  {
    path: 'new',
    component: FormComponent,
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: CompanyDetailComponent,
      },
      {
        path: 'edit',
        component: FormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
