import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, single } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Company } from 'src/app/interface/company.interface';

const COMPANY_SUFFIX = 'companies';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {
    this.fetch();
  }

  companyList$: Observable<Company[]>;

  fetch(): void {
    this.companyList$ = this.http
      .get(`${environment.BASE_API_URL}/${COMPANY_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getAll(): Observable<Company[]> {
    return this.companyList$;
  }

  getById(id: any) {
    return this.companyList$.pipe(
      map((d) => d.filter((c) => c.id === Number(id))),
      single()
    );
  }

  add(company: Company) {
    return this.http.post(
      `${environment.BASE_API_URL}/${COMPANY_SUFFIX}`,
      company
    );
  }

  update(company: Company) {
    return this.http.put(
      `${environment.BASE_API_URL}/${COMPANY_SUFFIX}/${company.id}`,
      company
    );
  }
}
