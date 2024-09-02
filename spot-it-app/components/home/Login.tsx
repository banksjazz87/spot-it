import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import PrimaryButton from "../global/PrimaryButton";
import API from "../../constants/modules/ApiClass";

interface UserLogin {
	email: string;
	password: string;
}

interface UserId {
    id: number;
    username: string;
}

interface FullUser {
    email: string;
    id: number;
    lastLoggedIn: string;
    lastSeen: string;
    loggedIn: number;
    password: string;
    tempPassword: string;
    username: string;
}

interface ApiMessage {
	data: object[];
	message: string;
	status: number;
}
interface ApiDataResponse extends ApiMessage {
	data: object[];
	message: string;
	status: number;
	valid: boolean;
}

interface LoginResponse extends ApiDataResponse {
    data: FullUser[];
}

interface ApiErrorResponse {
    status: number;
    message: string;
}

interface LoginProps {
    loginUpdater: Function;
}


export default function Login({loginUpdater}: LoginProps) {
	const [loginUser, setLoginUser] = useState<UserLogin>({
		email: "Email",
        password: "Password",
	});

	const loginChangeHandler = (text: string, key: string): void => {
		setLoginUser({
			...loginUser,
			[key as keyof UserLogin]: text,
		});
	};

	const getUser = async (): Promise<any> => {
		const api = new API("/get-valid-user/");
		const url = api.getUrl();
		const fullUrl = `${url}/${loginUser.email}/${loginUser.password}`;

		try {
			const getUser = await fetch(fullUrl);
			const userJSON = getUser.json();

			return userJSON;
		} catch (e: unknown) {
			console.log(e);
		}
    };
    
    const login = async (obj: UserId): Promise<any> => {
        const api = new API('/login-user/', obj);
        
        try {
            const loginUser = await api.putData();
            return loginUser;

        } catch (e: any) {
            console.log(e);
        }
    }


	const submitHandler = (): void => {
		getUser()
            .then((data: LoginResponse): void => {
                const userId = {
                    id: data.data[0].id,
                    username: data.data[0].username
                }
                login(userId)
                    .then((data: ApiMessage): void => {
                        console.log("Success ", data)

                        if (data.status === 200) {
                            loginUpdater(userId.username, loginUser.email);
                        } else {
                            Alert.alert('Invalid', 'Invalid user credentials have been provided', [
                                {
                                    text: 'Try Again', 
                                    onPress: (): void => console.log('Retry Password'),
                                }, 
                                {
                                    text: 'Sign Up', 
                                    onPress: (): void => console.log('new user')
                                }
                           ])
                        }
                    })
                    .catch((err: ApiErrorResponse): void => {
                        console.log('FAILURE ', err.message);
                    });
			})
			.catch((err: ApiErrorResponse): void => {
				console.log("error", err);
        	});
	};

	return (
		<View style={styles.loginContainer}>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				autoComplete={"email"}
				value={loginUser.email}
				style={styles.input}
				onChangeText={(text: string) => loginChangeHandler(text, "email")}
				autoCapitalize="none"
			/>
			<TextInput
				editable
				numberOfLines={1}
				maxLength={40}
				autoComplete={"password"}
				value={loginUser.password}
				style={styles.input}
				onChangeText={(text: string) => loginChangeHandler(text, "password")}
				autoCapitalize="none"
			/>

			<View style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
				<Pressable>
					<Text style={styles.rHFont}>Forgot your password?</Text>
				</Pressable>
				<Pressable>
					<Text style={styles.rHFont}>New Here</Text>
				</Pressable>
			</View>

			<PrimaryButton
				text="Log In"
                method={() => {
                    submitHandler();
                    

                }}
				style={{ paddingTop: 10, paddingBottom: 10 }}
			/>
		</View>
	);
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
	rHFont: {
		fontFamily: "Red Hat Display",
	},
});
