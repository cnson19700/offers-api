export class TimeDate {
    // Validate format checkin date YYYY-MM-DD
    public dateIsValid(dateStr: string) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateStr.match(regex) === null) {
            return false;
        }

        const date = new Date(dateStr);

        const timestamp = date.getTime();

        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return false;
        }

        return date.toISOString().startsWith(dateStr);
    }

    public addDays(date: string, days: number) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public compareDate(offerDate: Date, addDayValue: number, checkinDateBefore: string) {
        let checkinDate = this.addDays(checkinDateBefore, addDayValue);
        return (checkinDate <= offerDate) ? true : false;
    }
}