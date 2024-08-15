/**
 * @description Class to update a timer, takes on the constructor params of time and digts.  The time is the current time string and the number refers to the number of digits that should be displayed in the time string.
 */
class TimerClass {
    time: string;
    digits: number;

    constructor(time: string, digits: number) {
        this.time = time;
        this.digits = digits;
    }

    incrementTime(): string {
        const newTime = parseInt(this.time) + 1;
        const timeString = newTime.toLocaleString("en-US", {
					minimumIntegerDigits: this.digits,
					useGrouping: false,
        });
        
        return timeString;
    }

    decrementTime(): string {
        const newTime = parseInt(this.time) - 1;
        const timeString = newTime.toLocaleString('en-US', {
            minimumIntegerDigits: this.digits,
            useGrouping: false,
        });

        return timeString;
    }

    resetTime(): string {
        const initTime = 0;
        const timeString = initTime.toLocaleString('en-US', {
            minimumIntegerDigits: this.digits,
            useGrouping: false
        });

        return timeString;
    }

}

export default TimerClass;