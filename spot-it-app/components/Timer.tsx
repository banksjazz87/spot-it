import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TimerClass from "@/constants/modules/TimerClass";

interface TimerProps {
	start: boolean;
}

export default function Timer({ start }: TimerProps) {
	const [seconds, setSeconds] = useState<string>("00");
    const [minutes, setMinutes] = useState<string>("3");
    const [milliSeconds, setMilliSeconds] = useState<string>("00");

	useEffect(() => {
		if (start) {
            const intervalId: NodeJS.Timeout = setInterval(() => {

                let currentMilliSeconds = parseInt(milliSeconds) - 1;
                let currentSeconds = parseInt(seconds) - 1;

                if (currentMilliSeconds === -1) {
                    setMilliSeconds('59');

                    if (currentSeconds === -1) {
                        setSeconds('59');

                        let Minutes = new TimerClass(minutes, 1);
                        setMinutes(Minutes.decrementTime());

                    } else {
                        let Seconds = new TimerClass(seconds, 2);
                        setSeconds(Seconds.decrementTime());
                    }
                    
                } else {
                    let Milli = new TimerClass(milliSeconds, 2);
                    setMilliSeconds(Milli.decrementTime());
                }
              
			}, 1);

			return () => clearInterval(intervalId);
		}
	}, [start, milliSeconds]);

	if (start) {
		return (
			<View style={styles.container}>
				<Text style={styles.timerText}>{`${minutes}:${seconds}:${milliSeconds}`}</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: 100,
    },
    timerText: {
        fontFamily: "Red Hat Display",
        letterSpacing: 2,
        fontSize: 20,
        fontWeight: 900,
    }
});