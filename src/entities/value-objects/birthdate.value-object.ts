import dayjs from 'dayjs';

export class Birthdate {
    private date: Date;

    constructor(date: Date) {
        this.date = this.validDate(date);
    }

    private validDate(date: Date) {
        if (!date) throw new Error('Invalid date', { cause: 'Validation Error' });

        if (dayjs(date).isAfter(dayjs())) throw new Error('Invalid date', { cause: 'Validation Error' });

        return date;
    }

    getDate() {
        return this.date;
    }
}
