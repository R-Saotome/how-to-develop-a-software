import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Output() eventClicked = new EventEmitter();
  @Output() dateClicked = new EventEmitter();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: '80vh',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
  };

  constructor(private scheduleService: ScheduleService) {}
  ngOnInit(): void {
    this.scheduleService
      .getAll()
      .pipe(
        map((data) =>
          data.map((s) => {
            return {
              id: s.id,
              title: s.title,
              start: s.start_date,
              end: s.end_date,
              allDay: s.is_all_day,
            };
          })
        )
      )
      .subscribe((data) => {
        this.calendarOptions.events = data;
      });
  }

  handleDateClick(arg) {
    this.dateClicked.emit(arg.dateStr);
  }

  handleEventClick(arg) {
    this.eventClicked.emit(arg.event.id);
  }
}
