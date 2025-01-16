import { TestBed } from '@angular/core/testing';

import { MonitorsServiceService } from './monitors-service.service';

describe('MonitorsServiceService', () => {
  let service: MonitorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
