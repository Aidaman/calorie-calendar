import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSelectComponent } from './calendar-select.component';

describe('CalendarSelectComponent', () => {
  let component: CalendarSelectComponent;
  let fixture: ComponentFixture<CalendarSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarSelectComponent ]
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
