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
    'id',
    'name',
    'field',
    'address',
    'tel',
    'fax',
    'email',
    'url',
  ];
  data: Company[];

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService
      .getAll()
      .subscribe((companies: Company[]) => (this.data = companies));
  }

  onShowDetail(id) {
    this.router.navigate([id], { relativeTo: this.ar });
  }

  onCreateNew() {
    this.router.navigate(['new'], { relativeTo: this.ar });
  }
}
