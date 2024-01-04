import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerDashboardComponent } from './marketer-dashboard.component';

describe('MarketerDashboardComponent', () => {
  let component: MarketerDashboardComponent;
  let fixture: ComponentFixture<MarketerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketerDashboardComponent]
    });
    fixture = TestBed.createComponent(MarketerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
