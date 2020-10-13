import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @ViewChild('drawer') drawer;
  constructor() {}

  ngOnInit(): void {}

  onCreateNew(date) {
    this.drawer.open();
  }

  onEdit(id) {
    this.drawer.open();
  }
}
