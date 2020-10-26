import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opportunity } from 'src/app/interface/opportunity.interface';
import { OpportunityService } from 'src/app/services/opportunity/opportunity.service';

@Component({
  selector: 'app-opportunity-list',
  templateUrl: './opportunity-list.component.html',
  styleUrls: ['./opportunity-list.component.scss'],
})
export class OpportunityListComponent implements OnInit {
  columns: string[] = ['id', 'name', 'amount', 'progress', 'company', 'person'];
  data: Opportunity[];

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private opportunityService: OpportunityService
  ) {}

  ngOnInit(): void {
    this.opportunityService
      .getAll()
      .subscribe((opportunity: Opportunity[]) => (this.data = opportunity));
  }

  onShowDetail(id) {
    this.router.navigate([id], { relativeTo: this.ar });
  }

  onCreateNew() {
    this.router.navigate(['new'], { relativeTo: this.ar });
  }
}
