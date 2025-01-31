import { Pressable, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";


interface HeaderProps {
    title: string;
}

export default function Header({title}: HeaderProps): React.JSX.Element {
    return (
			<View style={styles.headerContainer}>
			<Text style={styles.whiteHeading}>{title}</Text>
				<Pressable onPress={() => router.navigate("/")}>
					<Ionicons
						name="log-in-outline"
						size={36}
						color="white"
					/>
				</Pressable>
			</View>
		);
}

const styles = StyleSheet.create({
	whiteHeading: {
		color: "white",
		fontSize: 24,
		fontWeight: '600',
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
		alignItems: "center",
	},
});
