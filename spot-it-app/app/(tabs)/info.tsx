import { Text, SafeAreaView } from "react-native";
import CharacterList from "../../components/CharacterList";
import { StyleClasses } from "../../constants/StyleClasses";
import CharacterImages from "../../constants/CharacterImages";



export default function Info() {

    return (
			<SafeAreaView>
				<Text style={StyleClasses.headingOne}>Meet the Characters</Text>
				<CharacterList properties={CharacterImages} />
			</SafeAreaView>
		);
}




