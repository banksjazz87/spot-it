import { GestureResponderEvent, Pressable, Text } from 'react-native';

interface ButtonProps {
    text: string;
    textStyle: Object | Object[];
    method: Function;
    pressStyle: Object | Object[];
}

export default function PrimaryButton({text, pressStyle, textStyle, method}: ButtonProps) {
    return (
        <Pressable
            onPress={(event: GestureResponderEvent): void => method()}
            style={pressStyle}
        >
            <Text
                style={textStyle}
            >
                {text}
            </Text>
        </Pressable>
    )
}