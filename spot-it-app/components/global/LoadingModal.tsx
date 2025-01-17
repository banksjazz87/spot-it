import { useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import { StyleClasses } from '@/constants/lib/StyleClasses';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';

interface LoadingModalProps {
    isLoading: boolean;
    visibleHandler: Function;
}

export default function LoadingModal({ isLoading, visibleHandler }: LoadingModalProps): React.JSX.Element {
    
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect((): void => {
        if (!isLoading) {
            setTimeout((): void => {
                setShowModal(false);
            }, 500)
        } else {
            setShowModal(true);
        }
    }, [isLoading]);


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={(): void => {
                setShowModal(false);
            }}
        >
            <View style={StyleClasses.modalOverlay}>
                <View style={styles.outerColor}>
                    <View style={styles.innerColor}>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    outerColor: {
        height: 100,
        width: 100,
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    }, 
    innerColor: {

    }
})