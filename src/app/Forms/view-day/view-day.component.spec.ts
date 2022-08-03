import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDayComponent } from './view-day.component';
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";

describe('ViewDayComponent', () => {
  let component: ViewDayComponent;
  let fixture: ComponentFixture<ViewDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDayComponent ],
      imports: [ RouterTestingModule, StoreModule.forRoot({}) ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
