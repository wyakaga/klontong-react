import { useState, useEffect, useMemo, useCallback } from "react";

import { getAllProducts } from "../../utils/https/product";
import { truncateString } from "../../utils/truncateString";
import { Product } from "../../types/responses/product.response.type";
import useTitle from "../../utils/useTitle";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Home() {
	const controller = useMemo(() => new AbortController(), []);

	const [data, setData] = useState<Product[]>([]);

	const fetchData = useCallback(async () => {
		try {
			const data = await getAllProducts("", "", "", 4, 1, controller);
			setData(data.data.data.products);
		} catch (error) {
			console.log(error);
		}
	}, [controller]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useTitle("Klontong: Find the Best Deals Here! ")

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1 relative">
      <Header page="home" />
			<main className="flex flex-col">
				<section className="hero hero-bg bg-no-repeat bg-cover bg-center lg:p-40 md:p-10 p-5 gap-12 md:h-screen min-h-screen">
					<div className="hero-desc flex flex-col md:gap-10">
						<p className="font-poppins font-bold text-white text-[3.125rem]">
							Welcome to Klontong
							<br />
							Find the Best Deals Here!
						</p>
						<p className="font-poppins font-bold text-white text-xl">
							Come and experience the best shopping at our store.
							<br />
							We can't wait to serve you and provide you with exceptional products and deals.
						</p>
					</div>
				</section>
				<section className="product-showcase flex flex-col justify-center gap-y-16 lg:p-40 md:p-10 p-5 bg-gradient-to-t from-[#DDDDDD] dark:from-[#4F4B4C] via-transparent to-transparent">
					<div className="showcase-title flex items-center justify-center">
						<p className="font-inter font-bold text-[2.1875rem] text-black dark:text-white">
							Here are people's favourite
						</p>
					</div>
					<div className="lg:flex lg:flex-row md:grid md:grid-cols-2 flex flex-col lg:gap-x-24 gap-10 lg:items-center lg:justify-center">
						{data.map((datum, index) => (
							<div
								key={index}
								className="flex flex-col gap-y-6 bg-white rounded-md p-2 pb-6 font-poppins drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)] dark:drop-shadow-[0px_4px_4px_rgba(255,255,255,0.8)]"
							>
								<div className="rounded-md lg:h-52 lg:w-52 overflow-hidden">
									<img
										className="w-full h-full object-cover"
										src={datum.image}
										alt={`${datum.name} image`}
									/>
								</div>
								<div className="flex flex-col gap-y-4">
									<p className="font-medium text-lg text-black text-center">
										{truncateString(datum.name, 18)}
									</p>
									<p className="text-black text-center">
										IDR {datum.price.toLocaleString("id-ID")}
									</p>
								</div>
								<button className="bg-primary-yellow hover:bg-primary-yellow/70 text-primary-black font-bold py-2 px-4 rounded-full duration-300">
									Find More
								</button>
							</div>
						))}
					</div>
				</section>
			</main>
      <Footer />
		</div>
	);
}

export default Home;
