import {Pipe} from "@angular/core";
import {UserDataService} from "../../user-data.service";

@Pipe({
  name: 'fillPipe'
})
export class ColorFillPipe {
  constructor(private udService: UserDataService) {
  }

  transform(amount: number = 0): 'text-red' | 'text-yellow' | 'text-blue' {
    if ( amount > this.udService.maxCal*1.05){
      return 'text-red';
    } else if(amount < this.udService.minCal*0.75){
      return 'text-yellow'
    } else{
      return 'text-blue'
    }
  }
}
