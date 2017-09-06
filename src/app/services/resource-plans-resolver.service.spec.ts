import { TestBed, inject } from '@angular/core/testing';

import { ResourcePlansResolverService } from './resource-plans-resolver.service';

describe('ResourcePlansResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourcePlansResolverService]
    });
  });

  it('should be created', inject([ResourcePlansResolverService], (service: ResourcePlansResolverService) => {
    expect(service).toBeTruthy();
  }));
});
