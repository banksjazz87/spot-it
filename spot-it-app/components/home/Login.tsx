import {useState} from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import  PrimaryButton from "../global/PrimaryButton"


interface UserLogin {
    email: string;
    password: string;
}

export default function Login() {

    const [loginUser, setLoginUser] = useState<UserLogin>({
        email: "Email",
        password: "Password"
    });

    
    return (
        <View style={styles.loginContainer}>
            <TextInput
                editable
                numberOfLines={1}
                maxLength={40}
                autoComplete={"email"}
                value={"Email"} 
                style={styles.input}
            />
            <TextInput
                editable
                numberOfLines={1}
                maxLength={40}
                autoComplete={"password"}
                value={"Password"}
                style={styles.input}
            />
            <PrimaryButton
                text="Log In"
                method={() => console.log('Clicked')}
                style={{paddingTop: 10, paddingBottom: 10}}
            />

        </View>
    )
}

const styles = StyleSheet.create({
	loginContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 10,
		padding: 20,
		width: 400,
	},
	input: {
		padding: 5,
		borderColor: "black",
		borderWidth: 1,
		borderStyle: "solid",
		fontSize: 18,
		fontFamily: "Red Hat Display",
	},
});