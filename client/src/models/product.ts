export interface Product {
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  type?: string;
  brand: string;
  quantityInStock: number;
  age?: number;
  description?: string;
}

export interface ProductParams {
  orderBy: string;
  search?: string;
  types: string[];
  brands: string[];
  ages: string[];
  pageIndex: number;
  pageSize: number;

}