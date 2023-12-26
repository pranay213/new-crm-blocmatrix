import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablesComponent } from './data-tables.component';

describe('DataTablesComponent', () => {
  let component: DataTablesComponent;
  let fixture: ComponentFixture<DataTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTablesComponent]
    });
    fixture = TestBed.createComponent(DataTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
