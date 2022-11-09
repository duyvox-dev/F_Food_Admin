import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { columnsProductManagement } from '../../utils/productManagement';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductInfo, getProductList, toggleEditProductModal } from '../../redux/productSlice';
import { getMenuInfo, getMenuList, toggleEditMenuModal } from '../../redux/menuSlice';
export default function TableMenuManagement() {
	const { menuList } = useSelector((state) => state.menuSlice);
	//const { categoryList } = useSelector((state) => state.categorySlice);

	const [menuData, setMenuData] = useState([]);
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		dispatch(getMenuList({ page: 1, pageSize: 10 }));
	}, []);

	useEffect(() => {
		setMenuData(menuList.results);
	}, [menuList]);

	const handleChangePage = (page) => {
		const currentPage = page?.current ?? 1;
		const pageSize = page?.pageSize ?? 10;
		dispatch(getMenuList({ page: currentPage, pageSize: pageSize }));
	};

	const columnsProductManagement1 = [
		{
			title: 'Tên',
			dataIndex: 'menuName',
			key: 'menuName',
			align: 'center',
			sorter: true,
			sorter: (a, b) => {
				if (a.menuName > b.menuName) {
					return 1;
				}
				if (a.menuName < b.menuName) {
					return -1;
				}
				return 0;
			},
			width: '25%',
			filteredValue: [searchText],
			onFilter: (value, record) => {
				return String(record.menuName).toLowerCase().includes(value.toLowerCase());
			},
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			align: 'center',
			width: '20%',
		},
		{
			title: 'Time slot',
			dataIndex: 'timeSlotId',
			key: 'timeSlotId',
			align: 'center',
			width: '10%',
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
								dispatch(getMenuInfo(record.id));
								dispatch(toggleEditMenuModal());
							}}>
							Sửa
						</button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Input
				style={{ border: '2px solid black', marginBottom: '20px', borderRadius: '5px', padding: '10px' }}
				placeholder='Nhập vào menu bạn muốn tìm'
				allowClear
				onSearch={(value) => {
					setSearchText(value);
				}}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<Table
				bordered
				dataSource={menuData}
				columns={columnsProductManagement1}
				rowKey={'_id'}
				pagination={{
					total: menuList?.totalNumberOfRecords,
					showTotal: (total) => `Total ${total} menu`,
					current: menuList?.pageNumber,
					pageSize: menuList?.pageSize,
					onChange: (page, pageSize) => {
						handleChangePage({ current: page, pageSize: pageSize });
					},
				}}></Table>
		</div>
	);
}
