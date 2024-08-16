import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { ImageProperties } from "@/constants/interfaces";
import CharacterImages from "@/constants/lib/CharacterImages";
import LayoutConstructor from "@/constants/modules/layoutConstructorClass";
import { Card } from "../../components/game/Card";
import { Colors } from "../../constants/lib/Colors";
import PrimaryButton from "@/components/global/PrimaryButton";
import Timer from "@/components/game/Timer";

export default function Game() {
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
	const [startGameTimer, setStartGameTimer] = useState<boolean>(false);
	const [timedGame, setTimedGame] = useState<boolean>(false);
	const [showTimer, setShowTimer] = useState<boolean>(false);

	const [numberOfMatches, setNumberOfMatches] = useState<number>(0);

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
		if (timedGame && countDownTimer > 0) {
			const intervalId: NodeJS.Timeout = setInterval(() => {
				setCountDownTimer(c => c - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		} 
	}, [timedGame, countDownTimer]);

	useEffect(() => {
		if (countDownTimer === 0) {
			createNewMatch();
			setStartGameTimer(true);
			setShowTimer(true);
		}
	}, [countDownTimer]);

	

	//Used to update the current match, when this is updated, everything else updates as well.
	const createNewMatch = (): void => {
		const randomNum = new LayoutConstructor(CharacterImages).getRandomNumber();
		setMatchIndex(randomNum);
		setSharedImage(CharacterImages[randomNum]);
	};

	if (matchIndex === -1 && !timedGame) {
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
					text="One Player Game"
					style={{ paddingTop: 20, paddingBottom: 20, width: 370 }}
				/>
				<PrimaryButton
					method={(): void => {
						setTimedGame(true);
					}}
					text="Timed Game"
					style={{ paddingTop: 20, paddingBottom: 20, width: 370 }}
				/>
			</View>
		);
	} else if (matchIndex === -1 && timedGame) {
		return (
			<View style={styles.countDown}>
				<Text style={timedGame && countDownTimer !== 0 ? [{ display: "flex" }, styles.countDownNumber] : { display: "none" }}>{countDownTimer}</Text>
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
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						columnGap: 20,
					}}
				>
					<Text>{numberOfMatches}</Text>
					<PrimaryButton
						method={(): void => {
							setSharedImage(initImage);
							setMatchIndex(-1);
							setCountDownTimer(3);
							setTimedGame(false);
							setStartGameTimer(false);
							setNumberOfMatches(0);
						}}
						text={"Restart"}
					/>
					<Timer
						start={startGameTimer}
						stop={(): void => setStartGameTimer(false)}
						display={showTimer}
					/>
				</View>

				<Card
					images={cardOne}
					newMatch={createNewMatch}
					sharedImage={sharedImage}
					countHandler={(): void => setNumberOfMatches((c) => c + 1)}
				/>
				<Card
					images={cardTwo}
					newMatch={createNewMatch}
					sharedImage={sharedImage}
					countHandler={(): void => setNumberOfMatches((c) => c + 1)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	countDown: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center", 
		flex: 1,
	},
	countDownNumber: {
		fontSize: 80,
		fontWeight: 700
	}
});
