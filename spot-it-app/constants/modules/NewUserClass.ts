import UserClass from "@/constants/modules/UserClass";
import { NewUserInterface } from "@/constants/interfaces";

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

	formVerified = (...args: Boolean[]) => {
		let verified = true;

		for (let i = 0; i < args.length; i++) {
			if (!args[i]) {
				verified = false;
			}
		}
		return verified;
	};

	formIsValid(): boolean {
		if (this.formVerified(this.noDefaultValues(), this.noEmptyFields(), this.passwordVerified())) {
            return true;
		} else {
            return false;
		}
	}
}
