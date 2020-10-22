import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Schedule } from 'src/app/interface/schedule.interface';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm: FormGroup;
  scheduleSubscription: Subscription;
  isEditMode;

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
      note: [undefined],
      company: fb.group({
        id: [undefined],
        name: [''],
      }),
      person: fb.group({
        id: [undefined],
        name: [''],
      }),
      opportunity: fb.group({
        id: [undefined],
        name: [''],
      }),
      members: [[]],
    });
  }
  ngOnInit(): void {
    this.scheduleSubscription = this.scheduleService.searchResults$.subscribe(
      (schedules) => {
        this.isEditMode = false;
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

        this.scheduleForm.patchValue(s);
        if (s.is_all_day) {
          this.scheduleForm.get('start').disable();
          this.scheduleForm.get('end').disable();
        }
      }
    );
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

  ngOnDestroy(): void {
    this.scheduleSubscription.unsubscribe();
  }
}
