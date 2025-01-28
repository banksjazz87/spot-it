import { Stack, router } from 'expo-router';
import { Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Layout() {
    return (
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "black",
					},
					headerBackButtonMenuEnabled: true,
					headerShadowVisible: true,
					headerTitleAlign: "center",
					headerLargeTitle: true,
					headerTintColor: "white",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerRight: () => (
                        <Pressable
                            onPress={() => router.navigate("/")}
                            style={{
                                display: 'flex',
                                flex: 1,
                                alignItems: 'flex-end',
                                paddingRight: 40,
                                bottom: 0
                            }}
                        >
                            <Ionicons
                                name="log-in-outline"
                                size={36}
                                color="white"
                            />
						</Pressable>
					),
				}}
			>
				<Stack.Screen
					name="reset-password"
					options={{
						title: "Reset Password",
					}}
				/>
				<Stack.Screen
					name="register"
					options={{
						title: "New Account",
					}}
				/>
			</Stack>
		);
}