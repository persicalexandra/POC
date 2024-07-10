import ProductCard from "./ProductCard"
import { Product } from "@/types.d"


interface Props {
	products: Product[]
}


export default function ProductList({ products }: Props) {
	return (
		products.length ? (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>): (
			<div>No results found</div>
		)
	)
}