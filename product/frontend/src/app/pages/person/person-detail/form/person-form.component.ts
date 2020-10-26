import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { SimpleCompany } from 'src/app/interface/company.interface';
import { Person } from 'src/app/interface/person.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnInit, OnDestroy {
  personForm: FormGroup;
  isEditMode = false;

  companyList: SimpleCompany[];
  correspondenceList: { account_id: any; name: string }[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private ar: ActivatedRoute,
    fb: FormBuilder,
    private personService: PersonService,
    private companyService: CompanyService
  ) {
    this.companyService
      .getOptions()
      .subscribe(
        (companies: SimpleCompany[]) => (this.companyList = companies)
      );

    this.personForm = fb.group({
      id: [undefined],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: [''],
      position: [''],
      tel: [''],
      email: [''],
      company: [undefined],
      correspondence: [undefined],
    });
  }

  ngOnInit(): void {
    const id = this.ar.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.personService.getById(id).subscribe((person) => {
        this.personForm.setValue(person[0]);
      });
    }
  }

  compareFn(o1: any, o2: any) {
    return o1.account_id && o2.account_id
      ? o1.account_id === o2.account_id
      : o1.id === o2.id;
  }

  ngOnDestroy(): void {}

  onSubmit(value) {
    if (value) {
      const person: Person = value;
      if (this.isEditMode) {
        this.personService
          .update(person)
          .subscribe(() =>
            this.router.navigate(['.'], { relativeTo: this.ar.parent })
          );
      } else {
        this.personService.add(person).subscribe(
          (person: object) => {
            this.router.navigate(['.'], { relativeTo: this.ar.parent });
          },
          (error) => console.log(error)
        );
      }
    }
  }

  onCancel() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((isAccepted) => {
      if (isAccepted) {
        // TODO delete data by ID

        this.router.navigateByUrl('/companies');
      }
    });
  }
}
