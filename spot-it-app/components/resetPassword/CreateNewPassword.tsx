import { View, Text, Pressable, StyleSheet, TextInput, GestureResponderEvent } from "react-native";
import { useEffect, useState } from "react";
import PrimaryButton from "../global/PrimaryButton";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import { Colors } from '@/constants/lib/Colors';
import Ionicons from "@expo/vector-icons/Ionicons";
import API from "@/constants/modules/ApiClass";
import { UserId, ApiMessage } from "@/constants/interfaces";


interface CreateNewPasswordProps {
	user: UserId;
    delayedModalMessage: Function;
    startLoadingHandler: Function;
    stopLoadingHandler: Function;
    resetHandler: Function;
}

const newPasswordPlaceholder: string = 'New Password';
const validatePlaceholder: string = 'Re-enter the password';

export default function CreateNewPassword({ user, delayedModalMessage, startLoadingHandler, stopLoadingHandler, resetHandler }: CreateNewPasswordProps): JSX.Element {
    const [newPassword, setNewPassword] = useState<string>(newPasswordPlaceholder);
    const [validatePassword, setValidatePassword] = useState<string>(validatePlaceholder);
    const [isMatching, setIsMatching] = useState<boolean>(false);
    const [hideNewPassword, setHideNewPassword] = useState<boolean>(false);
    const [hideValidatePassword, setHideValidatePassword] = useState<boolean>(false);
    const [hidePasswords, setHidePasswords] = useState<boolean>(true);

    useEffect((): void => {
        if (newPassword === validatePassword) {
            setIsMatching(true);
        } else {
            setIsMatching(false);
        }
    }, [newPassword, validatePassword]);

    const submitHandler = (): void => {
        startLoadingHandler();

        const userFields = {
            id: user.id,
            password: newPassword,
        };
        const api = new API("/update-user/", userFields);

        api.putData().then((data: ApiMessage): void => {
            if (data.status === 200) {
                delayedModalMessage('Thanks for updating your password!  Please log in with your new password to continue.');
                resetHandler();
            } else {
                delayedModalMessage(`Oh no!  The following error has occurred in updating your password: ${data.message} please reach out to our support team at banksjazz87@gmail.com`);
            }
        }).catch((error: any): void => {
            delayedModalMessage(`Oh no!  We're having issues connecting our server at the moment. ${error}`)
            console.log('The following error occurred in accessing the API endpoint to update a user\'s email: ', error);
        }).finally((): void => {
            stopLoadingHandler();
        });
    };
    
	return (
		<>
			<Text style={[StyleClasses.headingOne, { textAlign: "left", textTransform: "uppercase", fontWeight: 700 }]}>Create A New Password</Text>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				secureTextEntry={hideNewPassword}
				value={newPassword}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => setNewPassword(text.trim())}
				onPressIn={(): void => {
					if (newPassword === newPasswordPlaceholder) {
						setNewPassword("");
						setHideNewPassword(true);
					}
				}}
				autoCapitalize="none"
			/>

			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				value={validatePassword}
				secureTextEntry={hideValidatePassword}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => setValidatePassword(text.trim())}
				onPressIn={(): void => {
					if (validatePassword === validatePlaceholder) {
						setValidatePassword("");
						setHideValidatePassword(true);
					}
				}}
				autoCapitalize="none"
			/>

			<View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
				<Pressable
					onPress={(e: GestureResponderEvent): void => {
						setHidePasswords(!hidePasswords);
						setHideValidatePassword(!hideValidatePassword);
						setHideNewPassword(!hideNewPassword);
					}}
				>
					<Ionicons
						name={!hidePasswords ? "eye-off-outline" : "eye-outline"}
						size={24}
						color="black"
					/>
				</Pressable>
			</View>

			<PrimaryButton
				text="Submit"
				method={() => submitHandler()}
				style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: isMatching ? Colors.blue.background : "black" }}
			/>
		</>
	);
}
