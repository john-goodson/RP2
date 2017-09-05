import { TestBed, inject } from '@angular/core/testing';

import { ResourcePlanResolverService } from './resource-plan-resolver.service';

describe('ResourcePlanResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourcePlanResolverService]
    });
  });

  it('should be created', inject([ResourcePlanResolverService], (service: ResourcePlanResolverService) => {
    expect(service).toBeTruthy();
  }));
});
