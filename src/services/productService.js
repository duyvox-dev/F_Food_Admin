import { httpService } from './httpService';

export const productService = {
	createProduct: (data) => {
		return httpService.post(`/product/CreateProduct`, data);
	},
	updateProductInfo: (productID, newproductInfo) => {
		return httpService.put(`/product/UpdateProduct?productId=${productID}`, newproductInfo);
	},
	getProductList: () => {
		return httpService.get(`/product`);
	},
	getProductInfo: (productID) => {
		return httpService.get(`/product/GetById?id=${productID}`);
	},
};
