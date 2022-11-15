import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLoginBtn from '../../components/GoogleLoginBtn/GoogleLoginBtn';
import _ from 'lodash';
export default function LoginPage() {
	const { user } = useSelector((state) => state.authSlice);
	const navigate = useNavigate();
	useEffect(() => {
		if (_.isEmpty(user) == false) navigate('/product');
	}, [user]);
	return (
		<div className='w-[100vh] h-[100vh] d-flex justify-center items-center'>
			<GoogleLoginBtn></GoogleLoginBtn>
			{/* hjhjhj */}
		</div>
	);
}
