import {
  AfterContentInit,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SimpleCompany } from 'src/app/interface/company.interface';
import { SimpleOpportunity } from 'src/app/interface/opportunity.interface';
import { SimplePerson } from 'src/app/interface/person.interface';
import { Schedule } from 'src/app/interface/schedule.interface';
import { SimpleUser } from 'src/app/interface/user.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { OpportunityService } from 'src/app/services/opportunity/opportunity.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
})
export class ScheduleFormComponent implements AfterContentInit {
  scheduleForm: FormGroup;
  scheduleSubscription: Subscription;
  isEditMode;
  companyList: SimpleCompany[];
  personList: SimplePerson[];
  opportunityList: SimpleOpportunity[];
  memberList: SimpleUser[];

  @Output() submitClicked = new EventEmitter<Schedule>();
  @Output() cancelClicked = new EventEmitter();

  constructor(
    fb: FormBuilder,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private companyService: CompanyService,
    private personService: PersonService,
    private opportunityService: OpportunityService
  ) {
    this.companyService
      .getOptions()
      .subscribe((companies) => (this.companyList = companies));
    this.personService
      .getOptions()
      .subscribe((persons) => (this.personList = persons));
    this.opportunityService
      .getOptions()
      .subscribe((opportunities) => (this.opportunityList = opportunities));
    this.userService
      .getOptions()
      .subscribe((users) => (this.memberList = users));

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
      company: [undefined],
      person: [undefined],
      opportunity: [undefined],
      members: [[]],
    });
  }

  ngAfterContentInit(): void {
    this.scheduleSubscription = this.scheduleService.searchResults$.subscribe(
      (schedules) => {
        this.scheduleForm.reset();
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
    return o1.account_id && o2.account_id
      ? o1.account_id === o2.account_id
      : o1.id === o2.id;
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
        ? new Date(value.end.date)
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
