import { Text, View, SafeAreaView } from "react-native";
import CharacterList from "../../components/CharacterList";



export default function Info() {

    const pokemonImages = [
			{
				key: "abra",
				url: require("../../assets/images/pokemon/abra.png"),
				description: "Abra",
			},
			{
				key: "blastoise",
				url: require("../../assets/images/pokemon/blastoise.png"),
				description: "Blastoise",
			},
			{
				key: "bulbasaur",
				url: require("../../assets/images/pokemon/bulbasaur.png"),
				description: "Bulbasaur",
			},
			{
				key: "caterpie",
				url: require("../../assets/images/pokemon/caterpie.png"),
				description: "Caterpie",
			},
			{
				key: "charizard",
				url: require("../../assets/images/pokemon/charizard.png"),
				description: "Charizard",
			},
			{
				key: "charmander",
				url: require("../../assets/images/pokemon/charmander.png"),
				description: "Charmander",
			},
			{
				key: "charmeleon",
				url: require("../../assets/images/pokemon/charmeleon.png"),
				description: "Charmeleon",
			},
			{
				key: "diglett",
				url: require("../../assets/images/pokemon/diglett.png"),
				description: "Diglett",
			},
			{
				key: "geodude",
				url: require("../../assets/images/pokemon/geodude.png"),
				description: "Geodude",
			},
			{
				key: "horsea",
				url: require("../../assets/images/pokemon/horsea.png"),
				description: "Horsea",
			},
			{
				key: "jigglypuff",
				url: require("../../assets/images/pokemon/jigglypuff.png"),
				description: "Jigglypuff",
			},
			{
				key: "koffing",
				url: require("../../assets/images/pokemon/koffing.png"),
				description: "Koffing",
			},
			{
				key: "marowak",
				url: require("../../assets/images/pokemon/marowak.png"),
				description: "Marowak",
			},
			{
				key: "onix",
				url: require("../../assets/images/pokemon/onix.png"),
				description: "Onix",
			},
			{
				key: "pikachu",
				url: require("../../assets/images/pokemon/pikachu.png"),
				description: "Pikachu",
			},
			{
				key: "psyduck",
				url: require("../../assets/images/pokemon/psyduck.png"),
				description: "Psyduck",
			},
			{
				key: "rattata",
				url: require("../../assets/images/pokemon/rattata.png"),
				description: "Rattata",
			},
			{
				key: "sandslash",
				url: require("../../assets/images/pokemon/sandslash.png"),
				description: "Sandslash",
			},
			{
				key: "squirtle",
				url: require("../../assets/images/pokemon/squirtle.png"),
				description: "Squirtle",
			},
			{
				key: "vulpix",
				url: require("../../assets/images/pokemon/vulpix.png"),
				description: "Vulpix",
			},
			{
				key: "wartortle",
				url: require("../../assets/images/pokemon/wartortle.png"),
				description: "Wartortle",
			},
			{
				key: "weezing",
				url: require("../../assets/images/pokemon/weezing.png"),
				description: "Weezing",
			},
		];

    
    return (
			<View>
				<Text>This will have information about each image used.</Text>
				<CharacterList properties={pokemonImages} />
			</View>
		);
}