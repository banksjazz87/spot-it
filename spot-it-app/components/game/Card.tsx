import { StyleSheet, View, Text } from "react-native";
import { StyleClasses } from "../../constants/lib/StyleClasses";
import CharacterCardGrid from "./CharacterCardGrid";
import CharacterImages from "../../constants/lib/CharacterImages";
import { ImageProperties } from "@/constants/interfaces";
import TiltGenerator from "../../constants/modules/TiltGenerator"

interface CardProps {
	images: ImageProperties[] | undefined;
	newMatch: Function;
	sharedImage: ImageProperties;
	countHandler: Function;
}

export function Card({ images, newMatch, sharedImage, countHandler }: CardProps) {
	if (images && images.length > 0) {
		const row1 = images.slice(0, 2);
		const row2 = images.slice(2, 6);
		const row3 = images.slice(6, 8);
		const grid = [row1, row2, row3];

		const Tilt = new TiltGenerator();

		return (
			<View style={[styles.card, StyleClasses.boxShadow]}>
				<CharacterCardGrid
					items={grid}
					getNewMatch={newMatch}
					sharedImage={sharedImage}
					countHandler={countHandler}
				/>
			</View>
		);
	} else {
		return (
			<View>
				<Text>Nothing yet</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		height: 280,
		width: 280,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		rowGap: 20,
		position: 'relative',
		padding: 20
	},
});
