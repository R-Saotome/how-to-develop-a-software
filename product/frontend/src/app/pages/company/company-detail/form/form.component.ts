import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  companyForm: FormGroup;
  isEditMode = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private ar: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.companyForm = fb.group({
      id: [''],
      name: ['', Validators.required],
      field: [''],
      postalCode: [''],
      address: [''],
      tel: [''],
      fax: [''],
      url: [''],
    });
  }

  ngOnInit(): void {
    const id = this.ar.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      // TODO Fetch a company data by ID
      // this.https.get('[url]').subscribe((company: object) => {
      //   this.companyForm.setValue(company);
      // });
    }
  }

  ngOnDestroy(): void {}

  onSubmit(value) {}

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
