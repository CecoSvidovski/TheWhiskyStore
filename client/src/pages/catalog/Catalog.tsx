import { Product } from "../../models/product"

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog = ({products, addProduct}: Props) => (
  <>
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name} - {product.price}</li>
      ))}
    </ul>
  </>
)

export default Catalog;