import { Image, View, StyleSheet, FlatList, Text } from "react-native";
import { ImageProperties } from "@/constants/interfaces";
import LayoutConstructor from "../constants/modules/layoutConstructorClass";

type CharacterCardProps = {
	items: ImageProperties[][];
};

export default function CharacterCardGrid({ items }: CharacterCardProps): JSX.Element[] | JSX.Element {

    if (items) {
        
		return items.map((x: ImageProperties[], y: number): JSX.Element => {
			return (
				<View
					id={`row_${y}`}
					key={`row_${y}`}
					style={styles.cardRow}
				>
                    { 
                        x.map((a: ImageProperties, b: number): JSX.Element => (
							<Image
								source={a.url}
								style={styles.image}
								key={`image_${y}_${b}`}
								resizeMode={"contain"}
							></Image>
						))
                    }
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
	cardRow: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
	},
});
