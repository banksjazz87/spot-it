import { GestureResponderEvent, Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/lib/Colors';

interface ButtonProps {
    text: string;
    method: Function;
    style?: Object | undefined;
}

export default function PrimaryButton({text, method, style}: ButtonProps) {
    return (
        <Pressable
            onPress={(event: GestureResponderEvent): void => method()}
            style={[Styles.button, style]}
        >
            <Text
                style={Styles.text }
            >
                {text}
            </Text>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.blue.background,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 40,
		paddingRight: 40,
		marginTop: 20,
		borderRadius: 20,
	},

	text: {
		color: "white",
		textTransform: "uppercase",
        fontWeight: '700',
        letterSpacing: 1,
		fontSize: 20,
        fontFamily: "Red Hat Display",
        margin: 'auto'
	},
});