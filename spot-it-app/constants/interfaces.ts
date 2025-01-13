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

export interface UserLogin {
	email: string;
	password: string;
}

export interface UserId {
	id: number;
	username: string;
	email: string;
	loggedIn: boolean;
}

export interface FullUser {
	email: string;
	id: number;
	lastLoggedIn: string;
	lastSeen: string;
	loggedIn: number;
	password: string;
	tempPassword: string;
	username: string;
}

export interface ApiMessage {
	data: object[];
	message: string;
	status: number;
}

export interface APIError {
	status: number;
	message: string;
}

export interface APIResponse<T> {
	status: number, 
	message: string,
	data?: T
}

export interface SQLResponse {
	fieldCount: number,
	affectedRows: number,
	insertId: number,
	serverStatus: number,
	warningCount: number,
	message: string,
	protocol41: boolean,
	changedRows: number
}


export interface EmailData {
	id: number;
	email: string;
	username: string;
	password: string;
	loggedIn: 0 | 1;
	lastLoggedIn: string;
	lastSeen: string;
	tempPassword: string;
}

export interface ApiDataResponse extends ApiMessage {
	data: object[];
	message: string;
	status: number;
	valid: boolean;
}

export interface LoginResponse extends ApiDataResponse {
	data: FullUser[];
}

export interface ApiErrorResponse {
	status: number;
	message: string;
}

export interface LoginProps {
	loginUpdater: Function;
	user: User;
	targetUrl: string;
}

export interface NewUserInterface {
	email: string;
	username: string;
	password: string;
	verifyPassword: string;
}