import { Text, View } from 'react-native';
import  CharacterList  from "../../components/CharacterList";


export default function Info() {
    return (
			<View>
				<Text>This will have information about each image used.</Text>
				<CharacterList
					properties={[
						{
							key: "test",
							url: "../../assets/images/pokemon/abra.png",
							description: "Abra",
						},
					]}
				/>
			</View>
		);
}