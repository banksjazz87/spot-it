import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, GestureResponderEvent, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/global/PrimaryButton";
import { router, Stack } from "expo-router";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import API from "@/constants/modules/ApiClass";
import { APIResponse, EmailData, SQLResponse, APIError } from "@/constants/interfaces";
import AppModal from "@/components/global/AppModal";

export default function ResetPassword(): JSX.Element {
	const [userEmail, setUserEmail] = useState<string>("Email");
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalText, setModalText] = useState<string>("This is a temporary message just to start styling so oh yeah cool beans.");
	const [validSubmission, setValidSubmission] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const emailChangeHandler = (text: string): void => {
		setUserEmail(text);
	};

	useEffect((): void => console.log(isModalVisible), [isModalVisible]);

	//Used to get the user details based on the provided email, this is fired in the submit handler.
	const getUserDetails = async (email: string): Promise<APIResponse<EmailData> | undefined> => {
		const Api = new API("/get-user-by-email/");
		const userDetailsURL = `${Api.getUrl()}/${email}`;

		try {
			const userDetails: Response = await fetch(userDetailsURL);
			const userJSON: APIResponse<EmailData> = await userDetails.json();
			return userJSON;
		} catch (e) {
			console.log("The following error occurred in getting the user details", e);
		}
	};

	const generateNewPassword = async (userObj: EmailData): Promise<APIResponse<SQLResponse[]> | undefined> => {
		const Api = new API("/set-random-password/", userObj);

		try {
			const requestNewPassword = (await Api.putData()) as APIResponse<SQLResponse[]>;
			return requestNewPassword;
		} catch (e: any) {
			console.log("The following error occurred while generating a new password ", e);
		}
	};

	const submitHandler = (): void => {
		//Get the current user
		getUserDetails(userEmail)
			.then((data: undefined | APIResponse<EmailData>): void => {
				//Check the user's email data
				if (typeof data !== "undefined" && data.status === 200) {
					//User data
					const neededData = data.data as EmailData;

					//Create new password
					generateNewPassword(neededData)
						.then((final: APIResponse<SQLResponse[]> | undefined): void => {
							//Verify that the new password has been sent
							if (typeof final !== "undefined" && final.status === 200) {
								console.log(`The reset email has been sent to the provided email address ${neededData.email}.`);

								setModalText("Your password has been reset! Check your email for the new password and use the link provided to log in. Didn’t see the email? Check your spam folder. Need help? Contact support.");
								setValidSubmission(true);

								//Failed in reaching out to the API
							} else if (typeof final === "undefined") {
								return final;

								//Returned no results
							} else {
								console.log(`The following error occurred in sending the reset email to ${neededData.email}, ${final.message}.`);
							}
						})
						.catch((error: APIError): void => {
							console.log(error.message);
						});

					//Failure in accessing the API
				} else if (typeof data === "undefined") {
					return data;

					//No record found for the provided email
				} else {
					console.log(`We have no record of this email in our database.`);
				}
			})

			//Error in retrieving the user by email
			.catch((error: APIError): void => {
				console.log(error.message);
			});
	};

	return (
		<SafeAreaView style={[StyleClasses.loginContainer, { justifyContent: "center", flex: 1 }]}>
			{isModalVisible && (
				<AppModal
					modalVisible={isModalVisible}
					visibleHandler={(): void => setIsModalVisible(!isModalVisible)}
					message={modalText}
					acceptText={"Okay"}
					acceptHandler={(): void => {
						if (validSubmission) {
							setIsModalVisible(true);
						} else {
							setIsModalVisible(false);
						}
					}}
					closeHandler={(): void => setIsModalVisible(false)}
					rejectText="Cancel"
					rejectHandler={(): void => setIsModalVisible(false)}
				/>
			)}


			<Text style={[StyleClasses.headingOne, { textAlign: "left", textTransform: "uppercase", fontWeight: 700 }]}>Request New Password</Text>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				autoComplete={"email"}
				value={userEmail}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => emailChangeHandler(text)}
				onPressIn={(): void => setUserEmail("")}
				autoCapitalize="none"
			/>

			<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", columnGap: 10 }}>
				<Pressable
					onPress={(e: GestureResponderEvent): void => {
						router.navigate("/");
					}}
				>
					<Text>Back to Login</Text>
				</Pressable>

				<Pressable
					onPress={(e: GestureResponderEvent): void => {
						router.navigate("/register");
					}}
				>
					<Text>Create New Account</Text>
				</Pressable>
			</View>

			<PrimaryButton
				text="Submit"
				method={() => {
					submitHandler();
				}}
				style={{ paddingTop: 10, paddingBottom: 10 }}
			/>
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


