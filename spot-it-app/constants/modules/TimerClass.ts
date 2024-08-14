class TimerClass {
    time: string;

    constructor(time: string) {
        this.time = time;
    }

    incrementTime(): string {
        const newTime = parseInt(this.time) + 1;
        const timeString = newTime.toLocaleString("en-US", {
					minimumIntegerDigits: 2,
					useGrouping: false,
        });
        
        return timeString;
    }

    resetTime(): string {
        const initTime = 0;
        const timeString = initTime.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });

        return timeString;
    }
}

export default TimerClass;