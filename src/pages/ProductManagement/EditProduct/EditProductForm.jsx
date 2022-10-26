import React, { useEffect, useState } from 'react';
import { Form, Input, message, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditProductModal, updateProduct } from '../../../redux/productSlice';
import _ from 'lodash';
import { current } from '@reduxjs/toolkit';
import FormItem from 'antd/lib/form/FormItem';
export default function EditProductForm() {
	const dispatch = useDispatch();
	const { currentProduct } = useSelector((state) => state.productSlice);

	const [form] = Form.useForm();

	const [initValue, setInitValue] = useState([]);

	useEffect(() => {
		setInitValue({
			name: currentProduct?.name,
			categoryId: currentProduct?.categoryId,
			detail: currentProduct?.detail,
			image: currentProduct?.image,
			price: currentProduct?.price,
			quantity: currentProduct?.quantity,
			code: currentProduct?.code,
			supplierStoreId: currentProduct?.supplierStoreId,
		});
		setInitValue([
			{
				name: ['name'],
				value: currentProduct?.name,
			},
			{
				name: ['categoryId'],
				value: currentProduct?.categoryId,
			},
			{
				name: ['detail'],
				value: currentProduct?.detail,
			},
			{
				name: ['image'],
				value: currentProduct?.image,
			},
			{
				name: ['price'],
				value: currentProduct?.price,
			},
			{
				name: ['quantity'],
				value: currentProduct?.quantity,
			},
			{
				name: ['code'],
				value: currentProduct?.code,
			},
			{
				name: ['supplierStoreId'],
				value: currentProduct?.supplierStoreId,
			},
		]);
	}, []);

	const validateMessages = {
		required: '${label} không được để trống',
		whitespace: '${label} không được để trống',
		types: {
			number: '${label} không hợp lệ',
		},
	};
	const onFinish = (values) => {
		console.log('value: ', values);
		dispatch(
			updateProduct({
				productID: currentProduct.id,
				newproductInfo: values,
			})
		);
	};

	const onFinishFailed = (errorInfo) => {
		message.error('Sửa thông tin thất bại, vui lòng kiểm tra lại thông tin');
		dispatch(toggleEditProductModal());
	};
	return (
		<div>
			<div className='rounded-xl'>
				<div>
					<Form
						//form={form}
						className='font-medium'
						labelCol={{ span: 5 }}
						validateMessages={validateMessages}
						name='basic'
						initialValues={{
							remember: true,
						}}
						fields={initValue}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Form.Item
							//initialValue={currentProduct?.name}
							label='Tên'
							//name='name'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Form.Item name='name'>
								<Input />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.categoryId}
							label='Danh mục'
							//name='categoryId'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Form.Item name='categoryId'>
								<Input />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.detail}
							label='Miêu tả'
							//name='detail'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Form.Item name='detail'>
								<Input />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.image}
							label='Hình ảnh'
							//name='image'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							{/* <Upload>
								<Button icon={<UploadOutlined />}>Upload</Button>
							</Upload> */}
							<Form.Item name='image'>
								<Input />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.price}
							label='Giá'
							//name='price'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='price'>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.quantity}
							label='Số lượng'
							//name='quantity'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='quantity'>
								<InputNumber min={1} max={10} style={{ width: '100%' }} />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.code}
							label='Product Code'
							//name='code'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Form.Item name='code'>
								<Input />
							</Form.Item>
						</Form.Item>
						<Form.Item
							//initialValue={currentProduct?.supplierStoreId}
							label='Supplier Store ID'
							//name='supplierStoreId'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<Form.Item name='supplierStoreId'>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Form.Item>

						<Form.Item className='truncate' style={{ margin: '0' }}>
							<button
								className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
								style={{
									backgroundImage:
										'radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%',
								}}>
								<span>Cập nhật</span>
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
