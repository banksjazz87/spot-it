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
	const imageHandler = (e: GestureResponderEvent.GestureResponderEvent, match: ImageProperties, item: ImageProperties): void => {
		if (item.url === match.url) {
			getNewMatch();
		}
	};

	const Tilt = new TiltGenerator();

	if (items) {
		return items.map((x: ImageProperties[], y: number): JSX.Element => {
			return (
				<View
					id={`row_${y}`}
					key={`row_${y}`}
					style={styles.cardRow}
				>
					{x.map(
						(a: ImageProperties, b: number): JSX.Element => (
							<Pressable
								key={`button_${y}_${b}`}
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
		width: 70,
		height: 70,
	},
	rotateTopRight: {
		transform: [{ rotate: "25deg" }],
	},
	rotateBottomRight: {
		transform: [{ rotate: "135deg" }],
	},
	rotateTopLeft: {
		transform: [{ rotate: "330deg" }],
	},
	rotateBottomLeft: {
		transform: [{ rotate: "330deg" }],
	},
	cardRow: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		columnGap: 5,
	},
});
