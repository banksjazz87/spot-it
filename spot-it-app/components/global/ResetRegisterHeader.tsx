import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleClasses } from "@/constants/lib/StyleClasses";

interface HeaderProps {
	title: string;
}

export default function ResetRegisterHeader({ title }: HeaderProps): React.JSX.Element {
	return (
		<View style={StyleClasses.stackHeaderLarge}>
			<Text style={StyleClasses.stackHeading}>{title}</Text>
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