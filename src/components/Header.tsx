import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../utils/https/auth";
import { authAction } from "../redux/slices/auth.slice";
import { RootState } from "../redux/store";

import Sidebar from "./Sidebar";

import klontongLogo from "../assets/klontong-icon.webp";

type HeaderProps = {
	page: string;
};

function Header({ page }: HeaderProps) {
	const token = useSelector((state: RootState) => state.auth.token);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const controller = useMemo(() => new AbortController(), []);

	const [toggleState, setToggleState] = useState(false);

	const handleLogout = async () => {
		try {
			await logout(token, controller);
			dispatch(authAction.dismissData());
		} catch (error) {
			console.log(error);
		}
	};

	const handleToggle = () => setToggleState((toggleState) => !toggleState);

	return (
		<header className="sticky top-0 z-10 lg:px-20 py-4 bg-white/30 dark:bg-primary-black/30 border-b dark:border-b-neutral-700 backdrop-filter backdrop-blur-xl w-full select-none">
			<div className="flex items-center justify-between lg:px-20 md:px-10 px-5 py-4 font-inter">
				<Link to={"/"}>
					<div className="flex items-center">
						<img src={klontongLogo} alt="Logo" className="w-8 h-8 mr-2" />
						<h1 className="text-2xl font-black">Klontong</h1>
					</div>
				</Link>
				<div className="md:hidden flex">
					<div className="toggler" onClick={handleToggle}>
						<span className="bar"></span>
						<span className="bar"></span>
						<span className="bar"></span>
					</div>
				</div>
				<Sidebar
					toggleState={toggleState}
					handleToggle={handleToggle}
					handleLogout={handleLogout}
					page={page}
				/>
				<div className={`right-nav lg:gap-96 ${token ? "md:gap-44" : "md:gap-28"}`}>
					<nav className="flex items-center gap-x-12 font-semibold">
						<Link
							to="/"
							className={`${page === "home" ? "font-bold text-primary-yellow" : "font-semibold"}`}
						>
							Home
						</Link>
						<Link
							to="/product"
							className={`${
								page === "product" ? "font-bold text-primary-yellow" : "font-semibold"
							}`}
						>
							Product
						</Link>
					</nav>
					{token ? (
						<div className="flex flex-row gap-x-4 font-medium">
							<button
								onClick={handleLogout}
								className="px-4 py-2 bg-primary-red text-white rounded hover:bg-primary-red/70 duration-300"
							>
								Logout
							</button>
						</div>
					) : (
						<div className="flex flex-row gap-x-4 font-medium">
							<button
								onClick={() => navigate("/login")}
								className="px-4 py-2 bg-primary-red text-white rounded hover:bg-primary-red/70 duration-300"
							>
								Login
							</button>
							<button
								onClick={() => navigate("/signup")}
								className="px-4 py-2 bg-primary-yellow text-primary-black rounded hover:bg-primary-yellow/70 duration-300"
							>
								Sign Up
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
