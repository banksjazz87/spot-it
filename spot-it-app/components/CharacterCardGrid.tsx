import { Image, View, StyleSheet, FlatList } from 'react-native';

type ImageProperties = {
    key: string;
    url: any;
    description: string;
}

type CharacterCardProps = {
    items: ImageProperties[][];
} 

export default function CharacterCardGrid({items}: CharacterCardProps): JSX.Element[] {
    
    return items.map((x: ImageProperties[], y: number): JSX.Element => {
        return (
            <View
                id={`row_${y}`}
                key={`row_${y}`}
                style={styles.cardRow}
            >
                {
                    x.map((a: ImageProperties, b: number): JSX.Element =>
                        <Image
                            source={a.url}
                            style={styles.image}
                            key={`image_${y}_${b}`}
                            resizeMode={'contain'}
                        >
                        </Image>
                    )
                }
            </View>
        )
    });


}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50
    },
    cardRow: {
        display: 'flex', 
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
});