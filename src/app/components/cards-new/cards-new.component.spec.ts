import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsNewComponent } from './cards-new.component';

describe('CardsNewComponent', () => {
  let component: CardsNewComponent;
  let fixture: ComponentFixture<CardsNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardsNewComponent]
    });
    fixture = TestBed.createComponent(CardsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
