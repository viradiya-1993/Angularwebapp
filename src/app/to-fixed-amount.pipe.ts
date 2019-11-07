import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toFixedAmount' })
export class ToFixedAmountPipe implements PipeTransform {

  transform(value: any, args: any = false): any {
   
    let tempVal= value;
    if (typeof value == "string" && !value)
    tempVal = 0;
    if (args) {
      let tem: any = parseFloat(tempVal).toFixed(2);
      return '$' + this.addCommas(tem);
    } else
      return value;
  }
  addCommas(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

}
