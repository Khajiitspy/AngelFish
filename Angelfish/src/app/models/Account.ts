export interface RegisterUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	imageFile?: File | null;
}

export interface RegisterResponse {
  status: number;
  isValid: boolean;
  message: string;
  userToken: string;
}

export interface User {
	name: string;
	email: string;
	image?: File | null;
}
