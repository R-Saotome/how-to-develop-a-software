import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interface/company.interface';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  company: Company;

  ngOnInit(): void {
    const id = this.ar.snapshot.paramMap.get('id');
    this.companyService.getById(id).subscribe((c) => (this.company = c[0]));
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.ar });
  }
}
