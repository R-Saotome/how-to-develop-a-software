import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailModule } from './person-detail/person-detail.module';
import { PersonListModule } from './person-list/person-list.module';
import { PersonRoutingModule } from './person-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonRoutingModule,
    PersonListModule,
    PersonDetailModule,
  ],
  exports: [],
})
export class PersonModule {}
