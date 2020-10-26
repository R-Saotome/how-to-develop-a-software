import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { SimpleCompany } from 'src/app/interface/company.interface';
import { Opportunity } from 'src/app/interface/opportunity.interface';
import { SimplePerson } from 'src/app/interface/person.interface';
import { CompanyService } from 'src/app/services/company/company.service';
import { OpportunityService } from 'src/app/services/opportunity/opportunity.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ProgressService } from 'src/app/services/opportunity/progress.service';

@Component({
  selector: 'app-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss'],
})
export class OpportunityFormComponent implements OnInit, OnDestroy {
  opportunityForm: FormGroup;
  isEditMode = false;

  progressList: { id: any; name: string }[];
  companyList: SimpleCompany[];
  personList: SimplePerson[];
  correspondenceList: { account_id: any; name: string }[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private ar: ActivatedRoute,
    fb: FormBuilder,
    private opportunityService: OpportunityService,
    private companyService: CompanyService,
    private personService: PersonService,
    private progressService: ProgressService
  ) {
    this.opportunityForm = fb.group({
      id: [undefined],
      name: ['', Validators.required],
      amount: [0],
      progress: [undefined],
      company: [undefined],
      person: [undefined],
      // correspondence: [undefined],
    });
  }

  ngOnInit(): void {
    this.companyService
      .getOptions()
      .subscribe(
        (companies: SimpleCompany[]) => (this.companyList = companies)
      );
    this.personService
      .getOptions()
      .subscribe((persons: SimplePerson[]) => (this.personList = persons));

    this.progressService
      .getOptions()
      .subscribe((progresses) => (this.progressList = progresses));

    const id = this.ar.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.opportunityService.getById(id).subscribe((opportunity) => {
        this.opportunityForm.setValue(opportunity[0]);
        console.log(this.opportunityForm.get('person'));
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
      const opportunity: Opportunity = value;
      if (this.isEditMode) {
        this.opportunityService
          .update(opportunity)
          .subscribe(() =>
            this.router.navigate(['.'], { relativeTo: this.ar.parent })
          );
      } else {
        this.opportunityService.add(opportunity).subscribe(
          (opportunity: object) => {
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
