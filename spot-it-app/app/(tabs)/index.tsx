import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { ImageProperties } from "@/constants/interfaces";
import CharacterImages from "@/constants/CharacterImages";
import LayoutConstructor from "@/constants/modules/layoutConstructorClass";
import {Card} from "../../components/Card";

export default function Index() {

	const [sharedImage, setSharedImage] = useState<ImageProperties>({
		key: "",
		url: "",
		description: "",
	});
	const [matchIndex, setMatchIndex] = useState<number>(0);
	const [cardImages, setCardImages] = useState<ImageProperties[] | undefined>();
	const [cardOne, setCardOne] = useState<ImageProperties[] | undefined>();
	const [cardTwo, setCardTwo] = useState<ImageProperties[] | undefined>();
	const [cardOneMatchIndex, setCardOneMatchIndex] = useState<number>(0);
	const [cardTwoMatchIndex, setCardTwoMatchIndex] = useState<number>(0);

	//Using this to update the matchIndex and the sharedImage on screen load.
	useEffect(() => {
		const randomNum = new LayoutConstructor(CharacterImages).getRandomNumber();
		setMatchIndex(randomNum);
		setSharedImage(CharacterImages[randomNum]);
	}, []);

	//Create an array of all of the images needed, excluding the shared image.
	useEffect(() => {
		const viableImages = CharacterImages.slice(0);
		viableImages.splice(matchIndex, 1);

		const images = [];
		let i = 0;
		let numsUsed: number[] = [];

		while (i < 24) {
			let randomNum = new LayoutConstructor(viableImages).getRandomNumber();

			if (numsUsed.indexOf(randomNum) > -1) {
				randomNum = viableImages.length - 1;

				if (numsUsed.indexOf(randomNum) > -1) {
					while (numsUsed.indexOf(randomNum) > -1) {
						randomNum = randomNum - 1;
					}

					images.push(viableImages[randomNum]);
					numsUsed.push(randomNum);
					i++;
				}
			} else {
				numsUsed.push(randomNum);
				images.push(viableImages[randomNum]);
				i++;
			}
		}

		setCardImages(images);

		const card1 = images.slice(0, 8);
		const card2 = images.slice(8);

		const card1MatchIndex = new LayoutConstructor(card1 as ImageProperties[]).getRandomNumber();
		const card2MatchIndex = new LayoutConstructor(card2 as ImageProperties[]).getRandomNumber();

		const finalCard1 = card1?.toSpliced(card1MatchIndex, 1, sharedImage);
		const finalCard2 = card2?.toSpliced(card2MatchIndex, 1, sharedImage);

		console.log("card one here", card1);
		console.log("card two here", card2);
		setCardOne(finalCard1);
		setCardTwo(finalCard2);
	}, [sharedImage]);



  return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
        alignItems: "center",
        rowGap: 40
			}}
		>
			<Card images={cardOne}></Card>
			<Card images={cardTwo}></Card>
		</View>
	);
}
