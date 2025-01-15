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
			<View style={styles.modalContainer}>
				<View style={styles.modalBox}>
                    <Text style={StyleClasses.mediumText}>{message}</Text>
                    
                    <View style={styles.btnGroup}>
                    <PrimaryButton
                        text={acceptText}
                            method={(): void => acceptHandler()}
                            style={{width: 150, paddingLeft: 10, paddingRight: 10}}
                    />

                    {rejectHandler && rejectText &&
                        <PrimaryButton 
                        text={rejectText}
                        method={(): void => rejectHandler()}
                        style={{ backgroundColor: 'red', width: 150, paddingLeft: 10, paddingRight: 10}}
                        />
                    }
                    </View>
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
		backgroundColor: "rgba(0, 0, 0, .8)",
        color: "white",
        padding: 20
	},

	modalBox: {
		backgroundColor: "white",
        color: "black",
        padding: 20,
    },
    btnGroup: {
        display: 'flex',
        flexDirection: 'row',
        rowGap: 10,
        columnGap: 20
    }
});
