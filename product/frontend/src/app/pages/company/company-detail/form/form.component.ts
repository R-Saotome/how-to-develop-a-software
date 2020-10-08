import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  isEditMode = false;
  id: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.ar.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEditMode = true;
      // TODO Fetch a company data by ID
    }
  }

  ngOnDestroy(): void {}

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
