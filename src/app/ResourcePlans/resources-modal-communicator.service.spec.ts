import { TestBed, inject } from '@angular/core/testing';

import { ResourcesModalCommunicatorService } from './resources-modal-communicator.service';

describe('ResourcesModalCommunicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourcesModalCommunicatorService]
    });
  });

  it('should be created', inject([ResourcesModalCommunicatorService], (service: ResourcesModalCommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});
