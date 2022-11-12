import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getListTimeSlot } from '../../../redux/settingSlice';
import moment from 'moment/moment';
export default function OrderDetail() {
	const dispatch = useDispatch();
	const { currentOrder } = useSelector((state) => state.orderSlice);

	const { listTimeSlot } = useSelector((state) => state.settingSlice);

	const [timeSlot, setTimeSlot] = useState({});

	const ORDER_STATUS_ENUM = [
		{
			id: 0,
			name: 'lorem',
		},
		{
			id: 1,
			name: 'Đã huỷ',
		},
		{
			id: 2,
			name: 'Chờ xác nhận',
		},
		{
			id: 3,
			name: 'Chờ lấy hàng',
		},
		{
			id: 4,
			name: 'Đã giao',
		},
	];
	const columns = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
		},
		{
			title: 'Giá',
			dataIndex: 'finalAmount',
		},
	];
	// console.log('current order; ', currentOrder);

	useEffect(() => {
		dispatch(getListTimeSlot());
	}, []);

	useEffect(() => {
		const timeSlotMapped = listTimeSlot?.find((time) => time.id === currentOrder.timeSlotId);
		setTimeSlot(timeSlotMapped);
	}, [currentOrder, listTimeSlot]);

	return (
		<div>
			<h2 className=' font-semibold text-xl'>Thông tin</h2>
			<div className='grid grid-cols-2'>
				<p className='text-lg'>
					Mã đơn: <b>{currentOrder.orderName}</b>
				</p>
				<p className='text-lg'>
					Trạng thái: <b className=' text-rose-500'>{ORDER_STATUS_ENUM[currentOrder?.orderStatus]?.name}</b>
				</p>
				<p className='text-lg'>
					Thời gian: <b>{moment(currentOrder.checkInDate).format('DD/MM/YYYY HH:MM')}</b>
				</p>
				<p className='text-lg'>
					<span>
						Địa chỉ giao hàng:{' '}
						<b>
							{_.isEmpty(currentOrder?.roomNumber) === false && currentOrder?.orderType === 2
								? currentOrder?.roomNumber
								: 'Nhận tại cửa hàng'}
						</b>
					</span>
				</p>
				<p className='text-lg'>
					<span>
						Thời gian giao hàng:{' '}
						<b>
							{timeSlot?.arriveTime} - {timeSlot?.checkoutTime}
						</b>
					</span>
				</p>
			</div>

			<h2 className=' font-semibold text-xl mt-5'>Thông tin khách hàng</h2>
			<div className='grid grid-cols-2'>
				<p className='text-lg'>
					Họ tên: <b>{currentOrder.customerInfo.name}</b>
				</p>
				<p className='text-lg'>
					Số điện thoại: <b>{currentOrder.customerInfo.phone}</b>
				</p>
			</div>
			<div>
				<h2 className=' font-semibold text-xl mt-5'>Thông tin đơn hàng</h2>
				<Table columns={columns} dataSource={currentOrder?.orderDetails} />;
			</div>
		</div>
	);
}
