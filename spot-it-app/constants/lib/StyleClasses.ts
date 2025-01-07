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
	mediumText: {
		fontSize: 18,
		fontFamily: "Red Hat Display",
	},
	largeText: {
		fontSize: 32,
		fontFamily: "Red Hat Display",
	},
	textInput: {
		padding: 5,
		borderColor: "black",
		borderWidth: 1,
		borderStyle: "solid",
		fontSize: 18,
		fontFamily: "Red Hat Display",
	},
	invalidInput: {
		padding: 5,
		borderColor: "#cc0000",
		color: "#cc0000",
		borderWidth: 1,
		borderStyle: "solid",
		fontSize: 18,
		fontFamily: "Red Hat Display",
	},
	buttonGroup: {
		display: "flex",
		rowGap: 20,
		alignItems: 'center',
	},
});