import React, { useEffect } from 'react';
import { Form, Input, message, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../../redux/productSlice';
export default function EditProductForm() {
	const dispatch = useDispatch();
	const validateMessages = {
		required: '${label} không được để trống',
		whitespace: '${label} không được để trống',
		types: {
			number: '${label} không hợp lệ',
		},
	};
	const onFinish = (values) => {
		dispatch(createProduct(values));
	};

	const onFinishFailed = (errorInfo) => {
		message.error('Tạo sản phẩm thất bại, vui lòng kiểm tra lại thông tin');
	};
	return (
		<div>
			<div className='rounded-xl'>
				<div>
					<Form
						className='font-medium'
						labelCol={{ span: 5 }}
						validateMessages={validateMessages}
						name='basic'
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Form.Item
							initialValue=''
							label='Tên'
							name='name'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Tỉnh'
							name='province'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Quốc gia'
							name='country'
							hasFeedback
							rules={[
								{
									required: true,
									whitespace: true,
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							initialValue=''
							label='Đánh giá'
							name='valueate'
							hasFeedback
							rules={[
								{
									required: true,
								},
							]}>
							<InputNumber min={1} max={10} style={{ width: '100%' }} />
						</Form.Item>

						<Form.Item className='truncate' style={{ margin: '0' }}>
							<button
								className="p-3 relative text-white w-full rounded-lg font-medium uppercase text-lg after:content-[''] after:w-full after:bg-white after:absolute after:top-full after:h-full after:left-0 after:text-white after:rounded-lg after:duration-300 after:hover:-translate-y-full after:hover:bg-[#ff5a5f] after:mix-blend-screen"
								style={{
									backgroundImage:
										'radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%, #BD1E59 75%,#BD1E59 100%',
								}}>
								<span>Tạo sản phẩm</span>
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
