import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/interface/person.interface';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private personService: PersonService
  ) {}

  person: Person;

  ngOnInit(): void {
    const id = this.ar.snapshot.paramMap.get('id');
    this.personService
      .getById(id)
      .subscribe((c: Person[]) => (this.person = c[0]));
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.ar });
  }
}
