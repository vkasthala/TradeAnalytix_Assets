import { NativeDateAdapter } from "@angular/material";
import { CustomDateFormatPipe } from "../pipes/custom-date-format-pipe";

export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date): string {
        debugger;
        const pipe = new CustomDateFormatPipe();
        return pipe.transform(date);
    }

    createDate(year: number, month: number, date: number): Date{
        debugger;
        return super.createDate(year, month, date);
    }
}
