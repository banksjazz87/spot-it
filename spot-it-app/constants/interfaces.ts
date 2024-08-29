export type ImageProperties = {
	key: string;
	url: any;
	description: string;
};

export type User = {
	username: string;
	email: string;
	loggedIn: boolean;
	password?: string;
}