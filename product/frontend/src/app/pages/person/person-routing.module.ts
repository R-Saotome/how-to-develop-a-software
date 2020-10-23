import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonFormComponent } from './person-detail/form/person-form.component';
import { PersonListComponent } from './person-list/person-list.component';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
  },
  {
    path: 'new',
    component: PersonFormComponent,
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: PersonDetailComponent,
      },
      {
        path: 'edit',
        component: PersonFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
