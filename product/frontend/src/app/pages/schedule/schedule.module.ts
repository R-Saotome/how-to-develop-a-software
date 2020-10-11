import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'src/app/components/calendar/calendar.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ScheduleFormComponent } from './form/schedule-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ScheduleComponent, ScheduleFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    CalendarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
