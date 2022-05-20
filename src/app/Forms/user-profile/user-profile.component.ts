import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDataService} from "../../user-data.service";
import {Router} from "@angular/router";
import {IUser} from "../../shared/interfaces/user";
import {Store} from "@ngrx/store";
import {userLoginAction, userUpdateAction} from "../../store/user/user.action";
import {Observable, switchMap, tap} from "rxjs";
import {hasUserValueSelector, userSelector} from "../../store/user/selectors";
import {map} from "rxjs/operators";
import {notNegativeValidator} from "../not-negative.validator";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', "../custom-control/custom-control.component.scss"]
})
export class UserProfileComponent {
  public regForm: FormGroup = this.fb.group({
    gender: ['male', [Validators.required]],
    height: [null, [Validators.required, notNegativeValidator]],
    weight: [null, [Validators.required, notNegativeValidator]],

    minCal: [null, [Validators.required, notNegativeValidator]],
    maxCal: [null, [Validators.required, notNegativeValidator]],
    fats: [null, [Validators.required, notNegativeValidator]],
    protein: [null, [Validators.required, notNegativeValidator]],
    carbohydrates: [null, [Validators.required, notNegativeValidator]],
  });
  public genders: string[] = ['female', 'male']

  public user$: Observable<IUser> = this.udService.user$.pipe(
    map((user) => {
      this.regForm.get('gender')?.setValue(user?.gender);
      this.regForm.get('height')?.setValue(user?.heightCm);
      this.regForm.get('weight')?.setValue(user?.weightkg);
      this.regForm.get('minCal')?.setValue(user?.minCal);
      this.regForm.get('maxCal')?.setValue(user?.maxCal);
      this.regForm.get('protein')?.setValue(user?.proteins);
      this.regForm.get('fats')?.setValue(user?.fats);
      this.regForm.get('carbohydrates')?.setValue(user?.carbohydrates);
      return user;
    }));

  private weight: number = this.regForm.get('weight')?.value;
  private height: number = this.regForm.get('height')?.value;
  private gender: string = this.regForm.get('gender')?.value;
  private minCal: number = Math.round(this.calculateBMR(this.weight, this.height, 25, this.gender))
  private maxCal: number = this.minCal + 500;

  constructor(private fb: FormBuilder,
              private udService: UserDataService,
              private store: Store,
              private router: Router) {
  }

  private calculateBMR(weight: number, height: number, age: number, gender: string): number {
    if (gender.substr(0, 3) === 'fem') {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    } else {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    }
  }

  public calculateCalories() {
    this.weight = this.regForm.get('weight')?.value;
    this.height = this.regForm.get('height')?.value;
    this.gender = this.regForm.get('gender')?.value;
    this.minCal = Math.round(this.calculateBMR(this.weight, this.height, 25, this.gender))
    this.maxCal = this.minCal + 500;

    this.regForm.get('minCal')?.setValue(this.minCal);
    this.regForm.get('maxCal')?.setValue(this.maxCal);
    this.regForm.get('fats')?.setValue(((this.minCal * 0.30) / 9).toFixed(2));
    this.regForm.get('protein')?.setValue(((this.minCal * 0.15) / 4).toFixed(2));
    this.regForm.get('carbohydrates')?.setValue((((this.minCal * 0.15) / 2) / 4).toFixed(2));
  }

  public saveSetting() {
    this.calculateCalories();

    const user: IUser = {
      carbohydrates: Math.abs(this.regForm.get('carbohydrates')?.value),
      fats: Math.abs(this.regForm.get('fats')?.value),
      gender: this.regForm.get('gender')?.value,
      heightCm: Math.abs(this.regForm.get('height')?.value),
      maxCal: Math.abs(this.maxCal),
      minCal: Math.abs(this.minCal),
      proteins: Math.abs(this.regForm.get('protein')?.value),
      weightkg: Math.abs(this.regForm.get('weight')?.value),
      isLoggedIn: true,
    }

    this.store.dispatch(userUpdateAction({user}))
    this.router.navigate(['/calendar']);
  }

  public logOut() {

  }
}