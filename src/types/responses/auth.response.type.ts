export interface LoginResponse {
	statusCode: number;
	message: string;
	data: {
		token: string;
		role: string;
	};
}