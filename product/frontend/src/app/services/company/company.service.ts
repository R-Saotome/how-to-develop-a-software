import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Company } from 'src/app/interface/company.interface';

const COMPANY_SUFFIX = 'companies';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http
      .get(`${environment.BASE_API_URL}/${COMPANY_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getById(id: any) {}

  add(company: Company) {
    return this.http.post(
      `${environment.BASE_API_URL}/${COMPANY_SUFFIX}`,
      company
    );
  }
}
