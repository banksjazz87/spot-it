import { StyleSheet, View, Text } from 'react-native';
import { StyleClasses } from '../constants/StyleClasses';
import CharacterCardGrid from './CharacterCardGrid';
import CharacterImages from '../constants/CharacterImages';


export function Card() {
	const row1 = CharacterImages.slice(0, 2);
	const row2 = CharacterImages.slice(2, 6);
	const row3 = CharacterImages.slice(6, 8);

	const grid = [row1, row2, row3];
	return (
		< View style = { [styles.card, StyleClasses.boxShadow]} >
				<CharacterCardGrid
					items={grid}
				/>
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
		rowGap: 20,
	},
});