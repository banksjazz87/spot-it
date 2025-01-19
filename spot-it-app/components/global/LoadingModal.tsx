import { useEffect, useState } from "react";
import { View, Modal, Text, StyleSheet, Button, GestureResponderEvent } from "react-native";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import Animated, { useSharedValue, withSpring, withRepeat, withTiming, useAnimatedStyle, Easing, withSequence, cancelAnimation } from "react-native-reanimated";

interface LoadingModalProps {
	isLoading: boolean;
	visibleHandler: Function;
}

const duration = 2000;
const easing = Easing.bezier(0.28, 1.32, 0.27, -0.59);

export default function LoadingModal({ isLoading, visibleHandler }: LoadingModalProps): React.JSX.Element {

    const [isRotating, setIsRotating] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

	const rotation = useSharedValue<number>(0);
    const animatedRotate = useAnimatedStyle(
        (): Object => ({
            transform: [{ rotate: `${rotation.value * 360}deg` }],
        })
	);

	useEffect((): void => {
		if (!isLoading) {
			setTimeout((): void => {
				setIsRotating(false);
                cancelAnimation(rotation);
                visibleHandler();
                setShowModal(false);
			}, 1500);
		} else {
            setIsRotating(true);
            setShowModal(true);
		}
	}, [isLoading]);

	useEffect((): void => {
		if (isRotating) {
			rotation.value = withRepeat(withTiming(1, { duration, easing }), -1);
		} else {
			cancelAnimation(rotation);
			rotation.value = 0;
		}
	}, [isRotating]);

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={showModal}
			onRequestClose={(): void => setShowModal(false)}
		>
			<View style={StyleClasses.modalOverlay}>
				<Animated.View style={[styles.box, animatedRotate]} />
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	outerColor: {
		height: 100,
		width: 100,
		borderRadius: 50,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	box: {
		height: 100,
		width: 100,
		backgroundColor: "#9f2b68",
		borderRadius: 20,
	},
});
