import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Schedule } from 'src/app/interface/schedule.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { CompanyFormComponent } from '../../company/company-detail/form/company-form.component';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
})
export class ScheduleFormComponent implements OnInit {
  scheduleForm: FormGroup;
  scheduleSubscription: Subscription;
  isEditMode;
  memberList: { account_id: any; name: string }[];
  opportunityList: { id: any; name: string }[];
  companyList: { id: any; name: string }[];
  personList: { id: any; name: string }[];

  @Output() submitClicked = new EventEmitter<Schedule>();
  @Output() cancelClicked = new EventEmitter();

  constructor(
    fb: FormBuilder,
    private scheduleService: ScheduleService,
    private companyService: CompanyService
  ) {
    // this.memberList = this.companyService.companyList$.subscribe(
    //   (company) => (this.memberList = company)
    // );

    this.memberList = [
      {
        account_id: 1,
        name: '山田太郎',
      },
      {
        account_id: 2,
        name: '田中勇気',
      },
    ];

    this.opportunityList = [
      {
        id: 1,
        name: '山田太郎',
      },
      {
        id: 2,
        name: '田中勇気',
      },
    ];

    this.personList = [
      {
        id: 1,
        name: '山田太郎',
      },
      {
        id: 2,
        name: '田中勇気',
      },
    ];

    this.companyList = [
      {
        id: 1,
        name: '山田太郎',
      },
      {
        id: 2,
        name: '田中勇気',
      },
    ];

    this.scheduleForm = fb.group({
      id: [undefined],
      title: ['', Validators.required],
      is_all_day: [false],
      start: fb.group(
        {
          date: [new Date()],
          time: [''],
        },
        Validators.required
      ),
      end: fb.group(
        {
          date: [new Date()],
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
          date: new Date(s.start_date),
          time: new Date(s.start_date).toLocaleTimeString('default', {
            hour: 'numeric',
            minute: 'numeric',
          }),
        };
        s.end = {
          date: new Date(s.end_date),
          time: new Date(s.end_date).toLocaleTimeString('default', {
            hour: 'numeric',
            minute: 'numeric',
          }),
        };
        delete s.start_date;
        delete s.end_date;

        this.scheduleForm.patchValue(s);
        if (s.is_all_day) {
          this.scheduleForm.get('start').get('time').disable();
          this.scheduleForm.get('end').get('time').disable();
        }
      }
    );
  }

  onToggleIsAllDay() {
    if (this.scheduleForm.value.is_all_day) {
      this.scheduleForm.get('start').get('time').reset();
      this.scheduleForm.get('end').get('time').reset();
      this.scheduleForm.get('start').get('time').disable();
      this.scheduleForm.get('end').get('time').disable();
    } else {
      this.scheduleForm.get('start').get('time').enable();
      this.scheduleForm.get('end').get('time').enable();
    }
  }

  compareFn(o1: any, o2: any) {
    return o1.account_id === o2.account_id;
  }

  onSubmit(value) {
    if (value) {
      const startDate = value.is_all_day
        ? value.start.date
        : new Date(
            new Date(value.start.date).getTime() +
              value.start.time.split(':')[0] * 60 * 60 * 1000 +
              value.start.time.split(':')[1] * 60 * 1000
          );
      let endDate = value.is_all_day
        ? new Date(new Date(value.end.date).getTime() + 24 * 60 * 60 * 1000)
        : new Date(
            new Date(value.end.date).getTime() +
              value.end.time.split(':')[0] * 60 * 60 * 1000 +
              value.end.time.split(':')[1] * 60 * 1000
          );
      const schedule: Schedule = Object.assign(value, {
        start_date: startDate,
        end_date: endDate,
      });
      this.submitClicked.emit(schedule);
    }
  }

  onCancel() {
    this.cancelClicked.emit();
  }

  onDelete() {}

  ngOnDestroy(): void {
    this.scheduleSubscription.unsubscribe();
  }
}
