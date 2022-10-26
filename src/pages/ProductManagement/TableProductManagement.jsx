import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { columnsProductManagement } from '../../utils/productManagement';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductInfo, getProductList, toggleEditProductModal } from '../../redux/productSlice';
export default function TableProductManagement() {
	const { productFilterredList, productList } = useSelector((state) => state.productSlice);
	const [productData, setProductData] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		setProductData(productList.results);
	}, [productList]);

	// useEffect(() => {
	// 	if (productFilterredList) {
	// 		let arrNew = productFilterredList.map((item) => {
	// 			return { ...item, action: dispatch };
	// 		});
	// 		setProductData(arrNew);
	// 	}
	// }, [productFilterredList]);

	useEffect(() => {
		dispatch(getProductList({ page: 1, pageSize: 10 }));
	}, []);

	//console.log('data: ', data.totalNumberOfRecords);

	const handleChangePage = (page) => {
		const currentPage = page?.current ?? 1;
		const pageSize = page?.pageSize ?? 10;
		dispatch(getProductList({ page: currentPage, pageSize: pageSize }));
	};

	const columnsProductManagement1 = [
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			sorter: true,
			sorter: (a, b) => {
				if (a.name > b.name) {
					return 1;
				}
				if (a.name < b.name) {
					return -1;
				}
				return 0;
			},
		},

		{
			title: 'Danh mục',
			dataIndex: 'categoryId',
			key: 'categoryId',
			align: 'center',
		},
		{
			title: 'Miêu tả',
			dataIndex: 'detail',
			key: 'detail',
			align: 'center',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'image',
			key: 'image',
			align: 'center',
			render: (img) => {
				return (
					<div className='flex justify-center'>
						<img className='h-16 w-24' src={img} alt={img} />
					</div>
				);
			},
		},

		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
		},

		{
			title: 'Thao tác',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			render: (_, record) => {
				return (
					<div className='flex justify-center space-x-4 w-full h-full'>
						<button
							className='text-white bg-blue-600 px-4 py-2 rounded'
							onClick={() => {
								dispatch(getProductInfo(record.id));
								dispatch(toggleEditProductModal());
							}}>
							Sửa
						</button>
						<button
							className='text-white bg-red-600 px-4 py-2 rounded'
							onClick={() => dispatch(deleteProduct(record._id))}>
							Xóa
						</button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Table
				bordered
				dataSource={productData}
				columns={columnsProductManagement1}
				rowKey={'_id'}
				pagination={{
					total: productList?.totalNumberOfRecords,
					showTotal: (total) => `Total ${total} products`,
					current: productList?.pageNumber,
					pageSize: productList?.pageSize,
					onChange: (page, pageSize) => {
						console.log(page);
						handleChangePage({ current: page, pageSize: pageSize });
					},
				}}></Table>
		</div>
	);
}
