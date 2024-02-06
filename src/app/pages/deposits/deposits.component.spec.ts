import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsComponent } from './deposits.component';

describe('DepositsComponent', () => {
  let component: DepositsComponent;
  let fixture: ComponentFixture<DepositsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositsComponent]
    });
    fixture = TestBed.createComponent(DepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
