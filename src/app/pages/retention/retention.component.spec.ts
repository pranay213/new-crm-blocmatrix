import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionComponent } from './retention.component';

describe('RetentionComponent', () => {
  let component: RetentionComponent;
  let fixture: ComponentFixture<RetentionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetentionComponent]
    });
    fixture = TestBed.createComponent(RetentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
