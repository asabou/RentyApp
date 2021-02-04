import { formatDate } from '@angular/common';

export class DateUtils {
    static getCurrentDate(): Date {
        return new Date();
    }

    static addDaysToCurrentDate(days: number): Date {
        return new Date(this.getCurrentDate().getTime() + days * 24 * 60 * 60 * 1000);
    }

    static getDateAsString(date: Date): string {
        return formatDate(date, "yyyy-MM-dd", "en");
    }

    static convertStringToDate(date: string): Date {
        return new Date(date);
    }
}