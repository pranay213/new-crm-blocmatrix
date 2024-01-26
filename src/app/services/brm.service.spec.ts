import { TestBed } from '@angular/core/testing';

import { BrmService } from './brm.service';

describe('BrmService', () => {
  let service: BrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
