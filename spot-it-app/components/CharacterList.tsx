import { FlatList, StyleSheet, Text, SafeAreaView, Image, StatusBar, TouchableOpacity } from "react-native";
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
			<SafeAreaView>
				<FlatList
					data={properties}
					renderItem={({ item }) => (
						<TouchableOpacity>
							<Image
								source={item.url}
								style={styles.image}
								key={item.key}
							/>
							<Text>{item.description}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item.key}
				/>
			</SafeAreaView>
		);
}

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
		marginRight: 20,
	},
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});
