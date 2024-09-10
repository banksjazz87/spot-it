import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import SystemUser from "../../constants/modules/SystemUserClass";
import API from "../../constants/modules/ApiClass";
import UserClass from "../../constants/modules/UserClass";
import { User } from "../../constants/interfaces";

export default function Logout() {
	const getUserEmail = async(): Promise<any> => {
        const currentUser = new SystemUser();
        try {
            const userInfo: User | null = await currentUser.get();
            return userInfo ? userInfo.email : '';
        } catch (e: unknown) {
            return e;
        }
    }
    
    const getUser = async (email: string): Promise<any> => {
        const api = new API('/get-user-by-email');
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
	const logoutHandler = (): void => {
        getUserEmail()
            .then((data: string | null): void => {
                if (data && data.length > 0) {
                    console.log(data);
                    getUser(data)
                        .then((data: any): void => {
                            console.log(data);
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
