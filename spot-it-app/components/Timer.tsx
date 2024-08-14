import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import TimerClass from "@/constants/modules/TimerClass";

interface TimerProps{
    start: boolean;
}

export default function Timer({ start }: TimerProps) {
    const [seconds, setSeconds] = useState<string>('00');
    const [minutes, setMinutes] = useState<string>('00');

    useEffect(() => {
			if (start) {
                const intervalId: NodeJS.Timeout = setInterval(() => {
                    let currentSeconds = parseInt(seconds) + 1;

                    if (currentSeconds === 60) {
                        let Seconds = new TimerClass(seconds);
                        setSeconds(Seconds.resetTime());

                        let Minutes = new TimerClass(minutes);
                        setMinutes(Minutes.incrementTime());
                            
                    } else {
                        let Seconds = new TimerClass(seconds);
                        setSeconds(Seconds.incrementTime());
                    }
				}, 100);

				return () => clearInterval(intervalId);
			}
    }, [start]);
    

    return (
        <View>
            <Text>{`${minutes}:${seconds}`}</Text>
        </View>
    )
}