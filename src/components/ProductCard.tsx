import { useNavigate } from "react-router-dom";

import { truncateString } from "../utils/truncateString";

interface ProductCardProps {
	id: number;
	index: number;
	image: string;
	name: string;
	price: number;
}

function ProductCard({ id, index, image, name, price }: ProductCardProps) {
	const navigate = useNavigate();

	return (
		<div
			key={index}
			onClick={() => navigate(`/product/details/${id}`)}
			className="flex flex-col items-center gap-y-6 bg-white rounded-md p-4 font-poppins cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)] dark:drop-shadow-[0px_4px_4px_rgba(255,255,255,0.8)]"
		>
			<div className="rounded-md lg:h-56 lg:w-56 overflow-hidden">
				<img className="w-full h-full object-cover" src={image} alt={`${name} image`} />
			</div>
			<div className="flex flex-col gap-y-4">
				<p className="font-semibold text-xl text-black text-center">{truncateString(name, 18)}</p>
				<p className="text-black text-lg font-medium text-center">
					IDR {price.toLocaleString("id-ID")}
				</p>
			</div>
		</div>
	);
}

export default ProductCard;
