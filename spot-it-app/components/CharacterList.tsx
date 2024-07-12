import { FlatList, StyleSheet, Text, SafeAreaView, Image, View, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { StyleClasses } from '../constants/StyleClasses';

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
			<SafeAreaView style={styles.listContainer}>
				<FlatList
					data={properties}
					horizontal={false}
					numColumns={2}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.characterTile}>
							<Image
								source={item.url}
								style={styles.image}
								key={item.key}
								resizeMode={"contain"}
							/>
							<Text style={styles.descriptionText}>{item.description}</Text>
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
	characterTile: {
		display: "flex",
		flexDirection: "column",
		rowGap: 20,
		marginVertical: 20,
		borderRadius: 12,
		padding: 12,
		marginHorizontal: 12,
        backgroundColor: 'white', 
        shadowOffset: { width: 1, height: 4 },
        shadowColor: 'black',
        shadowOpacity: .4,
	},
	listContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 400,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 140
	},
	descriptionText: {
		fontFamily: "cursive",
		fontSize: 20,
		fontWeight: 200,
	},
});
