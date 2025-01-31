import { Stack, router } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomTitleProps {
	styleProps: Object;
	heading: string;
}

export default function Layout(): React.JSX.Element {

	return (
		<Stack>
			<Stack.Screen
				name="reset-password"
			/>
			<Stack.Screen
				name="register"
				options={{
					title: "New Account",
				}}
			/>
		</Stack>
	);
}


const styles = StyleSheet.create({
	whiteHeading: {
		color: "white",
		fontSize: 32,
		fontWeight: 600,
		textTransform: "uppercase",
    },
    
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 10,
		paddingTop: 30,
        backgroundColor: "black",
        paddingLeft: 10,
        paddingRight: 10, 
        alignItems: 'center'
	},
});