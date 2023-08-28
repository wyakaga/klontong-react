export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	Category: {
		name: string;
	};
}

export interface Meta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
}


export interface ProductResponse {
	statusCode: number;
	message: string;
	data: {
		products: Product[];
		meta: Meta;
	};
}

export interface ProductDetail {
    id: number;
    categoryId: number;
    sku: string;
    name: string;
    description: string;
    weight: number;
    width: number;
    length: number;
    height: number;
    image: string;
    price: number;
    Category: {
      name: string;
    };
}

export interface ProductDetailResponse {
  statusCode: number;
  message: string;
  data: ProductDetail;
}
