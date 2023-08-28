import { routerType } from "../types/router.type";
import Home from "./Home";
import Product from "./Product";
import ProductDetail from "./Product/ProductDetail";
import Login from "./Login";
import SignUp from "./Signup";
import NotFound from "./NotFound";
import { PrivateRoute, IsLogin } from "../utils/wrapper/routeWrapper";

const pagesData: routerType[] = [
	{
		path: "/",
		element: <Home />,
		title: "Home",
	},
	{
		path: "/product",
		element: <Product />,
		title: "Product",
	},
	{
		path: "/product/details/:id",
		element: (
			<PrivateRoute>
				<ProductDetail />
			</PrivateRoute>
		),
		title: "Product Detail",
	},
	{
		path: "/login",
		element: (
			<IsLogin>
				<Login />
			</IsLogin>
		),
		title: "Login",
	},
	{
		path: "/signup",
		element: (
			<IsLogin>
				<SignUp />
			</IsLogin>
		),
		title: "Sign Up",
	},
	{
		path: "*",
		element: <NotFound />,
		title: "Not Found",
	},
];

export default pagesData;
