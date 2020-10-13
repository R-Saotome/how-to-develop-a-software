import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @ViewChild('drawer') drawer;
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {}

  onCreateNew(date) {
    this.drawer.open();
  }

  onEdit(id) {
    this.drawer.open();
    this.scheduleService.id$.next(id);
  }
}
