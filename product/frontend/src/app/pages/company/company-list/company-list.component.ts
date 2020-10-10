import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  columns: string[] = [
    'name',
    'field',
    'postal_code',
    'address',
    'tel',
    'fax',
    'url',
  ];
  data: Company[];

  constructor() {}

  ngOnInit(): void {}

  onShowDetail(id) {
    this.router.navigate([id], { relativeTo: this.ar });
  }

  onCreateNew() {
    this.router.navigate(['new'], { relativeTo: this.ar });
  }
}
