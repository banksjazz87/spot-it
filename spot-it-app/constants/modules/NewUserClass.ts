import UserClass from "@/constants/modules/UserClass";
import { NewUserInterface } from "@/constants/interfaces";

export default class NewUser {
	userObj: NewUserInterface;

	constructor(userObj: NewUserInterface) {
		this.userObj = userObj;
	}

	emailChecker(): boolean {
		const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const currentValue: string = this.userObj.email;

		return emailRegex.test(currentValue);
	}

	checkForDefaultValues(): boolean {
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

	checkForEmpties(): boolean {
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

	passedAllChecks(): boolean {
		if (this.formVerified(this.checkForDefaultValues(), this.checkForEmpties(), this.passwordVerified())) {
            return true;
		} else {
            return false;
		}
	}
}
