import { View, Modal, StyleSheet, Text, Pressable } from "react-native";

interface AppModalProps {
	modalVisible: boolean;
	visibleHandler: Function;
	message: string;
	acceptText: string;
	acceptHandler: Function;
	closeHandler: Function;
	rejectText?: string;
	rejectHandler?: Function;
}

export default function AppModal({ modalVisible, visibleHandler, message, acceptText, acceptHandler, rejectText, rejectHandler, closeHandler }: AppModalProps): React.JSX.Element {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={(): void => {
				visibleHandler();
			}}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalBox}>
					<Text>{message}</Text>
					<Pressable onPress={(): void => acceptHandler()}>
						<Text>{acceptText}</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, .2)",
		color: "white",
	},

	modalBox: {
		backgroundColor: "white",
		color: "black",
	},
});
