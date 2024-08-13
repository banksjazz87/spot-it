import { Text, View } from "react-native";
import { useEffect, useState } from "react";

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
                        let initSeconds = 0;
                        setSeconds(initSeconds.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false
                        }));
                        setMinutes((c) => c + 1);
                    } else {
                        setSeconds((c) => c + 1)
                    }
				}, 100);

				return () => clearInterval(intervalId);
			}
    }, [start]);
    

    return (
        <View>
            <Text>{minutes}</Text>
        </View>
    )
}