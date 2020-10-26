import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityDetailComponent } from './opportunity-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { OpportunityFormComponent } from './form/opportunity-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [OpportunityDetailComponent, OpportunityFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [OpportunityDetailComponent],
})
export class OpportunityDetailModule {}
