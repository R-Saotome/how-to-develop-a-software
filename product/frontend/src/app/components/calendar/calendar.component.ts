import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

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
    events: [
      {
        title: 'event 1',
        start: '2020-09-29T00:00:00.000+09:00',
        end: '2020-09-29T12:00:00.000+09:00',
        allDay: true,
      },
      { title: 'event 2', date: '2019-04-02' },
    ],
  };

  constructor() {}
  ngOnInit(): void {}

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
    this.dateClicked.emit(arg.dateStr);
  }

  handleEventClick(arg) {
    alert('date click! ' + arg.event.id);
    this.eventClicked.emit(arg.event.id);
  }
}
