import { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../utils/https/auth";
import useTitle from "../../utils/useTitle";

import klontongLogo from "../../assets/klontong-icon.webp";

function SignUp() {
	const navigate = useNavigate();

	const controller = useMemo(() => new AbortController(), []);

	const [form, setForm] = useState({ email: "", password: "" });

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setForm((form) => {
			return { ...form, [event.target.name]: event.target.value };
		});
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await signup(form.email, form.password, controller);
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	useTitle("Sign Up");

	return (
		<div className="body-wrapper flex justify-center items-center auth-bg bg-cover bg-center min-h-screen lg:p-0 p-8">
			<main className="flex flex-col items-center gap-y-6 lg:w-1/2 h-3/4 lg:py-6 lg:px-4 md:p-12 p-4 bg-white/30 backdrop-filter backdrop-blur-xl rounded-[12px] border border-solid border-[rgba(209,213,219,0.3)]">
				<div className="flex flex-col items-center gap-y-8">
					<div className="flex items-center">
						<img src={klontongLogo} alt="klontong logo" className="w-14 h-14" />
					</div>
					<p className="font-poppins text-4xl font-bold text-center text-white">
						Sign up for an account
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-y-10 w-full font-inter">
					<div className="flex flex-col gap-y-8">
						<div className="flex flex-col gap-y-4">
							<label htmlFor="email-address" className="text-xl font-semibold">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-md w-full px-3 py-3 placeholder-gray-500 placeholder:text-lg text-gray-90 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
								placeholder="Email address"
								onChange={(event) => handleInput(event)}
							/>
						</div>
						<div className="flex flex-col gap-y-4">
							<label htmlFor="password" className="text-xl font-semibold">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-md w-full px-3 py-3 placeholder-gray-500 placeholder:text-lg text-gray-90 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
								placeholder="Password"
								onChange={(event) => handleInput(event)}
							/>
						</div>
					</div>

					<div>
						<button className="group w-full flex justify-center py-3 px-4 border border-transparent text-xl font-semibold rounded-md text-white bg-primary-yellow hover:bg-primary-yellow/70 focus:outline-none focus:ring-2 focus:ring-offset-2">
							Sign up
						</button>
					</div>
				</form>

				<div className="font-inter">
					<p className="text-white">
						Have account?{" "}
						<Link to={"/login"} className="text-primary-red font-semibold cursor-pointer">
							Sign in
						</Link>
					</p>
				</div>
			</main>
		</div>
	);
}

export default SignUp;
