import React, { useEffect, useState } from 'react';
import { Form, Input, message, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { vndCurrencyFormat } from '../../../utils/currency';
import { formatColorStatus } from '../../../utils/formatColorStatus';
import _ from 'lodash';
import { getListTimeSlot } from '../../../redux/settingSlice';

const { Option } = Select;
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

	// console.log('current order; ', currentOrder);

	useEffect(() => {
		dispatch(getListTimeSlot());
	}, []);

	useEffect(() => {
		console.log(listTimeSlot);
		const timeSlotMapped = listTimeSlot?.find((time) => time.id === currentOrder.timeSlotId);
		setTimeSlot(timeSlotMapped);
	}, [currentOrder, listTimeSlot]);

	console.log('time sot: ', timeSlot);

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<p>Tên đơn hàng: </p>
				<p>Thời gian đặt hàng: </p>
				<p>Tiền hàng: </p>
				<p>Phí Ship: </p>
				<p>Tổng tiền hàng: </p>
				<p>Trạng thái đơn hàng: </p>
				<p>Hình thức nhận hàng: </p>
				<p>Time Slot: </p>
				<p>Phòng: </p>
				<p>Tên cửa hàng: </p>
				<hr />
				<p>Tên khách hàng: </p>
				<p>SĐT: </p>
				<p>Email: </p>
				<hr />
				<p>Tên sản phẩm: </p>
				<p>Số lượng: </p>
			</div>
			<div>
				<p>{currentOrder.orderName}</p>
				<p>{currentOrder.checkInDate}</p>
				<p>{vndCurrencyFormat(currentOrder.totalAmount)}</p>
				<p>{vndCurrencyFormat(currentOrder.shippingFee)}</p>
				<p style={{ fontWeight: 'bolder' }}>{vndCurrencyFormat(currentOrder.finalAmount)}</p>
				<p style={{ fontWeight: 'bold', color: formatColorStatus(ORDER_STATUS_ENUM[currentOrder?.orderStatus]?.id) }}>
					{ORDER_STATUS_ENUM[currentOrder?.orderStatus]?.name}
				</p>
				<p>
					{_.isEmpty(currentOrder?.roomNumber) === false && currentOrder?.orderType === 2
						? currentOrder?.roomNumber
						: 'Nhận tại cửa hàng'}
				</p>
				<p>
					{timeSlot?.arriveTime} - {timeSlot?.checkoutTime}
				</p>
				<p>{currentOrder.roomNumber} </p>
				<p>{currentOrder.storeName} </p>
				<hr />
				<p>{currentOrder.customerInfo.name} </p>
				<p>{currentOrder.customerInfo.phone} </p>
				<p>{currentOrder.customerInfo.email} </p>
				<hr />
				<p>{currentOrder.orderDetails.map((item) => item.productName)} </p>
				<p>{currentOrder.orderDetails.map((item) => item.quantity)} </p>
			</div>
		</div>
	);
}
