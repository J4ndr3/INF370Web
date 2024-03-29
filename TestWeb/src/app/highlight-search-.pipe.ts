import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args && value) {
      value = String(value); // make sure its a string
      let startIndex = value.toLowerCase().indexOf(args.toLowerCase());
      if (startIndex != -1) {
          let endLength = args.length;
          let matchingString = value.substr(startIndex, endLength);
          return value.replace(matchingString, "<mark>" + matchingString + "</mark>");
      }

  }
  return value;
  }

}
