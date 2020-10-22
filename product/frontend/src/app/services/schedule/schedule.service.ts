import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, single, switchMap } from 'rxjs/operators';
import { Schedule } from 'src/app/interface/schedule.interface';
import { environment } from 'src/environments/environment';

const SCHEDULE_SUFFIX = 'schedules';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {
    this.fetch();
    this.searchResults$ = this.id$.pipe(switchMap((id) => this.getById(id)));
  }

  scheduleList$: Observable<Schedule[]>;
  id$ = new Subject();
  searchResults$;

  fetch(): void {
    this.scheduleList$ = this.http
      .get(`${environment.BASE_API_URL}/${SCHEDULE_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getAll(): Observable<Schedule[]> {
    return this.scheduleList$;
  }

  getById(id: any) {
    return this.scheduleList$.pipe(
      map((d) => d.filter((c) => c.id === Number(id))),
      single()
    );
  }

  add(schedule: Schedule) {
    return this.http.post(
      `${environment.BASE_API_URL}/${SCHEDULE_SUFFIX}`,
      schedule
    );
  }
}
