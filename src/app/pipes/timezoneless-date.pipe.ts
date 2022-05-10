import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timezonelessDate'
})
export class TimezonelessDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): Date {
    if (value != undefined && value != null)
    {
      let localTime = new Date();
      let workingDate = new Date(value);
      workingDate.setHours(workingDate.getHours() - localTime.getTimezoneOffset() / 60, 0, 0);
      return workingDate;
    }
    else
    {
      return value;
    }
  }

}
