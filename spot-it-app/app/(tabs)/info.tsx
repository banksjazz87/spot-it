import { Text, SafeAreaView,  } from "react-native";
import CharacterList from "@/components/global/CharacterList";
import { StyleClasses } from "../../constants/lib/StyleClasses";
import CharacterImages from "../../constants/lib/CharacterImages";



export default function Info() {

    return (
			<SafeAreaView>
				<Text style={StyleClasses.headingOne}>Meet the Characters</Text>
			<CharacterList properties={CharacterImages} />
			</SafeAreaView>
		);
}






