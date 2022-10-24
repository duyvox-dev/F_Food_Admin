import ThemeLayout from '../HOC/ThemeLayout';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProductManagement from '../pages/ProductManagement/ProductManagement';
export const sellerRoutes = [
	{
		path: '/',
		component: <LoginPage />,
	},

	{
		path: '/product',
		component: <ThemeLayout Component={ProductManagement} />,
	},
];
