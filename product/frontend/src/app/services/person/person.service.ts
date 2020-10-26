import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, single } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Person, SimplePerson } from 'src/app/interface/person.interface';

const PERSON_SUFFIX = 'persons';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {
    this.fetch();
  }

  personList$: Observable<(Person | SimplePerson)[]>;

  fetch(): void {
    this.personList$ = this.http
      .get(`${environment.BASE_API_URL}/${PERSON_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getAll(): Observable<(Person | SimplePerson)[]> {
    return this.personList$;
  }

  getOptions() {
    return this.personList$.pipe(
      map((list: Person[]) =>
        list.map((c) => {
          return { id: c.id, name: c.first_name + c.last_name };
        })
      )
    );
  }

  getById(id: any) {
    return this.personList$.pipe(
      map((d: (Person | SimplePerson)[]) =>
        d.filter((c) => c.id === Number(id))
      ),
      single()
    );
  }

  add(person: Person) {
    return this.http.post(
      `${environment.BASE_API_URL}/${PERSON_SUFFIX}`,
      person
    );
  }

  update(person: Person) {
    return this.http.put(
      `${environment.BASE_API_URL}/${PERSON_SUFFIX}/${person.id}`,
      person
    );
  }
}
