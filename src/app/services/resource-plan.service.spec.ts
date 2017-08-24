import { TestBed, inject } from '@angular/core/testing';

import { ResourcePlanService } from './resource-plan.service';

describe('ResourcePlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourcePlanService]
    });
  });

  it('should be created', inject([ResourcePlanService], (service: ResourcePlanService) => {
    expect(service).toBeTruthy();
  }));
});
