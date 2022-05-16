import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekControlComponent } from './week-control.component';

describe('WeekControlComponent', () => {
  let component: WeekControlComponent;
  let fixture: ComponentFixture<WeekControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
