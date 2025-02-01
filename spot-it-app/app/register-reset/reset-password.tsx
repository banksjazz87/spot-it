import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, GestureResponderEvent, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/global/PrimaryButton";
import { router } from "expo-router";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import API from "@/constants/modules/ApiClass";
import { APIResponse, EmailData, SQLResponse, APIError, User, UserId } from "@/constants/interfaces";
import AppModal from "@/components/global/AppModal";
import LoadingModal from "@/components/global/LoadingModal";
import RequestTempPassword from "@/components/resetPassword/RequestTempPassword";
import CreateNewPassword from "@/components/resetPassword/CreateNewPassword";
import VerifyTempPassword from "@/components/resetPassword/VerifyTempPassword";
import SystemUser from "@/constants/modules/SystemUserClass";
import ResetRegisterHeader from "@/components/global/ResetRegisterHeader";
import { useNavigation } from "expo-router";

export default function ResetPassword(): JSX.Element {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalText, setModalText] = useState<string>("This is a temporary message just to start styling so oh yeah cool beans.");
	const [validSubmission, setValidSubmission] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userResetEmail, setUserResetEmail] = useState<string>("");
	const [isValidTempPassword, setIsValidTempPassword] = useState<boolean>(false);
	const [userDetails, setUserDetails] = useState<UserId>({
		id: -1,
		username: '',
		email: '',
		loggedIn: false
	});
	const [isReset, setIsReset] = useState<boolean>(false);
	const [pageTitle, setPageTitle] = useState<string>("Reset Password");

	const navigation = useNavigation();
	

	useEffect((): void => {
		navigation.setOptions({
			header: () => <ResetRegisterHeader title={pageTitle} />,
		});
	}, [pageTitle]);


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

	const dealyedModalMessage = (message: string): void => {
		setTimeout((): void => {
			setIsModalVisible(true);
			setModalText(message);
		}, 500);
	}

	const updateUserDetails = (userObj: UserId): void => {
		setUserDetails({...userDetails,
			id: userObj.id,
			username: userObj.username,
			email: userObj.email,
			loggedIn: userObj.loggedIn,
		});
	}

	const modalAcceptHandler = (e: GestureResponderEvent): void => {
		if (isReset) {
			setIsModalVisible(false);
			router.navigate("/");
		} else {
			setIsModalVisible(false);
		}
	}

	
	return (
		<SafeAreaView style={[StyleClasses.loginContainer, { justifyContent: "center", flex: 1 }]}>
			{isLoading && (
				<LoadingModal
					isLoading={isLoading}
					visibleHandler={(): void => setIsLoading(!isLoading)}
				/>
			)}

			{isModalVisible && (
				<AppModal
					modalVisible={isModalVisible}
					visibleHandler={(): void => setIsModalVisible(!isModalVisible)}
					message={modalText}
					acceptText={"Okay"}
					acceptHandler={modalAcceptHandler}
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
					updateUserDetails={(obj: UserId): void => updateUserDetails(obj)}
					updatePageTitle={(text: string): void => setPageTitle(text)}
				/>
			)}

			{validSubmission && !isValidTempPassword && (
				<VerifyTempPassword
					user={userDetails}
					startLoadingHandler={(): void => setIsLoading(true)}
					stopLoadingHandler={(): void => setIsLoading(false)}
					modalMessageHandler={(message: string): void => displayAppModalMessage(message)}
					delayedModalMessage={(message: string): void => dealyedModalMessage(message)}
					validTempHandler={(bool: boolean): void => setIsValidTempPassword(bool)}
					resetForm={(): void => setValidSubmission(false)}
					updatePageTitle={(text: string): void => setPageTitle(text)}
				/>
			)}

			{isValidTempPassword && (
				<CreateNewPassword
					user={userDetails}
					delayedModalMessage={(message: string): void => dealyedModalMessage(message)}
					startLoadingHandler={(): void => setIsLoading(true)}
					stopLoadingHandler={(): void => setIsLoading(false)}
					resetHandler={(): void => setIsReset(true)}
				/>
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
