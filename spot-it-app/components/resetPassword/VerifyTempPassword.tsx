import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import PrimaryButton from "../global/PrimaryButton";
import API from "@/constants/modules/ApiClass";
import { APIResponse, FullUser } from "@/constants/interfaces";

interface VerifyTempPasswordProps {
	userEmail: string;
}

export default function VerifyTempPassword({ userEmail }: VerifyTempPasswordProps): JSX.Element {
	const [tempPassword, setTempPassword] = useState<string>("Temporary Password");

	const tempPassWordHandler = (text: string): void => {
		setTempPassword(text);
	};

	const getUserWithTempPassword = async (): Promise<APIResponse<FullUser> | unknown> => {
		const api = new API("/get-user-with-temp-password/");
		const url = api.getUrl();
		const fullUrl = `${url}/${userEmail}/${tempPassword}`;

		try {
			const getUser: Response = await fetch(fullUrl);
			const userJSON: APIResponse<FullUser> = await getUser.json();

			return userJSON;
		} catch (e: unknown) {
			return e;
		}
	};

	const submitHandler = (): void => {
		getUserWithTempPassword()
			.then((data: APIResponse<FullUser> | unknown): void => {
				console.log(data);
			})
			.catch((error: any): void => {
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
				method={() => {
					submitHandler();
				}}
				style={{ paddingTop: 10, paddingBottom: 10 }}
			/>
		</>
	);
}
