import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalpageComponent } from './internalpage.component';

describe('InternalpageComponent', () => {
  let component: InternalpageComponent;
  let fixture: ComponentFixture<InternalpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalpageComponent]
    });
    fixture = TestBed.createComponent(InternalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
