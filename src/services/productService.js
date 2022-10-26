import { httpService } from './httpService';

export const productService = {
	createProduct: (data) => {
		return httpService.post(`/product/CreateProduct`, data);
	},
	updateProductInfo: ({ productID, newproductInfo }) => {
		return httpService.put(`/product/UpdateProduct?productId=${productID}`, newproductInfo);
	},
	getProductList: ({ page, pageSize }) => {
		return httpService.get(`/product?page=${page}&pageSize=${pageSize}`);
	},
	getProductInfo: (productID) => {
		return httpService.get(`/product/GetById?id=${productID}`);
	},
};
