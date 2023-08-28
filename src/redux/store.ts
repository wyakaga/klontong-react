import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { configureStore } from "@reduxjs/toolkit";

import reducer from "./slices";

const persistConfig = {
	key: "klontong",
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (defaultMiddleware) => {
		return defaultMiddleware({
			serializableCheck: {
				ignoreActions: true,
			},
		});
	},
});

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
export default store;
