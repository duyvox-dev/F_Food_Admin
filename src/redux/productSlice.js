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
		thunkAPI.dispatch(getProductList({ page: 1, pageSize: 10 }));
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

// product in menu
export const getProductListInMenu = createAsyncThunk(
	'productList/getProductListInMenu',
	async (pagination, thunkAPI) => {
		try {
			const result = await productService.getProductListInMenu(pagination);
			return result.data;
		} catch (error) {
			message.error(error.response.data.message);
			return thunkAPI.rejectWithValue();
		}
	}
);

export const getProductInMenuInfo = createAsyncThunk(
	'productSlice/getProductInMenuInfo',
	async (productID, thunkAPI) => {
		console.log('Data api:', productID);
		try {
			const result = await productService.getProductInMenuInfo(productID);
			return result.data;
		} catch (error) {
			return thunkAPI.rejectWithValue();
		}
	}
);

export const createProductInMenu = createAsyncThunk(
	'productSlice/createProductInMenu',
	async (productInfo, thunkAPI) => {
		try {
			const result = await productService.createProductInMenu(productInfo);
			thunkAPI.dispatch(toggleAddProductInMenu());
			thunkAPI.dispatch(getProductListInMenu({ page: 1, pageSize: 10 }));
			message.success('Tạo sản phẩm vào menu thành công!');
			return result.data;
		} catch (error) {
			// message.error(error.response.data.message);
			return thunkAPI.rejectWithValue();
		}
	}
);

export const updateProductInMenu = createAsyncThunk('productSlice/updateProductInMenu', async (data, thunkAPI) => {
	console.log('data api; ', data);
	try {
		const result = await productService.updateProductInMenu(data);

		thunkAPI.dispatch(toggleEditProductInMenu());
		thunkAPI.dispatch(getProductListInMenu({ page: 1, pageSize: 10 }));
		message.success('Cập nhật sản phẩm thành công!');

		return result.data;
	} catch (error) {
		message.error(error.response.data.message);
		return thunkAPI.rejectWithValue();
	}
});

export const deleteProductInMenu = createAsyncThunk('productSlice/deleteProductInMenu', async (productID, thunkAPI) => {
	try {
		const result = await productService.deleteProductInMenu(productID);
		thunkAPI.dispatch(getProductListInMenu({ page: 1, pageSize: 10 }));
		message.success('Xoá sản phẩm thành công!');
		return result.data;
	} catch (error) {
		message.error(error.response.data.message);
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

		productListInMenu: [],
		currentProductInMenu: {},
		modalAddProductInMenu: false,
		modalEditProductInMenu: false,
	},
	reducers: {
		toggleEditProductModal: (state, action) => {
			state.modalEdit = !state.modalEdit;
		},
		toggleAddProductModal: (state, action) => {
			state.modalAdd = !state.modalAdd;
		},
		toggleAddProductInMenu: (state, action) => {
			state.modalAddProductInMenu = !state.modalAddProductInMenu;
		},
		toggleEditProductInMenu: (state, action) => {
			state.modalEditProductInMenu = !state.modalEditProductInMenu;
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

		// get product list in menu
		[getProductListInMenu.pending]: (state, action) => {
			state.productListInMenu = [];
		},
		[getProductListInMenu.fulfilled]: (state, action) => {
			state.productListInMenu = action.payload;
		},
		[getProductListInMenu.rejected]: (state, action) => {},

		[getProductInMenuInfo.pending]: (state, action) => {
			state.currentProductInMenu = action.payload;
		},
		[getProductInMenuInfo.fulfilled]: (state, action) => {
			state.currentProductInMenu = action.payload;
		},
		[getProductInMenuInfo.rejected]: (state, action) => {},
	},
});
const { reducer, actions } = productSlice;
export const { toggleEditProductModal, toggleAddProductModal, toggleAddProductInMenu, toggleEditProductInMenu } =
	actions;
export default reducer;
