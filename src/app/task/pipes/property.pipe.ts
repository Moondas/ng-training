import { Pipe, PipeTransform } from '@angular/core';

/**
 * @whatIsDoes Print all array element by one property
 * @howToUse `expression | property:'propertyName'`
 * 
 * Useful for debugging
 * 
 */
@Pipe({
  name: 'property',
  pure: false
})
export class PropertyPipe implements PipeTransform {

  transform(value: Array<Object>, propertyName: string): string {
    return (value !== undefined) ? value.map(v => v[propertyName]).join(', ') : null;      
  }

}
