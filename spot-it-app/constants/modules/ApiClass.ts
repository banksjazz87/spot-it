/**
 * This is going to handle the different requests that can be made.
 */

export default class API {
	path: string;
	url: any;
    apiKey: any;
    data?: Object;

    constructor(path: string, objData = {}) {
		this.path = path;
		this.url = process.env.EXPO_PUBLIC_API_URL;
        this.apiKey = process.env.EXPO_PUBLIC_API_KEY;
        this.data = objData;
	}

	getUrl(): string {
		const fullUrl = (((this.url + this.path) as string) + this.apiKey) as string;

		return fullUrl;
	}

	async deleteData(): Promise<any> {
		const url = this.getUrl();
		const response: any = await fetch(url, {
			method: "DELETE",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
		});

		return response.json();
	}

	async postData(): Promise<any> {
		const url = this.getUrl();
		const response: any = await fetch(url, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(this.data)
		});

		return response.json();
    }
    
    async putData(): Promise<any> {
        const url = this.getUrl();
        const response: any = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(this.data)
        });

        return response.json();
    }
}