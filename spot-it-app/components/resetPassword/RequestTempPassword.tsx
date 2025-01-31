import { View, Text, Pressable, TextInput, GestureResponderEvent } from "react-native";
import { useEffect, useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import { router } from "expo-router";
import API from "@/constants/modules/ApiClass";
import { APIResponse, EmailData, SQLResponse, APIError } from "@/constants/interfaces";
import PrimaryButton from "../global/PrimaryButton";


interface RequestTempPassword {
	startLoadingHandler: Function;
	stopLoadingHandler: Function;
	modalMessageHandler: Function;
    delayedModalMessage: Function;
    setIsValid: Function;
	updateUserDetails: Function;
	updatePageTitle: Function;
}


export default function RequestTempPassword({ startLoadingHandler, stopLoadingHandler, modalMessageHandler, delayedModalMessage, setIsValid, updateUserDetails, updatePageTitle }: RequestTempPassword): JSX.Element {
	const [userEmail, setUserEmail] = useState<string>("Email");

	const emailChangeHandler = (text: string): void => {
		setUserEmail(text);
	};

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
		startLoadingHandler();

		// Get the current user
		getUserDetails(userEmail)
			.then((data: undefined | APIResponse<EmailData>): void => {
				//Check the user's email data
				if (typeof data?.data !== "undefined" && data?.status === 200) {
					//User data
					const neededData = data.data as EmailData;
					updateUserDetails(data.data);

					//Create new password
					generateNewPassword(neededData)
						.then((final: APIResponse<SQLResponse[]> | undefined): void => {
							//Verify that the new password has been sent
							if (typeof final !== "undefined" && final.status === 200) {
								setIsValid();
								modalMessageHandler(
									`Your password has been reset! Check your email for the new password and click okay below submit your temporary password and reset your password. \n\nDidn’t see the email? Check your spam folder. Need help? Contact support.`
								);
								updatePageTitle('Validate Temporary');

								//Failed in reaching out to the API
							} else if (typeof final === "undefined") {
								modalMessageHandler("Unable to create a new password");
								return final;
								//Returned no results
							} else {
								modalMessageHandler(`The following error occurred in sending the reset email to ${neededData.email}, ${final.message}`);

								console.log(`The following error occurred in sending the reset email to ${neededData.email}, ${final.message}.`);
							}
						})
						.catch((error: APIError): void => {
							modalMessageHandler(error.message);
							console.log(error.message);
						})
						.finally((): void => {
							stopLoadingHandler(false);
						});

					//No record found for the provided email
				} else if (typeof data?.data === "undefined" && data?.status === 200) {
					stopLoadingHandler();
					delayedModalMessage("The entered email doesn't exist in the database.");
				} else {
					stopLoadingHandler();
					delayedModalMessage(`The following error occurred in retrieving the user with the provided email, ${data?.message}`);
				}
			})
			.catch((error: APIError): void => {
				stopLoadingHandler();
				delayedModalMessage(`The following error occurred in retrieving the user with the provided email, ${error?.message}`);
			});
	};

	return (
		<>
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
						router.navigate("/register-reset/reset-password");
					}}
				>
					<Text>Create New Account</Text>
				</Pressable>
			</View>

			<PrimaryButton
				text="Submit"
				method={() => submitHandler()}
				style={{ paddingTop: 10, paddingBottom: 10 }}
			/>
		</>
	);
}


