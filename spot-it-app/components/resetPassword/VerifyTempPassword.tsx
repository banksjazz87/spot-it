import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import PrimaryButton from "../global/PrimaryButton";
import API from "@/constants/modules/ApiClass";
import { APIResponse, FullUser } from "@/constants/interfaces";
import { start } from "repl";

interface VerifyTempPasswordProps {
	userEmail: string;
    startLoadingHandler: Function;
    stopLoadingHandler: Function;
	modalMessageHandler: Function;
	delayedModalMessage: Function;
	validTempHandler: Function;
}

export default function VerifyTempPassword({ userEmail, startLoadingHandler, stopLoadingHandler, modalMessageHandler, delayedModalMessage, validTempHandler }: VerifyTempPasswordProps): JSX.Element {
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
        startLoadingHandler();
        let modalMessage = '';

        getUserWithTempPassword()
            .then((data: APIResponse<FullUser> | null): void => {
                if (data) {
                    if (data.status === 200) {
                        modalMessage = `${data.message}`;
                    } else {
                        modalMessage = `${data.message}`;
                    }
                } else {
                    modalMessage = "An error occurred in accessing the API.";
                } 
            })
            .catch((error: any): void => {
                modalMessage = `The following error occurred in validating the temp password: ${error}`;
            })
            .finally((): void => {
                stopLoadingHandler();
                delayedModalMessage(modalMessage);
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
				onChangeText={(text: string): void => tempPassWordHandler(text.trim())}
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
