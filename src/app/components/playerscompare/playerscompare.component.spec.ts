import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerscompareComponent } from './playerscompare.component';

describe('PlayerscompareComponent', () => {
  let component: PlayerscompareComponent;
  let fixture: ComponentFixture<PlayerscompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerscompareComponent]
    });
    fixture = TestBed.createComponent(PlayerscompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
