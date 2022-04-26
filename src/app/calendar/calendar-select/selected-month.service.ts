import {Injectable} from "@angular/core";
import {Months} from "../../shared/consts/months";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedMonthService {
  public select: BehaviorSubject<string> = new BehaviorSubject<string>( Months[(new Date()).getMonth()]  )
  constructor() {}

  public getMonth(month: string): string{
    month = (Months.indexOf(month)+1).toString();
    if (+month < 10){
      month = '0'+month;
    }
    return month;
  }
}
