import { TestBed, inject } from '@angular/core/testing';

import { CachingInterceptorService } from './caching-interceptor.service';

describe('CachingInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachingInterceptorService]
    });
  });

  it('should be created', inject([CachingInterceptorService], (service: CachingInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
