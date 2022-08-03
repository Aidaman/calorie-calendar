import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekControlComponent } from './week-control.component';
import {StoreModule} from "@ngrx/store";
import {RouterTestingModule} from "@angular/router/testing";

describe('WeekControlComponent', () => {
  let component: WeekControlComponent;
  let fixture: ComponentFixture<WeekControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekControlComponent,],
      imports: [StoreModule.forRoot({}), RouterTestingModule]
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
  it('should mark day as active', ()=>{
    const today = new Date();
    today.setHours(0,0,0,0)
    expect(component.isDayActive(today)).toEqual(true);
  });
  it('shouldn\'t mark day as active', ()=>{
    const yesterday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1);
    yesterday.setHours(0,0,0,0)
    expect(component.isDayActive(yesterday)).toEqual(false);
  });
});
