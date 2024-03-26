export interface Product {
 id: number
 title: string
 description: string
 price: number
 discountPercentage: number
 rating: number
 stock: number
 brand: string
 category: string
 thumbnail: string
 images: string[]
 quantity?: number
}

interface State {
	cart: Product[]
	count: number
	totalPrice: number
}

interface Actions {
  add: (product: Product) => void,
  remove: (product: Product) => void,
}
