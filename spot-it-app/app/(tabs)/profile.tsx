import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import Logout from "../../components/global/Logout";

export default function Profile() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
            <Text>Profile Details</Text>
            <Logout />
        </View>
    )
}