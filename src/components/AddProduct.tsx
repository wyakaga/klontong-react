import { useState, useMemo, ChangeEvent, FormEvent, MouseEvent, Fragment } from "react";
import { useSelector } from "react-redux";
import { Transition, Dialog } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import { CameraAdd48Filled, CaretDown24Regular } from "@fluentui/react-icons/lib/fonts";

import { addProduct } from "../utils/https/product";
import { RootState } from "../redux/store";

import "react-toastify/dist/ReactToastify.css";

import productPlaceholder from "../assets/product-placeholder.webp";

interface AddProductProps {
	isAddProduct: boolean;
	onClose: () => void;
}

function AddProduct({ isAddProduct, onClose }: AddProductProps) {
	const token = useSelector((state: RootState) => state.auth.token);

	const controller = useMemo(() => new AbortController(), []);

	const [imagePreview, setImagePreview] = useState<null | string>(null);
	const [image, setImage] = useState<null | File>(null);
	const [categoryId, setCategoryId] = useState(0);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [weight, setWeight] = useState(0);
	const [width, setWidth] = useState(0);
	const [length, setLength] = useState(0);
	const [height, setHeight] = useState(0);
	const [price, setPrice] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const handleButtonClick = (): void => {
		const inputField = document.querySelector(".input-field") as HTMLInputElement;
		inputField.click();
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const isValidFileUploaded = (file: File): boolean => {
			const validExtensions = ["png", "jpeg", "jpg", "webp"];
			const fileExtension = file.type.split("/")[1];
			return validExtensions.includes(fileExtension);
		};

		const maxSize = 2 * 1024 * 1024;

		const { files } = event.target;

		if (!files || files.length === 0) {
			return;
		}

		if (!isValidFileUploaded(files[0])) {
			event.target.value = "";
			toast.error("File should be in PNG, JPEG, JPG or WEBP!", {
				autoClose: 4000,
				position: "top-left",
			});
			return;
		}

		if (files[0].size > maxSize) {
			event.target.value = "";
			toast.error("File exceeds maximum size", {
				autoClose: 4000,
				position: "top-left",
			});
			return;
		}

		setImage(files[0]);
		setImagePreview(URL.createObjectURL(files[0]));
		event.target.value = "";
	};

	const handleCategory = (event: MouseEvent<HTMLSelectElement>): void => {
		const target = event.target as HTMLSelectElement;
		setCategoryId(parseInt(target.value));
	};

	const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
		setName(event.target.value);
	};

	const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
		setDescription(event.target.value);
	};

	const handleWeight = (event: ChangeEvent<HTMLInputElement>): void => {
		setWeight(parseInt(event.target.value));
	};

	const handleWidth = (event: ChangeEvent<HTMLInputElement>): void => {
		setWidth(parseInt(event.target.value));
	};

	const handleLength = (event: ChangeEvent<HTMLInputElement>): void => {
		setLength(parseInt(event.target.value));
	};

	const handleHeight = (event: ChangeEvent<HTMLInputElement>): void => {
		setHeight(parseInt(event.target.value));
	};

	const handlePrice = (event: ChangeEvent<HTMLInputElement>): void => {
		setPrice(parseInt(event.target.value));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!image) {
			return toast.error("Image is required!", { position: "top-left" });
		}

		if (!categoryId) {
			return toast.error("Category is required!", { position: "top-left" });
		}

		if (!name) {
			return toast.error("Name is required!", { position: "top-left" });
		}

		if (!description) {
			return toast.error("Description is required!", { position: "top-left" });
		}

		if (!weight) {
			return toast.error("Weight is required!", { position: "top-left" });
		}

		if (!width) {
			return toast.error("Width is required!", { position: "top-left" });
		}

		if (!length) {
			return toast.error("Length is required!", { position: "top-left" });
		}

		if (!height) {
			return toast.error("Heigth is required!", { position: "top-left" });
		}

		if (!price) {
			return toast.error("Price is required!", { position: "top-left" });
		}

		try {
			setIsLoading(true);
			await addProduct(
				image,
				categoryId,
				name,
				description,
				weight,
				width,
				length,
				height,
				price,
				token,
				controller
			);
			toast.success("Successfully added product!", { position: "top-left" });
			setIsLoading(false);
			onClose();
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return (
		<>
			<Transition appear show={isAddProduct} as={Fragment}>
				<Dialog as="div" onClose={onClose} className={`relative z-[11]`}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed bg-white/40 backdrop-filter backdrop-blur-md inset-0 overflow-y-auto" />
					</Transition.Child>
					<div className="fixed inset-0">
						<div className="flex items-center justify-center min-h-screen">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="bg-white overflow-y-auto lg:h-[45rem] h-[29rem] w-11/12 md:w-3/4 lg:w-1/2 md:p-16 p-4 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] text-center z-[12] relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
									<div className="flex flex-col items-center gap-y-10">
										<div className="relative h-48 w-48 select-none">
											<img
												src={imagePreview ? imagePreview : productPlaceholder}
												alt="add new product image"
												className="w-full h-full rounded-full object-cover object-center"
											/>
											<CameraAdd48Filled
												onClick={handleButtonClick}
												className="absolute bottom-0 right-3 text-black cursor-pointer"
											/>
											<input
												onChange={(event) => handleImageChange(event)}
												type="file"
												className="input-field"
												hidden
												accept="image/png, image/jpg, image/jpeg, image/webp"
											/>
										</div>

										<form
											onSubmit={(event) => handleSubmit(event)}
											className="flex flex-col font-poppins text-black gap-y-6 w-full"
										>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="category" className="font-medium text-lg">
													Category :
												</label>
												<div>
													<div className="relative">
														<select
															className="border w-full md:w-auto border-gray-300 rounded-md h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none duration-300"
															name="category"
															id="category"
															onClick={(event) => handleCategory(event)}
														>
															<option>Category</option>
															<option value={1}>Snack</option>
															<option value={2}>Beverage</option>
															<option value={3}>Spice</option>
															<option value={4}>Vegetable</option>
														</select>
														<CaretDown24Regular className="absolute top-[7px] right-1 md:right-[5px] text-black pointer-events-none" />
													</div>
												</div>
											</div>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="name" className="font-medium text-lg">
													Name :
												</label>
												<input
													onChange={(event) => handleName(event)}
													type="text"
													name="name"
													id="name"
													className="outline-0 bg-transparent border-b-2 border-b-neutral-400 w-full duration-300"
												/>
											</div>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="description" className="font-medium text-lg">
													Description :
												</label>
												<textarea
													onChange={(event) => handleDescription(event)}
													name="description"
													id="description"
													cols={10}
													rows={5}
													className="h-10 outline-0 bg-transparent border-b-2 border-b-neutral-400 w-full duration-300 resize-none overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
												></textarea>
											</div>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="weight" className="font-medium text-lg">
													Weight :
												</label>
												<input
													onChange={(event) => handleWeight(event)}
													type="number"
													name="weight"
													id="weight"
													className="outline-0 bg-transparent border-b-2 border-b-neutral-400 font-poppins w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300"
												/>
											</div>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="width" className="font-medium text-lg">
													Width :
												</label>
												<input
													onChange={(event) => handleWidth(event)}
													type="number"
													name="width"
													id="width"
													className="outline-0 bg-transparent border-b-2 border-b-neutral-400 font-poppins w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300"
												/>
											</div>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="length" className="font-medium text-lg">
													Length :
												</label>
												<input
													onChange={(event) => handleLength(event)}
													type="number"
													name="length"
													id="length"
													className="outline-0 bg-transparent border-b-2 border-b-neutral-400 font-poppins w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300"
												/>
											</div>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="height" className="font-medium text-lg">
													Height :
												</label>
												<input
													onChange={(event) => handleHeight(event)}
													type="number"
													name="height"
													id="height"
													className="outline-0 bg-transparent border-b-2 border-b-neutral-400 font-poppins w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300"
												/>
											</div>
											<div className="flex flex-col items-start gap-y-3">
												<label htmlFor="price" className="font-medium text-lg">
													Price :
												</label>
												<input
													onChange={(event) => handlePrice(event)}
													type="number"
													name="price"
													id="price"
													className="outline-0 bg-transparent border-b-2 border-b-neutral-400 font-poppins w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none duration-300"
												/>
											</div>
											<div className="w-full font-semibold text-lg">
												<button
													disabled={isLoading}
													className="w-full p-3 rounded-md disabled:cursor-not-allowed bg-primary-yellow hover:bg-primary-yellow/70 duration-300"
												>
													Add product
												</button>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
						<ToastContainer />
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default AddProduct;
