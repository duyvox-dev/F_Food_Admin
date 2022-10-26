import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { productService } from '../services/productService';
import { message } from 'antd';
export const createProduct = createAsyncThunk('productSlice/createProduct', async (productInfo, thunkAPI) => {
	try {
		const result = await productService.createProduct(productInfo);
		thunkAPI.dispatch(toggleAddProductModal());
		thunkAPI.dispatch(getProductList({ page: 1, pageSize: 10 }));
		message.success('Tạo sản phẩm thành công!');
		return result.data;
	} catch (error) {
		// message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});

export const getProductList = createAsyncThunk('locatiohSlice/getProductList', async (pagination, thunkAPI) => {
	try {
		const result = await productService.getProductList(pagination);
		return result.data;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});
export const getProductInfo = createAsyncThunk('productSlice/getProductList', async (productID, thunkAPI) => {
	try {
		const result = await productService.getProductInfo(productID);
		return result.data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});
export const deleteProduct = createAsyncThunk('productSlice/deleteProduct', async (ProductID, thunkAPI) => {
	try {
		const result = await productService.deleteProduct(ProductID);
		thunkAPI.dispatch(getProductList({ page: 1, pageSize: 10 }));
		message.success('Xoá sản phẩm thành công!');
		return result.data;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});
export const updateProduct = createAsyncThunk('productSlice/updateProduct', async (data, thunkAPI) => {
	try {
		const result = await productService.updateProductInfo(data);

		thunkAPI.dispatch(toggleEditProductModal());
		thunkAPI.dispatch(getProductList());
		message.success('Cập nhật sản phẩm thành công!');

		return result.data;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});
export const filterProduct = createAsyncThunk('productSlice/filterProduct', async (searchKey, thunkAPI) => {
	try {
		const productList = thunkAPI.getState().productSlice.productList;
		let filterredList = productList.filter((item) => {
			if (typeof item.name === 'string' && item.name.trim().toUpperCase().includes(searchKey.trim().toUpperCase())) {
				return item;
			}
		});
		return filterredList;
	} catch (err) {
		message.error('Có lỗi xảy ra vui lòng thử lại');
		return thunkAPI.rejectWithValue();
	}
});

const productSlice = createSlice({
	name: 'productSlice',
	initialState: {
		productList: [],
		productFilterredList: [],
		currentProduct: {},
		modalEdit: false,
		modalAdd: false,
	},
	reducers: {
		toggleEditProductModal: (state, action) => {
			state.modalEdit = !state.modalEdit;
		},
		toggleAddProductModal: (state, action) => {
			state.modalAdd = !state.modalAdd;
		},
	},
	extraReducers: {
		[getProductList.pending]: (state, action) => {
			state.productList = [];
			state.productFilterredList = [];
		},
		[getProductList.fulfilled]: (state, action) => {
			state.productList = action.payload;
			state.productFilterredList = action.payload;
		},
		[getProductList.rejected]: (state, action) => {},
		[getProductInfo.pending]: (state, action) => {
			state.currentProduct = action.payload;
		},
		[getProductInfo.fulfilled]: (state, action) => {
			state.currentProduct = action.payload;
		},
		[getProductInfo.rejected]: (state, action) => {},
		[filterProduct.pending]: (state, action) => {},
		[filterProduct.fulfilled]: (state, action) => {
			state.productFilterredList = action.payload;
		},
	},
});
const { reducer, actions } = productSlice;
export const { toggleEditProductModal, toggleAddProductModal } = actions;
export default reducer;
