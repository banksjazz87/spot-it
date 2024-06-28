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
			<SafeAreaView style={styles.listContainer}>
				<FlatList
					data={properties}
					horizontal={false}
					numColumns={3}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.characterTile}>
							<Image
								source={item.url}
								style={styles.image}
                                key={item.key}
                                resizeMode={'contain'}
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
    characterTile: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
        marginVertical: 20,

    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 400,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
