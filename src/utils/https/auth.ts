import { AxiosResponse } from "axios";

import api from "./base";
import { ControllerType } from "../../types/controller.type";
import { LoginResponse } from "../../types/responses/auth.response.type";

export const login = (
	email: string,
	password: string,
	controller: ControllerType
): Promise<AxiosResponse<LoginResponse>> => {
	const body = { email, password };
	const config = { signal: controller.signal };
	return api.post("/auth/login", body, config);
};

export const signup = (email: string, password: string, controller: ControllerType) => {
	const body = { email, password };
	const config = { signal: controller.signal };
	return api.post("/auth/register", body, config);
};

export const logout = (token: string, controller: ControllerType) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
		signal: controller.signal,
	};
	return api.delete("/auth/logout", config);
};
