import {Injectable} from "@angular/core";
import {IUser} from "./shared/interfaces/user";
import {Observable, of, switchMap, throwError} from "rxjs";
import {hasUserValueSelector, userSelector} from "./store/user/selectors";
import {userLoginAction} from "./store/user/user.action";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public user$: Observable<IUser> = this.store.select(hasUserValueSelector).pipe(
    switchMap((hasValue: boolean)=>{
      if (!hasValue){
        this.store.dispatch(userLoginAction());
      }
      return this.store.select(userSelector)
    }),
  );

  constructor(private store: Store) {
    this.loadUser();
  }

  public loadUser(): Observable<IUser>{
    if(localStorage.getItem('user')){
      const user: IUser = JSON.parse(localStorage.getItem('user') as string);
      return of(user);
    } else return throwError('Error Handle');
  }

  public saveUser(user: IUser | null): Observable<IUser>{
    if (user && user.heightCm !== 0 && user.weightkg !== 0){
      const newUser: IUser = {
        carbohydrates: user.carbohydrates,
        fats: user.fats,
        gender: user.gender,
        heightCm: user.heightCm,
        maxCal: user.maxCal,
        minCal: user.minCal,
        proteins: user.proteins,
        weightkg: user.weightkg,
        isLoggedIn: true,
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      return of(newUser);
    }
    else return throwError('Error Handle');
  }
}
