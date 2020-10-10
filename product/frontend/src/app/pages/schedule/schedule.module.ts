import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'src/app/components/calendar/calendar.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

@NgModule({
  declarations: [ScheduleListComponent],
  imports: [CommonModule, ScheduleRoutingModule, CalendarModule],
  exports: [ScheduleListComponent],
})
export class ScheduleModule {}
