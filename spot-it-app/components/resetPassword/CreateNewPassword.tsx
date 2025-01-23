import { View, Text, Pressable, StyleSheet, TextInput, GestureResponderEvent } from "react-native";
import { useEffect, useState } from "react";
import PrimaryButton from "../global/PrimaryButton";
import { StyleClasses } from "@/constants/lib/StyleClasses";

export default function CreateNewPassword(): JSX.Element {

    const [newPassword, setNewPassword] = useState<string>('New Password');
    const [validatePassword, setValidatePassword] = useState<string>('Re-enter the password');
    const [isMatching, setIsMatching] = useState<boolean>(false);

    useEffect((): void => {
        if (newPassword === validatePassword) {
            setIsMatching(true);
        } else {
            setIsMatching(false);
        }
    }, [newPassword, validatePassword]);

	const submitHandler = (): void => console.log("submitted");
	return (
		<>
			<Text style={[StyleClasses.headingOne, { textAlign: "left", textTransform: "uppercase", fontWeight: 700 }]}>Create A New Password</Text>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				value={newPassword}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => setNewPassword(text.trim())}
				onPressIn={(): void => setNewPassword("")}
				autoCapitalize="none"
			/>

			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				value={validatePassword}
				style={StyleClasses.textInput}
				onChangeText={(text: string): void => setValidatePassword(text.trim())}
				onPressIn={(): void => setValidatePassword("")}
				autoCapitalize="none"
			/>

			<PrimaryButton
				text="Submit"
				method={() => submitHandler()}
				style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: isMatching ? 'blue' : 'black' }}
			/>
		</>
	);
}
