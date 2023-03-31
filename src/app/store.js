import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from '../features/auth/authSlice'
import sidebarReducer from "./sidebar";
import nametagReducer from "./nametag";
import footerReducer from "./footer"
import refreshReducer from "./refresh"
import colorReducer from "./color"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        refresh: refreshReducer,
        sidebar: sidebarReducer,
        footer: footerReducer,
        nametag: nametagReducer,
        color: colorReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
    // devTools: true (when in development mode) disables redux dev tools
})

setupListeners(store.dispatch)