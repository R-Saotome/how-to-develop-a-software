import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Company } from 'src/app/interface/company.interface';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit, OnDestroy {
  companyForm: FormGroup;
  isEditMode = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private ar: ActivatedRoute,
    fb: FormBuilder,
    private companyService: CompanyService
  ) {
    this.companyForm = fb.group({
      id: [undefined],
      name: ['', Validators.required],
      field: [''],
      // postalCode: [''],
      address: [''],
      tel: [''],
      fax: [''],
      email: [''],
      url: [''],
    });
  }

  ngOnInit(): void {
    const id = this.ar.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.companyService.getById(id).subscribe((company) => {
        this.companyForm.setValue(company[0]);
      });
    }
  }

  ngOnDestroy(): void {}

  onSubmit(value) {
    if (value) {
      const company: Company = value;
      if (this.isEditMode) {
        this.companyService
          .update(company)
          .subscribe(() =>
            this.router.navigate(['.'], { relativeTo: this.ar.parent })
          );
      } else {
        this.companyService.add(company).subscribe(
          (company: object) => {
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
