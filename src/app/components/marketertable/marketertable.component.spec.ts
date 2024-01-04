import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketertableComponent } from './marketertable.component';

describe('MarketertableComponent', () => {
  let component: MarketertableComponent;
  let fixture: ComponentFixture<MarketertableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketertableComponent]
    });
    fixture = TestBed.createComponent(MarketertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
