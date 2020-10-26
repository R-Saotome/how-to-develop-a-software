import { TestBed } from '@angular/core/testing';

import { OpportunityService } from './opportunity.service';

describe('OpporutniyService', () => {
  let service: OpportunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpportunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
