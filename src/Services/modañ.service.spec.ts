import { TestBed } from '@angular/core/testing';

import { ModañService } from './modañ.service';

describe('ModañService', () => {
  let service: ModañService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModañService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
