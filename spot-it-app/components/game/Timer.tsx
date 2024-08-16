import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TimerClass from "@/constants/modules/TimerClass";

interface TimerProps {
    start: boolean;
    stop: Function;
    display: boolean;
}

export default function Timer({ start, stop, display }: TimerProps) {
	const [seconds, setSeconds] = useState<string>("00");
	const [minutes, setMinutes] = useState<string>("3");

    useEffect(() => {
        //Make sure the imter has started
        if (start) {

            const intervalId: NodeJS.Timeout = setInterval(() => {

                //Check if the next number will be -1 seconds.
                let currentSeconds = parseInt(seconds) - 1;

                        //Update the seconds count if on zero
                        if (currentSeconds === -1) {
                            setSeconds("59");

                            //Decrement the minutes
                            let Minutes = new TimerClass(minutes, 1);
                            setMinutes(Minutes.decrementTime());

                        } else {
                            //Decrement the seconds
                            let Seconds = new TimerClass(seconds, 2);
                            setSeconds(Seconds.decrementTime());
                        }
                }, 1000);
                    //Return a function to clear the interval   
            return () => clearInterval(intervalId);
        } 
    }, [start, seconds]);
    
    useEffect(() => {
        //Check if the time has elapsed, if so, stop the timer.
        if (minutes === '0' && seconds === '00') {
            stop();
        }
    }, [seconds]);

    
    if (display) {
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
		width: 100,
	},
	timerText: {
		fontFamily: "Red Hat Display",
		letterSpacing: 2,
		fontSize: 20,
		fontWeight: 900,
	},
});
