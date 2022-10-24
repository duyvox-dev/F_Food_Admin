import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { columnsProductManagement } from '../../utils/productManagement';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../redux/productSlice';
export default function TableProductManagement() {
	const { productFilterredList } = useSelector((state) => state.productSlice);
	const [productData, setProductData] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (productFilterredList) {
			let arrNew = productFilterredList.map((item) => {
				return { ...item, action: dispatch };
			});
			setProductData(arrNew);
		}
	}, [productFilterredList]);
	useEffect(() => {
		dispatch(getProductList());
	}, []);
	return (
		<div>
			<Table bordered dataSource={productData} columns={columnsProductManagement} rowKey={'_id'}></Table>
		</div>
	);
}
