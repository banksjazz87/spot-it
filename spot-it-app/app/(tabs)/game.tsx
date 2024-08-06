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

	const [countDownTimer, setCountDownTimer] = useState<number>(3);
	const [gameTimer, setGameTimer] = useState<number>(0);
	const [timedGame, setTimedGame] = useState<boolean>(false);

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

	useEffect(() => {
		const intervalId: NodeJS.Timeout = setInterval(() => {
			if (timedGame && countDownTimer > 0) {
				setCountDownTimer(c => c - 1);
			}
		}, 5000);
		

		return () => clearInterval(intervalId);
	}, [timedGame, countDownTimer]);

	

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
				<PrimaryButton
					method={(): void => createNewMatch()}
					text="Start One Player Game"
					style={{paddingTop: 20, paddingBottom: 20}}
				/>
				<PrimaryButton
					method={(): void => {
						createNewMatch();
						setTimedGame(true);
					}}
					text="Timed Game"
				/>
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
					text={"Restart"}
				/>

				<Text style={timedGame ? {display: 'flex'} : {display: 'none'}}>{countDownTimer}</Text>

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
