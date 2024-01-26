import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveReportComponent } from './live-report.component';

describe('LiveReportComponent', () => {
  let component: LiveReportComponent;
  let fixture: ComponentFixture<LiveReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveReportComponent]
    });
    fixture = TestBed.createComponent(LiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
