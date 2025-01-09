import { TestBed } from '@angular/core/testing';

import { AcivityTypeServiceService } from './acivity-type-service.service';

describe('AcivityTypeServiceService', () => {
  let service: AcivityTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcivityTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
