import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getProduct } from "../../utils/https/product";
import { RootState } from "../../redux/store";
import { ProductDetail } from "../../types/responses/product.response.type";
import useTitle from "../../utils/useTitle";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function ProductDetail() {
	const token = useSelector((state: RootState) => state.auth.token);

	const controller = useMemo(() => new AbortController(), []);

	const { id } = useParams();

	const [data, setData] = useState<ProductDetail>({
		id: 0,
		categoryId: 0,
		sku: "",
		name: "",
		description: "",
		weight: 0,
		width: 0,
		length: 0,
		height: 0,
		image: "",
		price: 0,
		Category: {
			name: "",
		},
	});
	const [label, setLabel] = useState("Description");

	const fetchData = useCallback(async () => {
		try {
			const data = await getProduct(id, token, controller);
			setData(data.data.data);
		} catch (error) {
			console.log(error);
		}
	}, [id, token, controller]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleTab = (labelData: string) => {
		setLabel(labelData);
	};

	const TABS = [{ label: "Description" }, { label: "Detail" }];

	useTitle(data.name);

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1 relative">
			<Header page="product" />
			<main className="min-h-screen flex lg:flex-row flex-col gap-y-16 gap-x-16 lg:px-40 md:px-10 px-5 py-16 bg-gradient-to-t from-[#DDDDDD] dark:from-[#4F4B4C] via-transparent to-transparent">
				<section className="img-holder lg:w-1/2">
					<div className="rounded-md w-full h-full overflow-hidden">
						<img
							src={data.image}
							alt={`${data.name} picture`}
							className="w-full h-full object-cover"
						/>
					</div>
				</section>
				<section className="flex flex-col gap-y-8 lg:w-1/2">
					<div className="name-and-price flex flex-col gap-y-6">
						<p className="font-poppins font-black md:text-6xl text-4xl text-center">{data.name}</p>
						<p className="font-inter font-bold md:text-4xl text-3xl text-center">
							IDR {data.price.toLocaleString("id-ID")}
						</p>
					</div>
					<div className="details flex flex-col gap-y-16 font-inter">
						<div className="tabs grid grid-cols-2">
							{TABS.map((tab, index) => {
								return (
									<div
										key={index}
										onClick={() => handleTab(tab.label)}
										className={`flex justify-center items-center bg-primary-yellow hover:bg-primary-yellow/70 text-primary-black border-b dark:border-b-neutral-700 ${
											tab.label === "Description" ? "border-y border-x rounded-l-md" : "border-y border-r rounded-r-md"
										} cursor-pointer duration-300`}
									>
										<div className="flex justify-center items-center p-4">
											<p className="font-medium">{tab.label}</p>
										</div>
									</div>
								);
							})}
						</div>
						{label === "Description" ? (
							<div className="">
								<p>{data.description}</p>
							</div>
						) : (
							<div className="grid grid-rows-6 gap-y-4">
								<div className="grid grid-cols-2">
									<p>SKU</p>
									<p>{`: ${data.sku}`}</p>
								</div>
								<div className="grid grid-cols-2">
									<p>Width</p>
									<p>{`: ${data.width}`} cm</p>
								</div>
								<div className="grid grid-cols-2">
									<p>Height</p>
									<p>{`: ${data.weight}`} cm</p>
								</div>
								<div className="grid grid-cols-2">
									<p>Length</p>
									<p>{`: ${data.length}`} cm</p>
								</div>
								<div className="grid grid-cols-2">
									<p>Weight</p>
									<p>{`: ${data.weight}`} gram</p>
								</div>
								<div className="grid grid-cols-2">
									<p>Category</p>
									<p>{`: ${data.Category.name.charAt(0).toUpperCase()}${data.Category.name.slice(
										1
									)}`}</p>
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default ProductDetail;
