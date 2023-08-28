import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	token: string;
	role: string;
}

const initialState: AuthState = {
	token: "",
	role: "",
};

const authSlice = createSlice({
	name: `auth`,
	initialState,
	reducers: {
		assignRole: (prevState, action) => {
			return {
				...prevState,
				role: action.payload,
			};
		},
		assignToken: (prevState, action) => {
			return {
				...prevState,
				token: action.payload,
			};
		},
		dismissData: (prevState) => {
			return {
				...prevState,
				token: "",
				role: "",
			};
		},
	},
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
