import { Pressable, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { ImageProperties } from "@/constants/interfaces";
import CharacterImages from "@/constants/lib/CharacterImages";
import LayoutConstructor from "@/constants/modules/layoutConstructorClass";
import { Card } from "../../components/game/Card";

export default function Index() {
	const initImage: ImageProperties = {
		key: "",
		url: "",
		description: "",
	};

	const [sharedImage, setSharedImage] = useState<ImageProperties>(initImage);
	const [matchIndex, setMatchIndex] = useState<number>(-1);
	const [cardImages, setCardImages] = useState<ImageProperties[]>([initImage]);
	const [cardOne, setCardOne] = useState<ImageProperties[]>([initImage]);
	const [cardTwo, setCardTwo] = useState<ImageProperties[]>([initImage]);

	//Create an array of all of the images needed, excluding the shared image.
	useEffect(() => {
		const viableImages = CharacterImages.slice(0);
		viableImages.splice(matchIndex, 1);

		const images = [];
		let i = 0;
		let numsUsed: number[] = [];

		while (i < 16) {
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
	}, [sharedImage]);

	useEffect(() => {
		if (cardImages.length > 1) {
			const card1 = cardImages.slice(0, 8);
			const card2 = cardImages.slice(8);

			const card1MatchIndex = new LayoutConstructor(card1 as ImageProperties[]).getRandomNumber();
			const card2MatchIndex = new LayoutConstructor(card2 as ImageProperties[]).getRandomNumber();

			const finalCard1 = card1.toSpliced(card1MatchIndex, 1, sharedImage);
			const finalCard2 = card2.toSpliced(card2MatchIndex, 1, sharedImage);
			console.log("card1 Matched", card1MatchIndex);
			console.log("card1", finalCard1);
			console.log("card2 Matched", card2MatchIndex);
			console.log("card2", finalCard2);
			setCardOne(finalCard1);
			setCardTwo(finalCard2);
		}
	}, [cardImages]);

	const createNewMatch = () => {
		const randomNum = new LayoutConstructor(CharacterImages).getRandomNumber();
		setMatchIndex(randomNum);
		setSharedImage(CharacterImages[randomNum]);
	};

	if (matchIndex === -1) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					rowGap: 40,
				}}
			>
				<Text>Nothing set</Text>
				<Pressable onPress={(): void => createNewMatch()}>
					<Text>Generate</Text>
				</Pressable>
			</View>
		);
	} else {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					rowGap: 40,
				}}
			>
				<Card
					images={cardOne}
					newMatch={createNewMatch}
					sharedImage={sharedImage}
				></Card>
				<Card
					images={cardTwo}
					newMatch={createNewMatch}
					sharedImage={sharedImage}
				></Card>
			</View>
		);
	}
}
