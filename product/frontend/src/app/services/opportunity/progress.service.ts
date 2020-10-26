import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, single } from 'rxjs/operators';
import { Observable } from 'rxjs';

const PROGRESS_SUFFIX = 'progresses';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  constructor(private http: HttpClient) {
    this.fetch();
  }

  progressList$: Observable<any[]>;

  fetch(): void {
    this.progressList$ = this.http
      .get(`${environment.BASE_API_URL}/${PROGRESS_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getAll(): Observable<any[]> {
    return this.progressList$;
  }

  getById(id: any) {
    return this.progressList$.pipe(
      map((d: any[]) => d.filter((c) => c.id === Number(id))),
      single()
    );
  }

  add(progress: any) {
    return this.http.post(
      `${environment.BASE_API_URL}/${PROGRESS_SUFFIX}`,
      progress
    );
  }

  update(progress: any) {
    return this.http.put(
      `${environment.BASE_API_URL}/${PROGRESS_SUFFIX}/${progress.id}`,
      progress
    );
  }
}
