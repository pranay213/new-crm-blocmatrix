import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDepositsComponent } from './live-deposits.component';

describe('LiveDepositsComponent', () => {
  let component: LiveDepositsComponent;
  let fixture: ComponentFixture<LiveDepositsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveDepositsComponent]
    });
    fixture = TestBed.createComponent(LiveDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
