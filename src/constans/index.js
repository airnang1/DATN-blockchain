import Products from '../pages/Products';
import Catalog from '../pages/Catalog';
import Accessories from '../pages/Accessories';
// import Contact from '../pages/Contact';
import PurchaseOrder from '../pages/User';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/LoginPage';
import ForgotPassword from '../Components/LoginForm/ForgotPassword';
import ResetPassword from '../Components/LoginForm/ResetPassword';

import FileUser from '../Components/User/FileUserItem/FileUser';
import PaymentUser from '../Components/User/FileUserItem/PaymentUser';
import AddressUser from '../Components/User/FileUserItem/AddressUser';
import PasswordUser from '../Components/User/FileUserItem/PasswordUser';
import OrderUser from '../Components/User/OrderUser';

import UpdatedReview from '../Components/User/Notification/UpdatedReview';
import OrderUpdate from '../Components/User/Notification/OrderUpdate';
import Work from '../Components/User/Notification/Work';
import Promotion from '../Components/User/Notification/Promotion';
import WalletUpdate from '../Components/User/Notification/WalletUpdate';
import WheelUser from '../Components/User/WheelUser';
import Cart from '../pages/Cart';
import Category from '../pages/Category';
import News from '../pages/News';
import Search from '../pages/Search';
import Pay from '../pages/Pay';
import Home from '../pages/Home';
// import { DashboardFilled } from '@ant-design/icons';
import DashBoard from '../pages/DashBoard';
import DashboardWidgets from '../Components/DashBoard/DashboardWidgets';
import DashboardMain from '../Components/DashBoard/DashboardMain';
import DashboardCharts from '../Components/DashBoard/DashboardCharts';
import DashboardCustomer from '../Components/DashBoard/DashboardCustomer';
import DashboardOrder from '../Components/DashBoard/DashboardOrder';
import DashboardChat from '../Components/DashBoard/DashboardChat';
import DashboardNews from '../Components/DashBoard/DashboardNews';
// import ProductsDescriptionSetting from '../Components/DashBoard/DashboardWidgets/ProductsDescriptionSetting';
// import ProductDesInsert from '../Components/DashBoard/DashboardWidgets/ProductDesInsert';
// import ProductDescriptionList from '../Components/DashBoard/DashboardWidgets/ProductDescriptionList';
import VerifyEmail from '../pages/VerifyEmail';
import ActivationEmail from '../pages/ActivationEmail';
import OrderSuccess from '../pages/OrderSuccess';
import OrderCancel from '../pages/OrderCancel';
import DashboardStore from '../Components/DashBoard/DashboardStore';
// const Home = React.lazy(() => import('../pages/Home'));

export const MAIN_ROUTES = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        component: Home,
    },
    {
        name: 'Products',
        path: '/product/:category/:name/:id',
        exact: true,
        component: Products,
    },
    {
        name: 'Catalog',
        path: '/catalog',
        exact: true,
        component: Catalog,
    },
    {
        name: 'Accessories',
        path: '/accessories',
        exact: true,
        component: Accessories,
    },
    {
        name: 'News',
        path: '/news',
        exact: true,
        component: News,
    },
    {
        name: 'PurchaseOrder',
        path: '/user/:location',
        exact: true,
        component: PurchaseOrder,
    },
    {
        name: 'Cart',
        path: '/cart',
        exact: true,
        component: Cart,
    },
    {
        name: 'Mobile',
        path: '/category/:category/:keyWork',
        exact: true,
        component: Category,
    },
    {
        name: 'OrderProducts',
        path: '/checkout/:linkText',
        exact: true,
        component: Pay,
    },
    {
        name: 'SearchProduct',
        path: '/search/:keyword',
        exact: true,
        component: Search,
    },
    {
        name: 'OrderSuccess',
        path: '/order/success/:paymentId',
        exact: true,
        component: OrderSuccess,
    },
    {
        name: 'Order Cancel',
        path: '/order/cancel',
        exact: true,
        component: OrderCancel,
    },
    {
        name: 'NotFound',
        path: '/*',
        exact: true,
        component: NotFound,
    },
];

