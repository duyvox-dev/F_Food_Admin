import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SidebarTemplate() {
	// const defaultClassName =
	//     "block text-black text-center w-full py-2 hover:text-black";
	// const activeClassName =
	//     "block text-white text-center bg-gray-600 py-2 w-full rounded hover:text-white";
	const defaultClassName =
		"text-black hover:text-black relative cursor-pointer transition-all duration-300 after:w-full after:-translate-x-[150%] after:h-[2px] after:absolute after:content-[''] after:-bottom-1 after:left-0 hover:after:w-full hover:after:translate-x-0 hover:after:bg-black after:transition-all after:duration-300";
	const activeClassName = 'text-rose-500 hover:text-rose-500';
	return (
		<div className='fixed left-0 bottom-0 top-20 h-full w-60'>
			<div className='h-full w-full shadow-md'>
				<div className='pt-16 px-5 flex flex-col justify-start space-y-8'>
					<div className='text-lg font-medium w-full'>
						<NavLink to='/product' className={({ isActive }) => (isActive ? activeClassName : defaultClassName)}>
							Quản lý sản phẩm
						</NavLink>
					</div>
					<div className='text-lg font-medium'>
						<NavLink to='/order' className={({ isActive }) => (isActive ? activeClassName : defaultClassName)}>
							Quản lí đơn hàng
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
