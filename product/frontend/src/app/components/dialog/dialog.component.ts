import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(public matDialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {}

  onCancelClick() {
    this.matDialogRef.close(false);
  }

  onDeleteClick() {
    this.matDialogRef.close(true);
  }
}
