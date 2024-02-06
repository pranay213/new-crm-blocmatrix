import { TestBed } from '@angular/core/testing';

import { AllApiService } from './all-api.service';

describe('AllApiService', () => {
  let service: AllApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
