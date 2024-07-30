import { Pressable, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { ImageProperties } from "@/constants/interfaces";
import CharacterImages from "@/constants/CharacterImages";
import LayoutConstructor from "@/constants/modules/layoutConstructorClass";
import { Card } from "../../components/Card";
import { Colors } from "../../constants/Colors";
import PrimaryButton from "@/components/global/PrimaryButton"

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

	//Set the images of for the two different cards.
	useEffect(() => {
		if (cardImages.length > 1) {
			const card1 = cardImages.slice(0, 8);
			const card2 = cardImages.slice(8);

			const card1MatchIndex = new LayoutConstructor(card1 as ImageProperties[]).getRandomNumber();
			const card2MatchIndex = new LayoutConstructor(card2 as ImageProperties[]).getRandomNumber();

			const finalCard1 = card1.toSpliced(card1MatchIndex, 1, sharedImage);
			const finalCard2 = card2.toSpliced(card2MatchIndex, 1, sharedImage);

			setCardOne(finalCard1);
			setCardTwo(finalCard2);
		}
	}, [cardImages]);

	//Used to update the current match, when this is updated, everything else updates as well.
	const createNewMatch = (): void => {
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
				<Pressable onPress={(): void => createNewMatch()}>
					<Text>Start One Player Game</Text>
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
					rowGap: 20,
				}}
			>

				<PrimaryButton
					method={(): void => {
						setSharedImage(initImage);
						setMatchIndex(-1);
					}}
					textStyle={{
						color: "white",
						textTransform: "uppercase",
						fontWeight: 700,
						fontSize: 20,
						fontFamily: "Red Hat Display",
					}}
					pressStyle={{
						backgroundColor: Colors.blue.background,
						paddingTop: 10,
						paddingBottom: 10,
						paddingLeft: 40,
						paddingRight: 40,
						marginTop: 20,
						borderRadius: 20,
					}}
					text={"Restart"}
				/>

				<Card
					images={cardOne}
					newMatch={createNewMatch}
					sharedImage={sharedImage}
				/>
				<Card
					images={cardTwo}
					newMatch={createNewMatch}
					sharedImage={sharedImage}
				/>
			</View>
		);
	}
}
