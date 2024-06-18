import { StyleSheet, View, Text } from 'react-native';
import { StyleClasses } from '../constants/StyleClasses';


export function Card() {
    return (
			<View style={[styles.card, StyleClasses.boxShadow]}>
				<Text>Testing 123</Text>
			</View>
		);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		height: 300,
		width: 300,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
});