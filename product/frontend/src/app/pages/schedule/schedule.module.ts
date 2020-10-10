import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'src/app/components/calendar/calendar.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ScheduleFormComponent } from './form/schedule-form.component';

@NgModule({
  declarations: [ScheduleComponent, ScheduleFormComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    CalendarModule,
    MatSidenavModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
