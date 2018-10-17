import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(time: number): string {
    return moment.duration(moment().diff(moment(time * 1000))).humanize();
  }

}
