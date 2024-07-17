import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { StyleClasses } from '../constants/StyleClasses';
import CharacterCardGrid from './CharacterCardGrid';
import CharacterImages from '../constants/CharacterImages';
import { ImageProperties } from '@/constants/interfaces';
import LayoutConstructor from '../constants/modules/layoutConstructorClass';


export function Card() {
	const [sharedImage, setSharedImage] = useState<ImageProperties>({
		key: '',
		url: '',
		description: ''
	});
	const [cardImages, setCardImages] = useState<ImageProperties[] | null>();


	// useEffect(() => {
	// 	const randomNum = new LayoutConstructor(CharacterImages).getRandomNumber();
	// 	setSharedImage(CharacterImages[randomNum]);
	// }, []);

	useEffect(() => {
		const images = [];
		let i = 0;
		let numsUsed: number[] = [];
		// console.log('testing HERE');

		while (i < 24) {
			let randomNum = new LayoutConstructor(CharacterImages).getRandomNumber();

			if (numsUsed.indexOf(randomNum) > -1) {
				randomNum = CharacterImages.length - 1;
				while (numsUsed.indexOf(randomNum) > -1) {
					randomNum - 1;
				}
				images.push(CharacterImages[randomNum]);
				numsUsed.push(randomNum);
				i++;
			} else {
				numsUsed.push(randomNum);
				images.push(CharacterImages[randomNum]);
				i++;
			}
		}

		// console.log('fart');
	}, []);


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