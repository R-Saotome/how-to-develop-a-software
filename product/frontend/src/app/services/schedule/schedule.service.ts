import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from 'src/app/interface/schedule.interface';
import { environment } from 'src/environments/environment';

const SCHEDULE_SUFFIX = 'schedules';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {
    this.fetch();
  }

  scheduleList$: Observable<Schedule[]>;

  fetch(): void {
    this.scheduleList$ = this.http
      .get(`${environment.BASE_API_URL}/${SCHEDULE_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getAll(): Observable<Schedule[]> {
    return this.scheduleList$;
  }

  getById(id: any) {}

  add(company: Schedule) {
    return this.http.post(
      `${environment.BASE_API_URL}/${SCHEDULE_SUFFIX}`,
      company
    );
  }
}