export const LOGIN_ROUTES = [
    {
        name: 'Login',
        path: '/buyer/:isStateLogin',
        exact: true,
        component: LoginPage,
    },
    {
        name: 'Fogot Password',
        exact: true,
        path: '/forgot-password',
        component: ForgotPassword,
    },
    {
        name: 'Verify Email',
        path: '/verify-email',
        exact: true,
        component: VerifyEmail,
    },
    {
        name: 'ActivateAccount',
        path: '/activate/:activation_token',
        exact: true,
        component: ActivationEmail,
    },
    {
        name: 'ResetPassword',
        path: '/reset-password/:token',
        exact: true,
        component: ResetPassword,
    },
];

export const FILE_USER = [
    {
        name: 'UserAccount',
        path: '/user/profile',
        exact: true,
        component: FileUser,
    },
    {
        name: 'Payment',
        path: '/user/payment',
        exact: false,
        component: PaymentUser,
    },
    {
        name: 'Address',
        path: '/user/address',
        exact: false,
        component: AddressUser,
    },
    {
        name: 'Password',
        path: '/user/password',
        exact: false,
        component: PasswordUser,
    },
];

export const ORDER_WHEEL = [
    {
        name: 'AllProduct',
        path: '/user/order',
        exact: true,
        component: OrderUser,
    },
    {
        name: 'AllProduct',
        path: '/user/wheel',
        exact: true,
        component: WheelUser,
    },
];

export const NOTIFICATION_USER = [
    {
        name: 'OrderUpdate',
        path: '/user/order-update',
        exact: true,
        component: OrderUpdate,
    },
    {
        name: 'Promotion',
        path: '/user/promotion',
        exact: false,
        component: Promotion,
    },
    {
        name: 'WalletUpdate',
        path: '/user/wallet-update',
        exact: false,
        component: WalletUpdate,
    },
    {
        name: 'Work',
        path: '/user/work',
        exact: false,
        component: Work,
    },
    {
        name: 'UpdatedReview',
        path: '/user/updated-review',
        exact: false,
        component: UpdatedReview,
    },
];

export const DASHBOARD_MAIN = [
    {
        name: 'Dashboard Main',
        path: '/dashboard/:url',
        exact: true,
        component: DashBoard,
    },
    {
        name: 'DashboardWidgets',
        path: '/dashboard/widgets/:url',
        exact: false,
        component: DashBoard,
    },
];

export const DASHBOARD_ROUTES = [
    {
        name: 'Dashboard Main',
        path: '/dashboard/main',
        exact: false,
        component: DashboardMain,
    },
    {
        name: 'Dashboard Widgets list all',
        path: '/dashboard/widgets/list-all/:keyProducts',
        exact: false,
        component: DashboardWidgets,
    },
    {
        name: 'DashboardWidgets',
        path: '/dashboard/widgets',
        exact: false,
        component: DashboardWidgets,
    },
    {
        name: 'Dashboard Charts',
        path: '/dashboard/charts',
        exact: false,
        component: DashboardCharts,
    },
    {
        name: 'DashboardCustomer',
        path: '/dashboard/customer',
        exact: false,
        component: DashboardCustomer,
    },
    {
        name: 'Dashboard Order',
        path: '/dashboard/order',
        exact: false,
        component: DashboardOrder,
    },
    {
        name: 'Dashboard Chat',
        path: '/dashboard/chat',
        exact: false,
        component: DashboardChat,
    },
    {
        name: 'Dashboard News',
        path: '/dashboard/news',
        exact: false,
        component: DashboardNews,
    },
    {
        name: 'Dashboard Store',
        path: '/dashboard/store',
        exact: false,
        component: DashboardStore,
    },
    {
        name: 'Dashboard Logout',
        path: '/login',
        exact: false,
    },
];
