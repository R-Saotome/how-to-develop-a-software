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
  ngOnInit(): void {
    this.scheduleService.searchResults$.subscribe((schedules) => {
      const s = schedules[0];
      s.start = {
        date: new Date(s.start_date).toLocaleDateString(),
        time: new Date(s.start_date).toLocaleTimeString('default', {
          hour: 'numeric',
          minute: 'numeric',
        }),
      };
      s.end = {
        date: new Date(s.end_date).toLocaleDateString(),
        time: new Date(s.end_date).toLocaleTimeString('default', {
          hour: 'numeric',
          minute: 'numeric',
        }),
      };
      delete s.start_date;
      delete s.end_date;

      this.scheduleForm.setValue(s);
      if (s.is_all_day) {
        this.scheduleForm.get('start').disable();
        this.scheduleForm.get('end').disable();
      }
    });
  }

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
