import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  constructor(private router: Router, private ar: ActivatedRoute) {}

  ngOnInit(): void {}

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.ar });
  }
}
