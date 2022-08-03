import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle'
})
export class ShortPipe implements PipeTransform {
  transform(title: string, max: number = 15, ellipsis: boolean = true): string | null {
    if(title.length > max) {
      title = title.slice(0, max);
      if (title.indexOf(' ') > 0 && title.lastIndexOf(' ') < Math.abs(max-5)){
        return title.slice(0, title.lastIndexOf(' '));
      } else {
        if (ellipsis) return title.slice(0, Math.abs(max-5)) + '...';
        else return title.slice(0, Math.abs(max));
      }
    } else{
      return title
    }
  }
}
