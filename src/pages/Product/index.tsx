import { useState, useEffect, useMemo, useCallback, ChangeEvent, MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
	Search28Filled,
	CaretDown24Filled,
	IosArrowLtr24Filled,
	IosArrowRtl24Filled,
} from "@fluentui/react-icons";

import { getAllProducts } from "../../utils/https/product";
import { Product, Meta } from "../../types/responses/product.response.type";
import { RootState } from "../../redux/store";
import useTitle from "../../utils/useTitle";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import DataNotFound from "../../components/DataNotFound";
import AddProduct from "../../components/AddProduct";

import "react-loading-skeleton/dist/skeleton.css";

function Product() {
	const role = useSelector((state: RootState) => state.auth.role);

	const controller = useMemo(() => new AbortController(), []);

	const [searchParams, setSearchParams] = useSearchParams();

	const [data, setData] = useState<Product[]>([]);
	const [meta, setMeta] = useState<Meta>({
		totalItems: 0,
		totalPages: 0,
		currentPage: 1,
		nextPage: null,
		previousPage: null,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState<string>("");
	const [groupBy, setGroupBy] = useState<string>("");
	const [sort, setSort] = useState<string>("");
	const [isAddProduct, setIsAddProduct] = useState(false);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const data = await getAllProducts(
				search || searchParams.get("search"),
				groupBy || searchParams.get("groupBy"),
				sort || searchParams.get("sort"),
				12,
				meta.currentPage || searchParams.get("page"),
				controller
			);
			setData(data.data.data.products);
			setMeta(data.data.data.meta);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}, [controller, search, groupBy, sort, meta.currentPage, searchParams]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleSearch = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setMeta((prevMeta) => ({
				...prevMeta,
				currentPage: 1,
			}));
			searchParams.delete("page");
			setSearch(event.target.value);
			searchParams.set("search", event.target.value);
			setSearchParams(searchParams, { replace: true });
		},
		[searchParams, setSearchParams]
	);

	const debouncedSearch = useMemo(() => debounce(handleSearch, 1000), [handleSearch]);

	const handleGroupBy = useCallback(
		(event: MouseEvent<HTMLSelectElement>) => {
			const target = event.target as HTMLSelectElement;
			setMeta((prevMeta) => ({
				...prevMeta,
				currentPage: 1,
			}));
			searchParams.delete("page");
			setGroupBy(target.value);
			searchParams.set("groupBy", target.value);
			setSearchParams(searchParams, { replace: true });
		},
		[searchParams, setSearchParams]
	);

	const handleSort = useCallback(
		(event: MouseEvent<HTMLSelectElement>) => {
			const target = event.target as HTMLSelectElement;
			setSort(target.value);
			searchParams.set("sort", target.value);
			setSearchParams(searchParams, { replace: true });
		},
		[searchParams, setSearchParams]
	);

	const handlePaginate = useCallback(
		(page: number, increase: number) => {
			const newPage = page + increase;
			setMeta((prevMeta) => ({
				...prevMeta,
				currentPage: newPage,
			}));
			searchParams.set("page", newPage.toString());
			setSearchParams(searchParams, { replace: true });
		},
		[searchParams, setSearchParams]
	);

	const onClose = () => {
		setIsAddProduct(false);
	}

	useTitle("Product");

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1 relative">
			<Header page="product" />
			<main className="min-h-screen flex flex-col gap-y-16 lg:px-40 md:px-10 px-5 py-16 bg-gradient-to-t from-[#DDDDDD] dark:from-[#4F4B4C] via-transparent to-transparent">
				<section className="search-and-sort select-none">
					<div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between font-poppins">
						<div>
							<div className="relative">
								<input
									type="text"
									placeholder="Search here..."
									onChange={debouncedSearch}
									className="border border-gray-300 w-full md:w-auto hover:border-gray-400 focus:border-gray-400 focus:outline-none appearance-none bg-white dark:bg-primary-black rounded-md h-10 pl-5 pr-10 duration-300"
								/>
								<Search28Filled className="absolute top-[6px] right-[10px] cursor-pointer" />
							</div>
						</div>
						<div className="flex md:flex-row flex-col gap-y-2 gap-x-4">
							<div>
								<div className="relative">
									<select
										className="border w-full md:w-auto border-gray-300 rounded-md h-10 pl-5 pr-10 bg-white dark:bg-primary-black hover:border-gray-400 focus:outline-none appearance-none duration-300"
										name="price-sort"
										id="price-sort"
										onClick={(event) => handleSort(event)}
									>
										<option value="">Sort price by</option>
										<option value="cheapest">Cheapest</option>
										<option value="priciest">Priciest</option>
									</select>
									<CaretDown24Filled className="absolute top-[7px] right-1 md:right-[5px] pointer-events-none" />
								</div>
							</div>
							<div>
								<div className="relative">
									<select
										className="border w-full md:w-auto border-gray-300 rounded-md h-10 pl-5 pr-10 bg-white dark:bg-primary-black hover:border-gray-400 focus:outline-none appearance-none duration-300"
										name="group-by"
										id="group-by"
										onClick={(event) => handleGroupBy(event)}
									>
										<option value="">Group by</option>
										<option value="snack">Snack</option>
										<option value="beverage">Beverage</option>
										<option value="spice">Spice</option>
										<option value="vegetable">Vegetable</option>
									</select>
									<CaretDown24Filled className="absolute top-[7px] right-1 md:right-[5px] pointer-events-none" />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section
					className={`product-list min-h-[1300px] w-full ${
						data.length &&
						"grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-3 gap-y-20 gap-x-8"
					}`}
				>
					{data.length && !isLoading ? (
						data.map((datum, index) => (
							<ProductCard
								id={datum.id}
								index={index}
								image={datum.image}
								name={datum.name}
								price={datum.price}
							/>
						))
					) : isLoading ? (
						<SkeletonTheme>
							{Array.from({ length: 12 }).map((_, index) => (
								<div
									key={index}
									className="flex flex-col items-center rounded-md cursor-pointer drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)] dark:drop-shadow-[0px_4px_4px_rgba(255,255,255,0.8)]"
								>
									<div className="h-full w-full">
										<Skeleton width={"100%"} height={"100%"} />
									</div>
								</div>
							))}
						</SkeletonTheme>
					) : (
						<DataNotFound />
					)}
				</section>
				<section className="pagination select-none">
					<div className="flex items-center justify-center gap-x-10">
						<button
							disabled={!meta.previousPage}
							onClick={() => handlePaginate(meta.currentPage - 1, 0)}
							className="group flex items-center bg-primary-red hover:bg-primary-red/70 disabled:bg-primary-red/50 disabled:cursor-not-allowed py-2 px-4 rounded duration-300"
						>
							<IosArrowLtr24Filled className="group-hover:-translate-x-2 group-disabled:translate-x-0 duration-300" />
							<p className="text-white font-semibold text-2xl">Prev</p>
						</button>
						<button
							disabled={!meta.nextPage}
							onClick={() => handlePaginate(meta.currentPage, 1)}
							className="group flex items-center bg-primary-red hover:bg-primary-red/70 disabled:bg-primary-red/50 disabled:cursor-not-allowed py-2 px-4 rounded duration-300"
						>
							<p className="text-white font-semibold text-2xl">Next</p>
							<IosArrowRtl24Filled className="group-hover:translate-x-2 group-disabled:translate-x-0 duration-300" />
						</button>
					</div>
				</section>
				{role === "admin" && (
					<section className="select-none">
						<button onClick={() => setIsAddProduct(true)} className="w-full py-4 rounded-md font-poppins text-2xl bg-primary-yellow hover:bg-primary-yellow/70 duration-300">Add product</button>
					</section>
				)}
			</main>
			<AddProduct isAddProduct={isAddProduct} onClose={onClose} />
			<Footer />
		</div>
	);
}

export default Product;
