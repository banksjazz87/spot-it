import { View, Modal, StyleSheet, Text, Pressable } from 'react-native';


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

export default function AppModal({modalVisible, visibleHandler, message, acceptText, acceptHandler, rejectText, rejectHandler, closeHandler}: AppModalProps): React.JSX.Element {
    return (
        <View style={styles.modalContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={(): void => {
                    visibleHandler();
                }}
            >
                <View style={styles.modalContainer}>
                    <Text>{message}</Text>
                    <Pressable
                        onPress={(): void => acceptHandler()}
                    >
                        <Text>{acceptText}</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
} 

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .8)'
    }
})