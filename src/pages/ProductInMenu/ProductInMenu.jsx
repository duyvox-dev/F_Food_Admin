import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductInMenuModal from './AddProductInMenu/AddProductInMenuModal';

import EditProductInMenuModal from './EditProductInMenu/EditProductInMenuModal';
import TableProductInMenu from './TableProductInMenu';
import { message } from 'antd';
import _ from 'lodash';
import { useSelector } from 'react-redux';
function ProductInMenu(props) {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.authSlice);
	useEffect(() => {
		if (_.isEmpty(user)) {
			navigate('/');
			message.error('Vui lòng đăng nhập');
		}
	}, [user]);
	return (
		<>
			<EditProductInMenuModal />
			<AddProductInMenuModal />
			<div className='pl-72 pr-12 space-y-5'>
				{/* <span
			className='inline-block mt-5 text-white bg-rose-500 px-5 py-1 cursor-pointer rounded'
			onClick={handleAddProduct}>
			Thêm Sản Phẩm
		</span> */}

				<TableProductInMenu />
			</div>
		</>
	);
}

export default ProductInMenu;
