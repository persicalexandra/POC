import { useEffect, useState, createContext, useContext, useRef } from "react"
import GET_PRODUCTS from '@/graphql/queries/getProducts';
import SEARCH_PRODUCTS from '@/graphql/queries/searchProducts'
import Header from "@/components/ui/Header"
import Drawer from "@/components/ui/Drawer"
import Cart from "@/components/minicart/Cart"
import ProductList from "@/components/products/ProductList"
import { useLazyQuery, useQuery } from '@apollo/client'

export type UserContextType = {
  user: string
};
export const UserContext = createContext<UserContextType | null>({user: "Persic Alexandra"});

export default function Home() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [productsList, setProductList] = useState([])
  const [searchValue, setSearchValue] = useState('')
	const { user } = useContext(UserContext) as UserContextType;

	const { data, loading, error } = useQuery(GET_PRODUCTS)
	const productsRef = useRef(null)

  const [getSearchedProducts] = useLazyQuery(SEARCH_PRODUCTS, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setProductList(data.searchProduct)
    },
		onError(error) {
				console.log(error)
		},
  })

	useEffect(() => {
    if (data) {
      setProductList(data.products)
      productsRef.current = data.products
    }
  }, [data])

	const handleCartIconClick = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}

	const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getSearchedProducts({
      variables: {
        value: searchValue
      }
    })
  };

  if (error) {
    console.error(error)
    return null
  }

	return (
		<>
			<Header onCartIconClick={handleCartIconClick} />
			<Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
			  <Cart />
			</Drawer>
			<main className='container mx-auto md:w-10/12 py-8 px-4 '>
				{loading ?   <div className='text-center text-lg'>Loading...</div> : 
				<div className='flex gap-6 flex-col'>
					<h1 className='text-3xl font-semibold mb-4'>Products for: {user}</h1>
					 <form onSubmit={handleSearch}>
						<div className='mt-4 flex '>
							<input
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								className='flex-auto w-4/5 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50'
							/>
							<button
								type='submit'
								className='ml-2 bg-neutral-800 text-white font-semibold py-2 px-4 rounded hover:bg-neutral-700 flex-1 w-1/5'>
								Search
							</button>
						</div>
						</form>
					
 					<ProductList products={productsList} />
				</div>
				}
			</main>
		</>
	)
}