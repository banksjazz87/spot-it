import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import SystemUser from "../../constants/modules/SystemUserClass";
import API from "../../constants/modules/ApiClass";
import UserClass from "../../constants/modules/UserClass";
import { User } from "../../constants/interfaces";

export default function Logout() {

    const getUserEmail = (): string | void => {
        const currentUser = new SystemUser();
        currentUser.get()
            .then((data: User | null): string | void => {
                const email = data ? data.email : '';
                console.log(email);
                return email;
            })
            .catch((e): void => {
                console.log('An error occurred in getting the system user ', e);
            })
    }
    
    const logoutHandler = (): void => {
        // const Api = new API('/logout-user/');
        getUserEmail();
        
    }
    return (
        <Pressable onPress={(event: GestureResponderEvent): void | string => getUserEmail()
        }>
            <Text>Logout</Text>
        </Pressable>
    )
}