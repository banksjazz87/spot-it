import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../interfaces";

/**
 * @description a class used to get or modify the current system user.
 */
export default class UserClass {
	async getSystemUser(): Promise<User | null> {
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

	async setSystemUser(userValue: User): Promise<void> {
		try {
			const jsonValue = JSON.stringify(userValue);
			await AsyncStorage.setItem('userInfo', jsonValue);
		} catch (e: any) {
			console.log('Error in setting storage ', e);
		}
	}
}
