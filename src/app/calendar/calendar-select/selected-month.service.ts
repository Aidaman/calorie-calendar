import {Injectable} from "@angular/core";
import {Months} from "../../shared/consts/months";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedMonthService {
  public select: BehaviorSubject<string> = new BehaviorSubject<string>( Months[(new Date()).getMonth()]  )
  constructor() {}

  public changeMonth(monday: Date, sunday: Date){
    if (monday.getMonth() < sunday.getMonth()){
      this.select.next(Months[monday.getMonth()]);
    } else{
      this.select.next(Months[sunday.getMonth()]);
    }
  }
}
