import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../interfaces";

/**
 * @description a class used to get or modify the current system user.
 */
export default class UserClass {
	async get(): Promise<User | null> {
		try {
			const jsonValue = await AsyncStorage.getItem("userInfo");

			if (jsonValue) {
				const parsed: User = JSON.parse(jsonValue);
				return parsed;
			} else {
				return null;
			}
		} catch (e) {
			console.log("Error in getting async storage ", e);
			return null;
		}
	}

	async set(userValue: User): Promise<void> {
		try {
			const jsonValue = JSON.stringify(userValue);
			await AsyncStorage.setItem('userInfo', jsonValue);
		} catch (e: any) {
			console.log('Error in setting storage ', e);
		}
	}

	async clear(): Promise<void> {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			console.log('Error in clearing the system user ', e);
		}
		console.log('System user cleared');
	}
}
