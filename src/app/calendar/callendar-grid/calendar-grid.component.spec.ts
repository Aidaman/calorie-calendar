import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarGridComponent } from './calendar-grid.component';
import {StoreModule} from "@ngrx/store";
import {RouterTestingModule} from "@angular/router/testing";

describe('CallendarGridComponent', () => {
  let component: CalendarGridComponent;
  let fixture: ComponentFixture<CalendarGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarGridComponent ],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
