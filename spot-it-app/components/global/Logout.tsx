import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import SystemUser from "../../constants/modules/SystemUserClass";
import API from "../../constants/modules/ApiClass";
import UserClass from "../../constants/modules/UserClass";
import { User, LoginResponse, FullUser, ApiMessage, ApiErrorResponse } from "../../constants/interfaces";
import { router } from "expo-router";

export default function Logout() {

    const SysUser = new SystemUser();

	const getUserEmail = async(): Promise<any> => {
        try {
            const userInfo: User | null = await SysUser.get();
            return userInfo ? userInfo.email : '';
        } catch (e: unknown) {
            return e;
        }
    }
    
    const getUser = async (email: string): Promise<any> => {
        const api = new API('/get-user-by-email/');
        const url = api.getUrl();
        const fullUrl = `${url}/${email}`;

        try {
            const getUser = await fetch(fullUrl);
            const userJSON = getUser.json();
            return userJSON;
        } catch (e: unknown) {
            return e;
        }
        
    }
    
    const logoutUser = async (data: FullUser): Promise<any> => {
        const api = new API("/logout-user/", data);
        
        try {
            const logout = await api.putData();
            return logout;
        } catch (e: unknown) {
            return e;
        }
    }

	const logoutHandler = (): void => {
        getUserEmail()
            .then((data: string | null): void => {
                if (data && data.length > 0) {
                    console.log(data);
                    getUser(data)
                        .then((data: LoginResponse): void => {

                            if (data.data.length > 0) {
                                logoutUser(data.data[0])
                                    .then((data: ApiMessage): void => {
                                        console.log('Success ', data);
                                        SysUser.clear()
                                            .then(() => {
                                                console.log('user cleared')
                                                router.navigate('/');
                                            })
                                            .catch((e) => console.log("Error in removing the sys user ", e));
                                    })
                                    .catch((e: ApiErrorResponse): void => {
                                        console.log('Error in logging out the user ', e);
                                })
                            }
                        })
                        .catch((err: any): void => {
                            console.log("ERRROR ", err);
                        });
                }
            })
            .catch((err: any): void => {
                console.log('Error getting the email ', err);
            });
	};
	return (
		<Pressable onPress={(event: GestureResponderEvent): void | string => logoutHandler()}>
			<Text>Logout</Text>
		</Pressable>
	);
}
