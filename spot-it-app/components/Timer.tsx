import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TimerClass from "@/constants/modules/TimerClass";

interface TimerProps {
	start: boolean;
}

export default function Timer({ start }: TimerProps) {
	const [seconds, setSeconds] = useState<string>("00");
	const [minutes, setMinutes] = useState<string>("00");

	useEffect(() => {
		if (start) {
            const intervalId: NodeJS.Timeout = setInterval(() => {
                //Get one second more than the current count.
				let currentSeconds = parseInt(seconds) + 1;

                    //If one minute has elapsed
                    if (currentSeconds === 60) {

                        //Reset the count for seconds
						let Seconds = new TimerClass(seconds, 2);
						setSeconds(Seconds.resetTime());

                        //Increment minutes
						let Minutes = new TimerClass(minutes, 2);
                        setMinutes(Minutes.incrementTime());
                        
                    } else {
                        //Increment seconds
						let Seconds = new TimerClass(seconds, 2);
						setSeconds(Seconds.incrementTime());
					}
              
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [start, seconds]);

	if (start) {
		return (
			<View style={styles.container}>
				<Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    timerText: {
        fontFamily: "Red Hat Display",
        letterSpacing: 2,
        fontSize: 20,
        fontWeight: 900,
    }
})