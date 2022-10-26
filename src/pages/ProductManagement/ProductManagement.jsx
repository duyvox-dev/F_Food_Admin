import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProduct, getProductList, toggleAddProductModal } from '../../redux/productSlice';
import TableProductManagement from './TableProductManagement';
import EditProductModal from './EditProduct/EditProductModal';
import AddProductModal from './AddProduct/AddProductModal';
import _ from 'lodash';
export default function ProductManagement() {
	const { user } = useSelector((state) => state.authSlice);
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchKey, setSearchKey] = useState('');

	useEffect(() => {
		if (_.isEmpty(user)) navigate('/');
	}, [user]);

	useEffect(() => {
		dispatch(getProductList({ page: 1, pageSize: 10 }));
	}, []);
	const handleAddProduct = () => {
		dispatch(toggleAddProductModal());
	};
	const handleSearch = (searchValue) => {
		setSearchKey(searchValue);
		dispatch(filterProduct(searchValue));
	};
	document.title = 'F-Food | Product Management';
	return (
		<div>
			<EditProductModal />
			<AddProductModal />
			<div className='pl-72 pr-12 space-y-5'>
				<span
					className='inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded'
					onClick={handleAddProduct}>
					Thêm Sản Phẩm
				</span>
				<input
					className='w-full h-12 border-2 border-black rounded-md px-5 text-lg'
					type='text'
					placeholder='Nhập vào họ tên bạn muốn tìm'
					value={searchKey}
					onChange={(e) => handleSearch(e.target.value)}
				/>
				<TableProductManagement />
			</div>
		</div>
	);
}
