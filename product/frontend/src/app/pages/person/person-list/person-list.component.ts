import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/interface/person.interface';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  columns: string[] = [
    'id',
    'first_name',
    'last_name',
    'department',
    'position',
    'tel',
    'email',
  ];
  data: Person[];

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.personService
      .getAll()
      .subscribe((companies: Person[]) => (this.data = companies));
  }

  onShowDetail(id) {
    this.router.navigate([id], { relativeTo: this.ar });
  }

  onCreateNew() {
    this.router.navigate(['new'], { relativeTo: this.ar });
  }
}
