import { View, Text, Pressable } from "react-native";
import UserClass from "../../constants/modules/UserClass";
import API from "../../constants/modules/ApiClass";

export default function Logout() {
    
    const logoutHandler = (): void => {
        const Api = new API('/logout-user/');
        
    }
    return (
        <Pressable>
            <Text>Logout</Text>
        </Pressable>
    )
}