import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProduct, getProductList, toggleAddProductModal } from '../../redux/productSlice';
import _ from 'lodash';
import { getCategoryList } from '../../redux/categorySlice';
import TableOrderManagement from './TableOrderManagement';
import OrderDetailModal from './OrderDetail/OrderDetailModal';
import EditOrderModal from './EditOrder/EditOrderModal';

export default function OrderManagement() {
	const { user } = useSelector((state) => state.authSlice);
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchKey, setSearchKey] = useState('');

	const handleSearch = (searchValue) => {
		setSearchKey(searchValue);
		dispatch(filterProduct(searchValue));
	};
	document.title = 'F-Food | Product Management';
	return (
		<div>
			<EditOrderModal />
			<OrderDetailModal />
			<div className='pl-72 pr-12 space-y-5'>
				{/* <span
					className='inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded'
					onClick={handleAddProduct}>
					Thêm Đơn Hàng
				</span> */}

				<TableOrderManagement />
			</div>
		</div>
	);
}
