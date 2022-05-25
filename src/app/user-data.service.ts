import {Injectable} from "@angular/core";
import {IUser} from "./shared/interfaces/user";
import {Observable, of, throwError} from "rxjs";
import {ICalendarCell} from "./shared/interfaces/calendar-cell.interface";

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public userId: string = '';

  constructor() {
  }

  public loadUsers(): IUser[] {
    return JSON.parse(localStorage.getItem('users') as string) as IUser[] || [];
  }

  public loadUser(id: string): Observable<IUser | undefined> {
    if (localStorage.getItem('users')) {
      const users: IUser[] = this.loadUsers();
      const user = users.find((value) => value.id === id);
      return user !== undefined ? of(user) : throwError(() => 'Error Handle');
    } else return throwError(() => 'Error Handle');
  }

  public saveUser(user: IUser, id: string): Observable<IUser> {
    const users: IUser[] = this.loadUsers();
    if (!users){
      const users: IUser[] = [];
      users.push({...user});
      //If there is no users, then there is not meals as well
      const meals: {userid: string, meals: ICalendarCell[]}[] = [{userid: user.id, meals: []}];
      localStorage.setItem('meals', JSON.stringify(meals));
    } else {
      const findedUser = users.find((value)=>value.id === id)
      const meals = JSON.parse(localStorage.getItem('meals') as string) as {userid: string, meals: ICalendarCell[]}[]
      if (!meals.find((value)=>value.userid === user.id)){
        meals.push({userid: user.id, meals: []});
        localStorage.setItem('meals', JSON.stringify(meals));
      }
      findedUser ? users[users.indexOf(findedUser)] = {...user} : users.push({...user,});
    }
    localStorage.setItem('users', JSON.stringify(users));
    return of(user)
  }
}
