import { AxiosResponse } from "axios";

import api from "./base";
import { ControllerType } from "../../types/controller.type";
import {
	ProductResponse,
	ProductDetailResponse,
} from "../../types/responses/product.response.type";

export const getAllProducts = (
	search: string | null,
	groupBy: string | null,
	order: string | null,
	limit: number,
	page: number | string | null = 1,
	controller: ControllerType
): Promise<AxiosResponse<ProductResponse>> => {
	let url: string = "/products";

	if (groupBy) {
		url += `?groupBy=${groupBy}`;
	}

	if (order) {
		url += `${groupBy ? "&" : "?"}order=${order}`;
	}

	if (search) {
		url += `${groupBy || order ? "&" : "?"}search=${search}`;
	}

	if (limit) {
		url += `${groupBy || order || search ? "&" : "?"}limit=${limit}`;
	}

	if (page) {
		url += `${groupBy || order || search || limit ? "&" : "?"}page=${page}`;
	}

	const config = { signal: controller.signal };

	return api.get(url, config);
};

export const getProduct = (
	id: string | undefined,
	token: string | null,
	controller: ControllerType
): Promise<AxiosResponse<ProductDetailResponse>> => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
		signal: controller.signal,
	};

	return api.get(`products/${id}`, config);
};

export const addProduct = (
	image: File | null,
	categoryId: number,
	name: string,
	description: string,
	weight: number,
	width: number,
	length: number,
	height: number,
	price: number,
	token: string,
	controller: ControllerType
) => {
	const body = new FormData();
	if (image) {
		body.append("image", image);
	}
	body.append("categoryId", String(categoryId));
	body.append("name", name);
	body.append("description", description);
	body.append("weight", String(weight));
	body.append("width", String(width));
	body.append("length", String(length));
	body.append("height", String(height));
	body.append("price", String(price));

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data",
		},
		signal: controller.signal,
	};

	return api.post("products", body, config);
};
