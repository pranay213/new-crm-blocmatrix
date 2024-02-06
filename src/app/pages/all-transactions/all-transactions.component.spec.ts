import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransactionsComponent } from './all-transactions.component';

describe('AllTransactionsComponent', () => {
  let component: AllTransactionsComponent;
  let fixture: ComponentFixture<AllTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTransactionsComponent]
    });
    fixture = TestBed.createComponent(AllTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
