import { View, Modal, StyleSheet, Text, Pressable } from "react-native";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import PrimaryButton from "./PrimaryButton";

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
			<View style={StyleClasses.modalOverlay}>
				<View style={[styles.modalBox]}>
					<Text style={StyleClasses.mediumText}>{message}</Text>

					<View style={StyleClasses.btnGroup}>
						<PrimaryButton
							text={acceptText}
							method={(): void => acceptHandler()}
							style={{ width: 150, paddingLeft: 10, paddingRight: 10 }}
						/>

						{rejectHandler && rejectText && (
							<PrimaryButton
								text={rejectText}
								method={(): void => rejectHandler()}
								style={{ backgroundColor: "#FF0000", width: 150, paddingLeft: 10, paddingRight: 10 }}
							/>
						)}
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalBox: {
		backgroundColor: "white",
        color: "black",
        padding: 20,
        paddingBottom: 60,
        paddingTop: 60,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20, 
        borderRadius: 10,
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: .8,
        shadowRadius: 5,
        shadowColor: 'black'
    },
});
