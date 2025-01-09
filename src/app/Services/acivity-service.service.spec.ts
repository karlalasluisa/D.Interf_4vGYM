import { TestBed } from '@angular/core/testing';

import { AcivityServiceService } from './acivity-service.service';

describe('AcivityServiceService', () => {
  let service: AcivityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcivityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
