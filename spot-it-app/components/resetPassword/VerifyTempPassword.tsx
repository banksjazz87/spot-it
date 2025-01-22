import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import PrimaryButton from "../global/PrimaryButton";
import API from "@/constants/modules/ApiClass";
import { APIResponse, FullUser } from "@/constants/interfaces";

interface VerifyTempPasswordProps {
	userEmail: string;
	loadingHandler: Function;
	modalMessageHandler: Function;
	delayedModalMessage: Function;
	validTempHandler: Function;
}

export default function VerifyTempPassword({ userEmail, loadingHandler, modalMessageHandler, delayedModalMessage, validTempHandler }: VerifyTempPasswordProps): JSX.Element {
	const [tempPassword, setTempPassword] = useState<string>("Temporary Password");

	const tempPassWordHandler = (text: string): void => {
		setTempPassword(text);
	};

	const getUserWithTempPassword = async (): Promise<APIResponse<FullUser> | null> => {
		const api = new API("/get-user-with-temp-password/");
		const url = api.getUrl();
		const fullUrl = `${url}/${userEmail}/${tempPassword}`;

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
        loadingHandler();

		getUserWithTempPassword()
            .then((data: APIResponse<FullUser> | null): void => {
                loadingHandler();

                if (data) {
                    if (data.status === 200) {
                        modalMessageHandler('The temp password has been confirmed.  Please update your password before continuing.')
                    } else {
                        modalMessageHandler('The following error occurred in validating the temp password ', data.message);
                    }
                } else {
                    modalMessageHandler('An error occurred in accessing the API.');
                }
                
			})
            .catch((error: any): void => {
                loadingHandler();
                delayedModalMessage('The following error occurred in validating the temp password ', error);
				console.log("The following error occurred in getting the user with a temp password ", error);
			});
	};

	return (
		<>
			<Text style={[StyleClasses.headingOne, { textAlign: "left", textTransform: "uppercase", fontWeight: 700 }]}>Temporary Password</Text>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				value={tempPassword}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => tempPassWordHandler(text)}
				onPressIn={(): void => setTempPassword("")}
				autoCapitalize="none"
			/>
			<Text>Please fill in the space above with the temporary password that was sent to your email.</Text>

			<PrimaryButton
				text="Submit"
				method={() => submitHandler()}
				style={{ paddingTop: 10, paddingBottom: 10 }}
			/>
		</>
	);
}
