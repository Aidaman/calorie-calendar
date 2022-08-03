import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSelectComponent } from './calendar-select.component';
import {StoreModule} from "@ngrx/store";
import {SharedModule} from "../../shared/shared.module";

describe('CalendarSelectComponent', () => {
  let component: CalendarSelectComponent;
  let fixture: ComponentFixture<CalendarSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarSelectComponent ],
      imports: [StoreModule.forRoot({}), SharedModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
