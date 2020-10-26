import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, single } from 'rxjs/operators';
import { SimpleUser, User } from 'src/app/interface/user.interface';
import { environment } from 'src/environments/environment';

const PERSON_SUFFIX = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
    this.fetch();
  }

  userList$: Observable<(User | SimpleUser)[]>;

  fetch(): void {
    this.userList$ = this.http
      .get(`${environment.BASE_API_URL}/${PERSON_SUFFIX}`)
      .pipe(map((d: any) => d.data));
  }

  getAll(): Observable<(User | SimpleUser)[]> {
    return this.userList$;
  }

  getOptions() {
    return this.userList$.pipe(
      map((list: User[]) =>
        list.map((c) => {
          return { account_id: c.account_id, name: c.first_name + c.last_name };
        })
      )
    );
  }

  getById(id: any) {
    return this.userList$.pipe(
      map((d: (User | SimpleUser)[]) =>
        d.filter((c) => c.account_id === Number(id))
      ),
      single()
    );
  }
}
