import { useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import { StyleClasses } from '@/constants/lib/StyleClasses';
import Animated, {
    useSharedValue,
    withSpring,
    withRepeat,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSequence, 
    cancelAnimation
} from 'react-native-reanimated';

interface LoadingModalProps {
    isLoading: boolean;
    visibleHandler: Function;
}

const duration = 2000;
const easing = Easing.bezier(0.28, 1.32, 0.27, -0.59);

export default function LoadingModal({ isLoading, visibleHandler }: LoadingModalProps): React.JSX.Element {
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isRotating, setIsRotating] = useState<boolean>(false);

    const rotation = useSharedValue<number>(0);
    const animatedRotate = useAnimatedStyle((): Object => ({
        transform: [{ rotate: `${rotation.value * 360}deg` }]
    }));

    useEffect((): void => {
        if (!isLoading) {
            setTimeout((): void => {
                setShowModal(false);
                cancelAnimation(rotation);
            }, 500)
        } else {
            setShowModal(true);

        }
    }, [isLoading]);

    useEffect((): void => {
        console.log(isRotating);
        if (isRotating) {
            rotation.value = withRepeat(withTiming(1, { duration, easing }), -1);
        } else {
            cancelAnimation(rotation);
            rotation.value = 0;
        }
    }, [isRotating]);

    

    const startPress = (event: GestureResponderEvent): void => {
        setIsRotating(true);   
    }

    const stopPress = (event: GestureResponderEvent): void => {
        setIsRotating(false);
    }


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
                <Animated.View
                    style={[styles.box, animatedRotate]}

                />

                <Button onPress={startPress} title="Start Animation" />
                <Button onPress={stopPress} title="Stop Animation" />
				</View>
			</Modal>
		);
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
    box: {
        height: 150,
        width: 150,
        backgroundColor: '#ffde00',
        borderRadius: 90,
        borderBottomEndRadius: 100,
        borderTopStartRadius: 100
    }
})