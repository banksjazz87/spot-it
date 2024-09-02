import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
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

interface ApiResponse {
	data: object[];
	message: string;
	status: number;
	valid: boolean;
}

interface LoginResponse extends ApiResponse {
    data: FullUser[];
}


export default function Login() {
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
        const url = api.getUrl();
        
        try {
            const loginUser = await api.putData();
            console.log(loginUser);
            return loginUser;
        } catch (e: any) {
            console.log(e);
        }
    }


	const submitHandler = (): void => {
		getUser()
            .then((data: LoginResponse) => {
                const userId = {
                    id: data.data[0].id,
                    username: data.data[0].username
                }
                login(userId)
                    .then((data) => {
                        console.log("Success ", data)
                    })
                    .catch((err: any) => {
                        console.log('FAILURE ', err.message);
                    });
			})
			.catch((err: any) => {
				console.log("error", err);
        	});
        
        // const api = new API("/get-valid-user/");
        // const url = api.getUrl();
        // const fullUrl = `${url}/${loginUser.email}/${loginUser.password}`;

        // console.log(fullUrl);
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
				method={submitHandler}
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
