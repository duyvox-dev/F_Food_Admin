import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProduct, getProductList, toggleAddProductModal } from '../../redux/productSlice';
import _ from 'lodash';
import { getCategoryList } from '../../redux/categorySlice';
import TableMenuManagement from './TableMenuManagement';
import AddMenuModal from './AddMenu/AddMenuModal';
import { toggleAddMenuModal } from '../../redux/menuSlice';
import EditMenuModal from './EditMenu/EditMenuModal';

export default function MenuManagement() {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchKey, setSearchKey] = useState('');

	useEffect(() => {
		dispatch(getProductList());
		dispatch(getCategoryList());
	}, []);
	const handleAddMenu = () => {
		dispatch(toggleAddMenuModal());
	};
	const handleSearch = (searchValue) => {
		setSearchKey(searchValue);
		dispatch(filterProduct(searchValue));
	};
	document.title = 'F-Food | Product Management';
	return (
		<div>
			<EditMenuModal />
			<AddMenuModal />
			<div className='pl-72 pr-12 space-y-5'>
				<span
					className='inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded'
					onClick={handleAddMenu}>
					Thêm Menu
				</span>

				<TableMenuManagement />
			</div>
		</div>
	);
}
