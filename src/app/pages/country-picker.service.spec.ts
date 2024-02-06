import { TestBed } from '@angular/core/testing';

import { CountryPickerService } from './country-picker.service';

describe('CountryPickerService', () => {
  let service: CountryPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
