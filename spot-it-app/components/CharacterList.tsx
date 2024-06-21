import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';



type ImageProperties = {
	key: string;
	url: string;
	description: string;
};

type CharacterListProps = {
    properties: ImageProperties[];
}

export default function CharacterList({properties}:  CharacterListProps) {
    return (
			<View>
				<FlatList
					data={properties}
					renderItem={({ item }) => (
						<>
							<Image
								source={item.url}
								style={styles.image}
								key={item.key}
							/>
							<Text>{item.description}</Text>
						</>
					)}
				/>
			</View>
		);
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginRight: 20
    }
})