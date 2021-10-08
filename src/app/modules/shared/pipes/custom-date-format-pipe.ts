import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
import { environment } from "src/environments/environment";

@Pipe({
    name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {
    private timezone = environment.tz;

    transform(date: string | Date, timeFormat: string = '') {
        const defaultValues = {
            dateFormat: 'yyyy-MM-dd',
            language: 'en-US',
            timeZone: this.timezone
        };
        const timeZoneOffset = moment(new Date(date)).zone(defaultValues.timeZone).format('Z');
        const datePipe = new DatePipe(defaultValues.language);
        const dateFormat = timeFormat ? `${defaultValues.dateFormat}  ${timeFormat}` : defaultValues.dateFormat;
        return datePipe.transform(date, dateFormat, timeZoneOffset, defaultValues.language);
    }
}
