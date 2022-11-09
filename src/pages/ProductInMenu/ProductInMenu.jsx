import React from 'react';
import AddProductInMenuModal from './AddProductInMenu/AddProductInMenuModal';

import EditProductInMenuModal from './EditProductInMenu/EditProductInMenuModal';
import TableProductInMenu from './TableProductInMenu';

function ProductInMenu(props) {
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
