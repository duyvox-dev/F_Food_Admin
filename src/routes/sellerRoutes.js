import ThemeLayout from '../HOC/ThemeLayout';
import LoginPage from '../pages/LoginPage/LoginPage';
import MenuManagement from '../pages/MenuManagement/MenuManagement';
import OrderManagement from '../pages/Order/OrderManagement';
import ProductInMenu from '../pages/ProductInMenu/ProductInMenu';
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
	{
		path: '/product-in-menu',
		component: <ThemeLayout Component={ProductInMenu} />,
	},
	{
		path: '/menu',
		component: <ThemeLayout Component={MenuManagement} />
	},
	{
		path: '/order',
		component: <ThemeLayout Component={OrderManagement} />
	}
];
