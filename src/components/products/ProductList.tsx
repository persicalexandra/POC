import ProductCard from "./ProductCard"
import SearchBar from "./SearchBar";
import { useContext, useState } from 'react';

import { Product } from "@/types.d"

import { UserContextType, UserContext } from "@/pages/index";

interface Props {
	products: Product[]
}


export default function ProductList({ products }: Props) {
  const { user } = useContext(UserContext) as UserContextType;

  const [productsList, setProductsList] = useState(products);

  const searchProducts = (searchText: string) => {
    const productResults = products.filter((p)=> p.title.toLowerCase().includes(searchText.toLowerCase()));
    setProductsList(productResults);
  }

	return (
		<>
			<h1 className='text-3xl font-semibold mb-4'>Products for: {user}</h1>
      <div>
      </div>
      <div className="mt-6 mb-6">
        <SearchBar onSearch={searchProducts}></SearchBar>
      </div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{productsList.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	)
}