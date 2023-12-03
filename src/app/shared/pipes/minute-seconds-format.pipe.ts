import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: 'minuteSecondsFormat',
})
export class MinuteSecondsFormatPipe implements PipeTransform {
  transform(seconds: number): string {
    const duration = moment.duration(seconds, 'seconds');
    return moment(duration.asMilliseconds()).format('mm:ss');
  }
}
