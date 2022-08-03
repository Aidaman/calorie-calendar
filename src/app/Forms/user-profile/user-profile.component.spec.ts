import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule, StoreModule.forRoot({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculation for male worked correctly', () => {
    //test CalculateBMR function (for male)
    //weight-height = 60-175
    //1590
    expect(Math.round(component.calculateBMR(60, 175, 25, 'male'))).toEqual(Math.round(1590));
  });

  it('calculation for female worked correctly', () => {
    //test CalculateBMR function (for female)
    //weight-height = 60-175
    //min-max kcal = 1436

    expect(Math.round(component.calculateBMR(60, 175, 25, 'female'))).toEqual(1436);
  });
});
