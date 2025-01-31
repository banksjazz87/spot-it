import { View, Text, Pressable, TextInput, GestureResponderEvent } from "react-native";
import { useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import PrimaryButton from "../global/PrimaryButton";
import API from "@/constants/modules/ApiClass";
import { APIResponse, FullUser } from "@/constants/interfaces";
import { start } from "repl";
import { GestureDetectorBridge } from "react-native-screens";
import { UserId } from "@/constants/interfaces";

interface VerifyTempPasswordProps {
	user: UserId;
	startLoadingHandler: Function;
	stopLoadingHandler: Function;
	modalMessageHandler: Function;
	delayedModalMessage: Function;
	validTempHandler: Function;
	resetForm: Function;
	updatePageTitle: Function;
}

export default function VerifyTempPassword({ user, startLoadingHandler, stopLoadingHandler, modalMessageHandler, delayedModalMessage, validTempHandler, resetForm, updatePageTitle }: VerifyTempPasswordProps): JSX.Element {
	const [tempPassword, setTempPassword] = useState<string>("Temporary Password");

	const tempPassWordHandler = (text: string): void => {
		setTempPassword(text);
	};

	const getUserWithTempPassword = async (): Promise<APIResponse<FullUser> | null> => {
		const api = new API("/get-user-with-temp-password/");
		const url = api.getUrl();
		const fullUrl = `${url}/${user.id}/${tempPassword}`;

		try {
			const getUser: Response = await fetch(fullUrl);
			const userJSON: APIResponse<FullUser> = await getUser.json();
			return userJSON;
        } catch (e: unknown) {
            console.log('The following error occurred in validating the temp password ', e);
			return null;
		}
	};

    const submitHandler = (): void => {
        startLoadingHandler();
        let modalMessage = '';
        let tempIsValid = false;

        getUserWithTempPassword()
            .then((data: APIResponse<FullUser> | null): void => {
                if (data?.status === 200) {
                    modalMessage = "Thanks for validating the temporary password, please take a moment to update your password."
					tempIsValid = true;
					updatePageTitle('Create New Password');
                } else {
                    modalMessage = "Oh no, that was the incorrect temporary password.  Please try again, or request a new one."
                } 
            })
            .catch((error: any): void => {
                modalMessage = `The following error occurred in validating the temp password: ${error}`;
            })
            .finally((): void => {
                stopLoadingHandler();
                delayedModalMessage(modalMessage);
                validTempHandler(tempIsValid);
            });
	};

	return (
		<>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				value={tempPassword}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => tempPassWordHandler(text.trim())}
				onPressIn={(): void => setTempPassword("")}
				autoCapitalize="none"
			/>

			<Text>Please fill in the space above with the temporary password that was sent to your email.</Text>

			<Pressable onPress={(event: GestureResponderEvent): void => resetForm()}>
				<Text>Request a new Temporary Password</Text>
			</Pressable>

			<PrimaryButton
				text="Submit"
				method={() => submitHandler()}
				style={{ paddingTop: 10, paddingBottom: 10 }}
			/>
		</>
	);
}
