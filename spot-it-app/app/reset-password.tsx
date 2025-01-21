import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, GestureResponderEvent, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/global/PrimaryButton";
import { router } from "expo-router";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import API from "@/constants/modules/ApiClass";
import { APIResponse, EmailData, SQLResponse, APIError, User } from "@/constants/interfaces";
import AppModal from "@/components/global/AppModal";
import LoadingModal from "@/components/global/LoadingModal";
import RequestTempPassword from "@/components/resetPassword/RequestTempPassword";
import VerifyTempPassword from "@/components/resetPassword/VerifyTempPassword";
import SystemUser from "@/constants/modules/SystemUserClass";

export default function ResetPassword(): JSX.Element {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalText, setModalText] = useState<string>("This is a temporary message just to start styling so oh yeah cool beans.");
	const [validSubmission, setValidSubmission] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	


	const displayAppModalMessage = (message: string): void => {
		setIsModalVisible(true);
		setModalText(message);
	};

	const delayedFailureMessage = (message: string): void => {
		setTimeout((): void => {
			displayAppModalMessage(message);
			setValidSubmission(false);
		}, 500);
	};

	
	return (
		<SafeAreaView style={[StyleClasses.loginContainer, { justifyContent: "center", flex: 1 }]}>
			{isLoading && (
				<LoadingModal
					isLoading={isLoading}
					visibleHandler={(): void => setIsLoading(!isLoading)}
				/>
			)}
			{isModalVisible && validSubmission && (
				<AppModal
					modalVisible={isModalVisible}
					visibleHandler={(): void => setIsModalVisible(!isModalVisible)}
					message={modalText}
					acceptText={"Okay"}
					acceptHandler={(): void => router.navigate("/")}
					closeHandler={(): void => setIsModalVisible(false)}
					rejectText="Cancel"
					rejectHandler={(): void => setIsModalVisible(false)}
				/>
			)}

			{isModalVisible && !validSubmission && (
				<AppModal
					modalVisible={isModalVisible}
					visibleHandler={(): void => setIsModalVisible(!isModalVisible)}
					message={modalText}
					acceptText={"Okay"}
					acceptHandler={(): void => setIsModalVisible(false)}
					closeHandler={(): void => setIsModalVisible(false)}
				/>
			)}

			{!validSubmission && (
				<RequestTempPassword
					startLoadingHandler={(): void => setIsLoading(true)}
					stopLoadingHandler={(): void => setIsLoading(false)}
					modalMessageHandler={(message: string): void => displayAppModalMessage(message)}
					delayedModalMessage={(message: string): void => delayedFailureMessage(message)}
					setIsValid={(): void => setValidSubmission(true)}
				/>
			)}

			{validSubmission && (
				<VerifyTempPassword />
			)}


			
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	innerContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 15,
		padding: 20,
		width: 400,
	},
	modalContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, .8)",
	},
});
