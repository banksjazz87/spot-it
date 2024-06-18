import { Text, View } from "react-native";
import {Card} from "../components/Card";

export default function Index() {
  return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
        alignItems: "center",
        rowGap: 40
			}}
		>
			<Card></Card>
			<Card></Card>
		</View>
	);
}
