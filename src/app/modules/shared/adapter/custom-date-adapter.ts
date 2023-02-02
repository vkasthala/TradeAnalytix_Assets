import { NativeDateAdapter } from "@angular/material/core";
import { CustomDateFormatPipe } from "../pipes/custom-date-format-pipe";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date): string {
        const pipe = new CustomDateFormatPipe();
        return pipe.transform(date);
    }

    createDate(year: number, month: number, date: number): Date{
        return super.createDate(year, month, date);
    }
}
