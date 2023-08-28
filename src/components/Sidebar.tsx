import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import { Home24Filled, ShoppingBag24Filled } from "@fluentui/react-icons";

import { RootState } from "../redux/store";

import klontongLogo from "../assets/klontong-icon.webp";

interface SidebarProps {
	toggleState: boolean;
	handleToggle: () => void;
	handleLogout: () => void;
	page: string;
}

function Sidebar({ toggleState, handleToggle, handleLogout, page }: SidebarProps) {
	const token = useSelector((state: RootState) => state.auth.token);

	const navigate = useNavigate();

	return (
		<>
			<Transition show={toggleState} as={Fragment}>
				<Dialog
					unmount={false}
					onClose={() => handleToggle()}
					className={`fixed z-[11] inset-0 overflow-y-auto lg:hidden`}
				>
					<div className="fixed top-0 right-0">
						<div className="flex w-3/4 h-screen">
							<Transition.Child
								enter="transition-opacity ease-linear duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="transition-opacity ease-linear duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed bg-white/40 dark:bg-primary-black/40 backdrop-filter backdrop-blur-md inset-0 overflow-y-auto" />
							</Transition.Child>
							<Transition.Child
								enter="transition ease-in-out duration-300 transform"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<div className="bg-white dark:bg-primary-black drop-shadow-[0px_4px_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0px_4px_20px_rgba(255,255,255,0.1)] flex flex-col h-full md:w-[40vw] w-[80vw] z-[12] gap-y-10">
									<section className="flex justify-center items-center bg-gradient-to-tr from-primary-red via-orange-400 to-primary-yellow animate-gradient h-1/4 w-full">
										<div className="w-16 h-16 overflow-hidden">
											<img src={klontongLogo} alt="klontong logo" className="w-full h-full" />
										</div>
									</section>
									<section className="flex flex-col px-5 gap-y-8 font-inter">
										<div onClick={() => navigate("/")} className="flex items-center gap-x-4">
											<Home24Filled className={`${page === "home" && "text-primary-yellow"}`} />
											<p
												className={`text-xl font-bold ${page === "home" && "text-primary-yellow"}`}
											>
												Home
											</p>
										</div>
										<div onClick={() => navigate("/product")} className="flex items-center gap-x-4">
											<ShoppingBag24Filled
												className={`${page === "product" && "text-primary-yellow"}`}
											/>
											<p
												className={`text-xl font-bold ${
													page === "product" && "text-primary-yellow"
												}`}
											>
												Product
											</p>
										</div>
									</section>
									<section className="flex items-center justify-center">
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
									</section>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default Sidebar;
