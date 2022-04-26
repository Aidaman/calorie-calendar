import {Injectable} from "@angular/core";

export interface IUser{
  gender: string ;
  heightCm: number;
  weightkg: number;
  minCal: number;
  maxCal: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
}

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

  public loadUser(): void{
    if(localStorage.getItem('user')){
      const user: IUser = JSON.parse(localStorage.getItem('user') as string);

      this.gender = user.gender;
      this.heightCm = user.heightCm;
      this.weightkg = user.weightkg;
      this.minCal = user.minCal;
      this.maxCal = user.maxCal;
      this.proteins = user.proteins;
      this.fats = user.fats;
      this.carbohydrates = user.carbohydrates;
    }
  }

  public saveUser(): void{
    const newUser: IUser = {
      carbohydrates: this.carbohydrates,
      fats: this.fats,
      gender: this.gender,
      heightCm: this.heightCm,
      maxCal: this.maxCal,
      minCal: this.minCal,
      proteins: this.proteins,
      weightkg: this.weightkg
    };
    localStorage.setItem('user', JSON.stringify(newUser));
  }
}
