import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, single } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Opportunity,
  SimpleOpportunity,
} from 'src/app/interface/opportunity.interface';

const OPPORTUNITY_SUFFIX = 'opportunities';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  constructor(private http: HttpClient) {
    this.fetch();
  }

  personList$: Observable<(Opportunity | SimpleOpportunity)[]>;

  fetch(): void {
    this.personList$ = this.http
      .get(`${environment.BASE_API_URL}/${OPPORTUNITY_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getAll(): Observable<(Opportunity | SimpleOpportunity)[]> {
    return this.personList$;
  }

  getById(id: any) {
    return this.personList$.pipe(
      map((d: (Opportunity | SimpleOpportunity)[]) =>
        d.filter((c) => c.id === Number(id))
      ),
      single()
    );
  }

  add(opportunity: Opportunity) {
    return this.http.post(
      `${environment.BASE_API_URL}/${OPPORTUNITY_SUFFIX}`,
      opportunity
    );
  }

  update(opportunity: Opportunity) {
    return this.http.put(
      `${environment.BASE_API_URL}/${OPPORTUNITY_SUFFIX}/${opportunity.id}`,
      opportunity
    );
  }
}
