import { FlatList, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';


type ImageProperties = {
    key: string;
    url: string;
    description: string;
}

type CharacterListProps = {
    properties: ImageProperties[];
}

export default function CharacterList({properties}:  CharacterListProps) {
    return (
			<View>
				<FlatList
					data={properties}
					renderItem={({ item }) => 
						<>
							<Image src={item.url}></Image>
							<Text>{item.description}</Text>
						</>
					}
				/>
			</View>
		);
}