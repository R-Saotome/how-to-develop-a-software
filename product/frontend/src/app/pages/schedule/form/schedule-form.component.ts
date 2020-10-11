import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm;
  isEditMode;

  constructor(fb: FormBuilder) {
    this.scheduleForm = fb.group({
      id: [undefined],
      title: ['', Validators.required],
      is_all_day: [''],
      start_date: [''],
      end_date: [''],
      note: [''],
      members: [[]],
    });
  }
  ngOnInit(): void {}

  onSubmit(value) {}

  onCancel() {}

  onDelete() {}
}
