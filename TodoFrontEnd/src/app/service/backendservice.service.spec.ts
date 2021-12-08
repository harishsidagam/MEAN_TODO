import { TestBed } from '@angular/core/testing';

import { BackendserviceService } from './backendservice.service';

describe('BackendserviceService', () => {
  let service: BackendserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
