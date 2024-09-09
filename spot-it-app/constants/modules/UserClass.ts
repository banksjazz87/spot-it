import SystemUser from "../modules/SystemUserClass";
import API from "../modules/ApiClass";

export default class UserClass extends SystemUser {
    email: string;
    id: number;
    password: string;


    constructor(email: string, id: number = 0, password: string = '') {
        super();
        this.email = email;
        this.id = id;
        this.password = password;
    }


    async getUserByEmail() {
        const api = new API("/get-user-by-email/");
            const url = api.getUrl();
            const fullUrl = `${url}/${this.email}`;

            try {
                const getUser = await fetch(fullUrl);
                const userJSON = getUser.json();

                return userJSON;
            } catch (e: unknown) {
                return e;
            }
    }
}