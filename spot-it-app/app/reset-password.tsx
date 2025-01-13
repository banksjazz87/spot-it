import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, GestureResponderEvent } from "react-native";
import PrimaryButton from "@/components/global/PrimaryButton";
import { router, Stack } from "expo-router";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import API from "@/constants/modules/ApiClass";
import { APIResponse, EmailData, SQLResponse, APIError } from "@/constants/interfaces";

export default function ResetPassword(): JSX.Element {
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
		<View style={[StyleClasses.loginContainer, { justifyContent: "center", flex: 1 }]}>
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
		</View>
	);
}
