import axios from "axios";
import { Product } from "./Product.interface";

const ProductApi = axios.create({
    baseURL: "http://localhost:5000"
});

export const getProduct = () => {
    const res = ProductApi.get('/products');

    return res;
}
export const createProduct = (product: Product) => {
    return ProductApi.post('/products', product);
};

export const deleteProduct = (id: number) => {
    return ProductApi.delete(`/products/${id}`);
}