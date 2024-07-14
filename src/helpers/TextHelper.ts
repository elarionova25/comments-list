export class TextHelper {
    static pluralEnding(number: number, endings: string[]): string {
        const absoluteNumber = Math.abs(number) % 100;

        if (absoluteNumber >= 5 && absoluteNumber <= 20) {
            return endings[ 2 ];
        }

        const lastDigit = absoluteNumber % 10;

        if (lastDigit === 1) {
            return endings[ 0 ];
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return endings[ 1 ];
        }

        return endings[ 2 ];
    }
}