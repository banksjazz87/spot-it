import UserClass from "@/constants/modules/UserClass";
import { NewUserInterface, ApiMessage, ApiErrorResponse, ApiDataResponse } from "@/constants/interfaces";
import API from "@/constants/modules/ApiClass";

export default class NewUser {
	userObj: NewUserInterface;

	constructor(userObj: NewUserInterface) {
		this.userObj = userObj;
	}

	validEmail(): boolean {
		const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const currentValue: string = this.userObj.email;

		return emailRegex.test(currentValue);
	}

	noDefaultValues(): boolean {
		let valid = true;
		const defaultValues: NewUserInterface = {
			email: "Email",
			userName: "Username",
			password: "Password",
			verifyPassword: "Verify Password",
		};
		const userEntries = Object.entries(this.userObj);
		const defaultEntries = Object.entries(defaultValues);

		for (let i = 0; i < userEntries.length; i++) {
			if (userEntries[i] === defaultEntries[i]) {
				valid = false;
			}
		}

		return valid;
	}

	noEmptyFields(): boolean {
		let valid = true;
		const values = Object.values(this.userObj);

		for (let i = 0; i < values.length; i++) {
			if (values[i].length === 0) {
				valid = false;
			}
		}
		return valid;
	}

	passwordVerified(): boolean {
		const password = this.userObj.password;
		const verifiedPasword = this.userObj.verifyPassword;
		return password === verifiedPasword;
	}

	formVerified(...args: boolean[]){
		let verified = true;

		for (let i = 0; i < args.length; i++) {
			if (!args[i]) {
				verified = false;
			}
		}
		return verified;
	};

	async userEmailExists(): Promise<boolean | void> {
		const User = new UserClass(this.userObj.email);
		try {
			const userData = await User.getUserByEmail();

			if (userData.data.length > 0) {
				return true;
			} else {
				return false
			}
		} catch (e: any) {
			console.log('error ', e)
			return e;
		}
	}

	//Get the user by username
	async getUserByUsername(): Promise<ApiDataResponse> {
		const api = new API('/username/');
		const url = api.getUrl();
		const fullUrl = `${url}/${this.userObj.userName}`;

		try {
			const userData = await fetch(fullUrl);
			const jsonData = userData.json();

			return jsonData;

		} catch (e: any) {
			return e;
		}
	}


	async userNameExists(): Promise<boolean | null>{
		try {
			const userData = await this.getUserByUsername();
			if (userData.data.length > 0) {
				return true;
			} else {
				return false;
			}
		} catch (e: any) {
			console.log('The following error occured in getting checking if the user name exists ', e);
			return null;
		}
	}

	//Create the user
	async createUser(): Promise<string> {

		const checkForUserName = await this.userNameExists();
		const checkForEmail = await this.userEmailExists();
		
		if (checkForUserName && checkForEmail) {
			return "this username and email already exist";

		} else if (checkForEmail) {
			return 'this email is already in use';

		} else if (checkForUserName) {
			return 'this ';
			
		} else {
			return 'user can be entered';
		}
	}




	isValid(): boolean {
		if (this.formVerified(this.noDefaultValues(), this.noEmptyFields(), this.passwordVerified())) {
            return true;
		} else {
            return false;
		}
	}
}
