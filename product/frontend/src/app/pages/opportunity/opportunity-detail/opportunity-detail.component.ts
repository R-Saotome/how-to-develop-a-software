import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opportunity } from 'src/app/interface/opportunity.interface';
import { OpportunityService } from 'src/app/services/opportunity/opportunity.service';

@Component({
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.scss'],
})
export class OpportunityDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private opportunityService: OpportunityService
  ) {}

  opportunity: Opportunity;

  ngOnInit(): void {
    const id = this.ar.snapshot.paramMap.get('id');
    this.opportunityService
      .getById(id)
      .subscribe((c: Opportunity[]) => (this.opportunity = c[0]));
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.ar });
  }
}
