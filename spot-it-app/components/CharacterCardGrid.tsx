import { Image, View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { ImageProperties } from "@/constants/interfaces";
import LayoutConstructor from "../constants/modules/layoutConstructorClass";
import GestureResponderEvent from "react-native";
import TiltGenerator from "../constants/modules/TiltGenerator";

type CharacterCardProps = {
	items: ImageProperties[][];
	getNewMatch: Function;
	sharedImage: ImageProperties;

};

export default function CharacterCardGrid({ items, getNewMatch, sharedImage }: CharacterCardProps): JSX.Element[] | JSX.Element {

	/**
	 * 
	 * @param e press event
	 * @param match type of ImageProperites: the item we are trying to match.
	 * @param item the item that's clicked
	 * @description this is used to generate a new match and is only called if the selected image matches the current match.
	 */
	const imageHandler = (e: GestureResponderEvent.GestureResponderEvent, match: ImageProperties, item: ImageProperties): void => {
		if (item.url === match.url) {
			getNewMatch();
		}
	};

	//Instantiate the tilt class.
	const Tilt = new TiltGenerator();


	/**
	 * 
	 * @param arr ImageProperties[] 
	 * @param count number
	 * @returns Style object or undefined.
	 * @description this is used to create the layout for the middle row of the card.
	 */
	const positionMiddleRow = (arr: ImageProperties[], count: number): Object | undefined => {
		if (arr.length === 4) {
			if (count === 0) {
				return {
					top: -40,
					left: 5
				}
			} else if (count === arr.length - 1) {
				return {
					bottom: -40,
					right: 5
				}
			}
		}
	}


	/**
	 * 
	 * @param arr ImageProperties[][] the full layout grid.
	 * @param arrCount Number the current count, the current row that we're on.
	 * @param count the current item in the row.
	 * @returns Style Object or undefined.
	 * @description offsets the first item on the third row.
	 */
	const positionBottomRow = (arr: ImageProperties[][], arrCount: number, count: number): Object | undefined => {
		if (arr.length - 1 === arrCount) {
			if (count === 0) {
				return {
					top: -20,
					left: -25
				}
			}
		} 
	}


	/**
	 * 
	 * @param arrCount number
	 * @param count number
	 * @returns Style Object or undefined
	 * @description offsets the second item of the first row on the card.
	 */
	const positionTopRow = (arrCount: number, count: number): Object | undefined => {
		if (arrCount === 0 && count === 1) {
			return {
				right: -20,
				bottom: -15
			}
		}
	}



	if (items) {
		return items.map((x: ImageProperties[], y: number): JSX.Element => {
			return (
				<View
					id={`row_${y}`}
					key={`row_${y}`}
					style={styles.cardRow}
				>
					{x.map(
						(a: ImageProperties, b: number): JSX.Element => {
							
							return (
								<Pressable
									key={`button_${y}_${b}`}
									style={[positionTopRow(y, b), positionMiddleRow(x, b), positionBottomRow(items, y, b)]}
									onPress={(e) => imageHandler(e, sharedImage, a)}
								>
									<Image
										source={a.url}
										style={[styles.image, Tilt.getTilt()]}
										key={`image_${y}_${b}`}
										resizeMode={"contain"}
									></Image>
								</Pressable>
							)
						}
					)}
				</View>
			);
		});
	} else {
		return (
			<View>
				<Text>Nothing yet</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		width: 55,
		height: 55,
	},
	cardRow: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		justifyContent: 'center',
		columnGap: 10,
		rowGap: 10,
	},
});
