import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportComponent } from './general-report.component';

describe('GeneralReportComponent', () => {
  let component: GeneralReportComponent;
  let fixture: ComponentFixture<GeneralReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralReportComponent]
    });
    fixture = TestBed.createComponent(GeneralReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
