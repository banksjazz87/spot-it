import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import SystemUser from "../../constants/modules/SystemUserClass";
import API from "../../constants/modules/ApiClass";
import UserClass from "../../constants/modules/UserClass";
import { User, LoginResponse, FullUser, ApiMessage, ApiErrorResponse } from "../../constants/interfaces";
import { router } from "expo-router";

interface LogoutProps {
	logoutMethod?: Function;
}

export default function Logout({ logoutMethod }: LogoutProps): React.JSX.Element {
	const SysUser = new SystemUser();

	//Gets the users email address from the async storage
	const getUserEmail = async (): Promise<any> => {
		try {
			const userInfo: User | null = await SysUser.get();
			return userInfo ? userInfo.email : "";
		} catch (e: unknown) {
			return e;
		}
	};

	//Retrieves the user's information by email.
	const getUser = async (email: string): Promise<any> => {
		const api = new API("/get-user-by-email/");
		const url = api.getUrl();
		const fullUrl = `${url}/${email}`;

		try {
			const getUser = await fetch(fullUrl);
			const userJSON = getUser.json();
			return userJSON;
		} catch (e: unknown) {
			return e;
		}
	};

	//Logouts the user from the database
	const logoutUser = async (data: FullUser): Promise<any> => {
		const api = new API("/logout-user/", data);

		try {
			const logout = await api.putData();
			return logout;
		} catch (e: unknown) {
			return e;
		}
	};

	//Clears the user from the session storage.
	const clearSysUser = (): void => {
		SysUser.clear()
			.then(() => {
				console.log("user cleared");
				router.navigate("/");
			})
			.catch((e) => console.log("Error in removing the sys user ", e));
	};

	/**
	 * @param obj FullUser takes an object of type FullUser
	 * @returns void
	 * @description used to fire off both the logout and clearSysUser functions.
	 */
	const logoutAndClearUser = (obj: FullUser): void => {
		logoutUser(obj)
			.then((data: ApiMessage): void => {
				clearSysUser();
			})
			.catch((e: ApiErrorResponse): void => {
				console.warn("Error in logging out the user ", e);
			});
	};

	//Used to logout the current user.
	const logoutHandler = (): void => {
		getUserEmail()
			.then((data: string | null): void => {
				if (data && data.length > 0) {
					getUser(data)
						.then((data: LoginResponse): void => {
							if (data.status === 200) {
								logoutAndClearUser(data.data);
							}
						})
						.catch((err: any): void => {
							console.warn("ERRROR ", err);
						});
				}
			})
			.catch((err: any): void => {
				console.warn("Error getting the email ", err);
			});
	};
	return (
		<Pressable onPress={(event: GestureResponderEvent): void | string => {
			if (logoutMethod) {
				logoutHandler();
				logoutMethod();
			} else {
				logoutHandler();
			}
		}}>
			<Text>Logout</Text>
		</Pressable>
	);
}
