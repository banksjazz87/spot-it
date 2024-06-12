import { Image, StyleSheet, Platform, Text } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";




export default function TestingScreen() {
    return (
		
        <ThemedView style={styles.titleContainer}>
            <ThemedText style={{ marginTop: 600 }}type="title">Testing</ThemedText>
        </ThemedView>
			
		);
}


const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});