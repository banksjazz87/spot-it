import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

type ImageProperties = {
	key: string;
	url: any;
	description: string;
};

type CharacterListProps = {
	properties: ImageProperties[];
};

export default function CharacterList({ properties }: CharacterListProps) {
    return (
			<FlatList
				data={properties}
				renderItem={({ item }) => (
					<View>
						<Image
							source={item.url}
							style={styles.image}
							key={item.key}
						/>
						<Text>{item.description}</Text>
					</View>
				)}
				keyExtractor={(item) => item.key}
			/>
		);
}

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
		marginRight: 20,
    }
});
