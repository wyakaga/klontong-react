import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom";
import { IosArrowLtr24Regular } from "@fluentui/react-icons";

import useTitle from "../../utils/useTitle";

import pageNotFound from "../../assets/pageNotFound.json";

function NotFound() {
	const navigate = useNavigate();

	const options = {
		animationData: pageNotFound,
		loop: true,
		autoplay: true,
	};

	const style = {
		width: 480,
		height: 480,
	};

	const { View } = useLottie(options, style);

  useTitle("Not Found");

	return (
		<main className="h-screen flex flex-col items-center justify-center gap-y-10 bg-gradient-to-t from-[#DDDDDD] dark:from-[#4F4B4C] via-transparent to-transparent">
			<div>{View}</div>
			<button
				onClick={() => navigate("/")}
				className="group flex flex-row justify-center items-center gap-x-2 rounded-md p-4 bg-primary-yellow hover:bg-primary-yellow/70 text-primary-black duration-300"
			>
				<IosArrowLtr24Regular className="transform group-hover:-translate-x-2 duration-300" />
				<p className="font-poppins text-lg font-semibold">Head back home</p>
			</button>
		</main>
	);
}

export default NotFound;
