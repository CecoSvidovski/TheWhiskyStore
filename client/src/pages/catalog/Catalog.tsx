import { Product } from "../../models/product"
import ProductList from "./ProductList";

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog = ({products, addProduct}: Props) => (
  <>
    <ProductList products={products} />
  </>
)

export default Catalog;