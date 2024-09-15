import { View, Text, StyleSheet, TextInput, Pressable, GestureResponderEvent } from "react-native";
import { useState } from "react";
import { StyleClasses } from "@/constants/lib/StyleClasses";
import { router } from "expo-router";
import PrimaryButton from "@/components/global/PrimaryButton"; 
import { NewUserInterface } from "@/constants/interfaces";
import NewUserClass from "@/constants/modules/NewUserclass";


export default function Register() {
	const [newUser, setNewUser] = useState<NewUserInterface>({
		email: "Email",
		userName: "Username",
		password: "Password",
		verifyPassword: "Verify Password",
	});
	const [hidePassword, setHidePassword] = useState<boolean>(true);
	const [validEmail, setValidEmail] = useState<boolean>(true);

	/**
	 *
	 * @param email string value that is passed in for the email
	 * @returns true if a valid email has been provided.
	 */
	const emailChecker = (email: string): boolean => {
        const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const currentValue: string = email;

        return emailRegex.test(currentValue);
    };

    const checkForDefaultValues = (obj: NewUserInterface): boolean => {
			let valid = true;
			const defaultValues: NewUserInterface = {
				email: "Email",
				userName: "Username",
				password: "Password",
				verifyPassword: "Verify Password",
			};
			const userEntries = Object.entries(obj);
			const defaultEntries = Object.entries(defaultValues);

			for (let i = 0; i < userEntries.length; i++) {
				if (userEntries[i] === defaultEntries[i]) {
					valid = false;
				}
			}

			return valid;
		};

    const checkForEmpties = (obj: NewUserInterface): boolean => {
			let valid = true;
			const values = Object.values(obj);

			for (let i = 0; i < values.length; i++) {
				if (values[i].length === 0) {
					valid = false;
				}
			}
			return valid;
		};

    const passwordVerified = (password: string, verifiedPasword: string): boolean => {
        return password === verifiedPasword;
    }

    const formVerified = (...args: Boolean[]) => {
        let verified = true;

        for (let i = 0; i < args.length; i++) {
            if (!args[i]) {
                verified = false;
            }
        }

        return verified;
    }
    
    const registerHandler = (): void => {

        const NewUser = new NewUserClass(newUser);

        if (NewUser.formVerified()) {
            console.log('Valid registration');
        } else {
            console.log('Invalid registration');
        }
    }

	return (
		<View style={styles.wrapper}>
			<View style={styles.innerContainer}>
				<Text>Create an account</Text>
				<TextInput
					editable
					textContentType="emailAddress"
					inputMode="email"
					numberOfLines={1}
					maxLength={40}
					value={newUser.email}
					onChangeText={(text) => setNewUser({ ...newUser, email: text.trim() })}
					onEndEditing={(e): void => emailChecker(newUser.email) ? setValidEmail(true): setValidEmail(false)}
					autoCapitalize="none"
					style={[validEmail ? StyleClasses.textInput : StyleClasses.invalidInput]}
				/>
				<TextInput
					editable
					textContentType="username"
					inputMode="text"
					numberOfLines={1}
					maxLength={40}
					value={newUser.userName}
					onChangeText={(text) => setNewUser({ ...newUser, userName: text.trim() })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
				/>
				<TextInput
					editable
					textContentType="password"
					inputMode="text"
					secureTextEntry={hidePassword}
					numberOfLines={1}
					maxLength={40}
					value={newUser.password}
					onChangeText={(text) => setNewUser({ ...newUser, password: text.trim() })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
				/>
				<TextInput
					editable
					numberOfLines={1}
					textContentType="password"
					inputMode="text"
					secureTextEntry={hidePassword}
					maxLength={40}
					value={newUser.verifyPassword}
                    onChangeText={(text) => setNewUser({ ...newUser, verifyPassword: text.trim() })}
					autoCapitalize="none"
					style={[StyleClasses.textInput]}
				/>
                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
					<Pressable onPress={(e: GestureResponderEvent): void => router.navigate("/")}>
						<Text>Return to Login</Text>
					</Pressable>

					<Pressable onPress={(e: GestureResponderEvent): void => setHidePassword(!hidePassword)}>
						<Text>{hidePassword ? "Show Password" : "Hide Password"}</Text>
					</Pressable>
                </View>
                
                <PrimaryButton 
                    text="Register"
                    method={(): void => registerHandler()}
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 15,
		padding: 20,
		width: 400,
    },
});
