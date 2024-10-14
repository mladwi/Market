import { http } from "../../services/http";
import { IApi } from "./types";

export const Product = {
  List: () => http.get<IApi.Product.List.Response>("/products?limit=300"),
  Single: (productID: string) =>
    http.get<IApi.Product.Single.Response>(`/products/${productID}/`),
  Search: (query: string) =>
    http.get<IApi.Product.List.Response>(`/products/search/?q=${query}`),
  ByCategory: (categoryID: string) =>
    http.get<IApi.Product.List.Response>(`/products/category/${categoryID}/`),
};
