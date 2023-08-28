import { useLottie } from "lottie-react";

import dataNotFound from "../assets/dataNotFound.json";

function DataNotFound() {
	const options = {
		animationData: dataNotFound,
		loop: true,
		autoplay: true,
	};

	const style = {
		width: 640,
		height: 640,
	};

	const { View } = useLottie(options, style);

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-y-20">
			<p className="font-poppins text-6xl font-bold">Data Not Found</p>
			{View}
		</div>
	);
}

export default DataNotFound;
