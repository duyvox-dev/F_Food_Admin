import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import loadingSlice from './loadingSlice';
import categorySlice from './categorySlice';
export const store = configureStore({
	reducer: {
		authSlice,
		loadingSlice,
		productSlice,
		categorySlice,
	},
});
