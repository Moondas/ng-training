import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(createdAt: string, now: number): number {
    const elapsedMilliseconds = now - Date.parse(createdAt);
    return Math.round(elapsedMilliseconds / 1000 / 60);
  }

}
