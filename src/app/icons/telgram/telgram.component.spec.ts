import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelgramComponent } from './telgram.component';

describe('TelgramComponent', () => {
  let component: TelgramComponent;
  let fixture: ComponentFixture<TelgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelgramComponent]
    });
    fixture = TestBed.createComponent(TelgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
