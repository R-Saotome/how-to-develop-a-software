import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'companies',
    loadChildren: () =>
      import('./pages/company/company.module').then((c) => c.CompanyModule),
  },
  {
    path: 'persons',
    loadChildren: () =>
      import('./pages/person/person.module').then((c) => c.PersonModule),
  },
  {
    path: 'schedules',
    loadChildren: () =>
      import('./pages/schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  {
    path: '**',
    redirectTo: 'companies',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
