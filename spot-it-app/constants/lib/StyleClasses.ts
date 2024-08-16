import { StyleSheet } from 'react-native';

/**
 * This will be used to set up some global styles.
 */

export const StyleClasses = StyleSheet.create({
	boxShadow: {
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		borderRadius: 200,
	},
	headingOne: {
		fontSize: 24,
		textAlign: "center",
		marginTop: 20,
		marginBottom: 20,
	},
});