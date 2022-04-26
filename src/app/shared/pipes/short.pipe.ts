import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle'
})
export class ShortPipe implements PipeTransform {
  transform(title: string, max: number = 15, ellipsis: boolean = true): string | null {
    if(title.length > max) {
      if (title.indexOf(' ') > 0 && title.indexOf(' ') < max){
        return title.substr(0, title.indexOf(' '));
      } else {
        if (ellipsis) return title.substr(0, Math.abs(max-5)) + '...';
        else return title.substr(0, Math.abs(max));
      }
    } else{
      return title
    }
  }
}
