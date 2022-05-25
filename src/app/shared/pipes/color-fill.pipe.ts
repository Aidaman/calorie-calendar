import {Pipe} from "@angular/core";
import {IUser} from "../interfaces/user";

@Pipe({
  name: 'fillPipe'
})
export class ColorFillPipe {
  transform(amount: number = 0, user: IUser): 'text-red' | 'text-yellow' | 'text-blue' {
    if (user.maxCal && user.minCal){
      if ( amount > user.maxCal*1.05){
        return 'text-red';
      } else if(amount < user.minCal*0.75){
        return 'text-yellow'
      } else{
        return 'text-blue'
      }
    }
    else return 'text-red';
  }
}
