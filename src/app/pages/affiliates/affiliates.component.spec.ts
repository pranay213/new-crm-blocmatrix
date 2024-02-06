import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatesComponent } from './affiliates.component';

describe('AffiliatesComponent', () => {
  let component: AffiliatesComponent;
  let fixture: ComponentFixture<AffiliatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliatesComponent]
    });
    fixture = TestBed.createComponent(AffiliatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
