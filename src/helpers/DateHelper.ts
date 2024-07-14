import { TextHelper } from './TextHelper';

interface IDateHelper {
    date: string;
    isToday: () => boolean;
    getHoursAgo: () => number;
}

export class DateHelper implements IDateHelper {
    public date: string = '';
    private rawDate: Date  = new Date();

    constructor(date: string) {
        this.rawDate = new Date(date);
        this.date = this.formatDate(date);
    }

    isToday(): boolean {
        const today = new Date();
        return (
            this.rawDate.getDate() === today.getDate() &&
            this.rawDate.getMonth() === today.getMonth() &&
            this.rawDate.getFullYear() === today.getFullYear()
        );
    }

    getHoursAgo(): number {
        const now = new Date();
        const diffInMilliseconds = now.getTime() - this.rawDate.getTime();
        return Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    }

    private formatDate(createdDate: string): string {
        const date = new Date(createdDate);

        if (this.isToday()) return this.formatTodayDate();

        const options: any = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const formattedDate = date.toLocaleDateString('en-GB', options).replace(/\//g, '.');

        return `${ formattedDate }`;
    }

    private formatTodayDate() {
        const hours = this.getHoursAgo()

        return `${ hours } час${ TextHelper.pluralEnding(hours, [ '', 'a', 'ов' ]) } назад`;
    }
}