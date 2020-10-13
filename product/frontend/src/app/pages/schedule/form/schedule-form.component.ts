import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/interface/schedule.interface';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm: FormGroup;

  constructor(fb: FormBuilder, private scheduleService: ScheduleService) {
    this.scheduleForm = fb.group({
      id: [undefined],
      title: ['', Validators.required],
      is_all_day: [false],
      start: fb.group(
        {
          date: [''],
          time: [''],
        },
        Validators.required
      ),
      end: fb.group(
        {
          date: [''],
          time: [''],
        },
        Validators.required
      ),
      note: [''],
      company: [''],
      person: [''],
      opportunity: [''],
      members: [[]],
    });
  }
  ngOnInit(): void {}

  onToggleIsAllDay() {
    if (this.scheduleForm.value.is_all_day) {
      this.scheduleForm.get('start').reset();
      this.scheduleForm.get('end').reset();
      this.scheduleForm.get('start').disable();
      this.scheduleForm.get('end').disable();
    } else {
      this.scheduleForm.get('start').enable();
      this.scheduleForm.get('end').enable();
    }
  }

  onSubmit(value) {}

  onCancel() {}

  onDelete() {}
}
