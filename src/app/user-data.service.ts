import {Injectable} from "@angular/core";
import {IUser} from "./shared/interfaces/user";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public gender: string = '';
  public heightCm: number = 0;
  public weightkg: number = 0;

  public minCal: number = 0;
  public maxCal: number = 0;
  public fats: number = 0;
  public proteins: number = 0;
  public carbohydrates: number = 0;

  constructor() {
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
        weightkg: user.weightkg
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      return of(newUser);
    }
    else return throwError('Error Handle');
  }
}
