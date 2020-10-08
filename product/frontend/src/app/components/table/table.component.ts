import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: string[];
  @Input() dataSource: PeriodicElement[];

  @Output() rowClicked = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onRowClick(id) {
    this.rowClicked.emit(id);
  }
}
