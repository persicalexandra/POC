import Image from "next/image"
import { useReducer, createContext, useState } from 'react';

import { useCartStore } from "../../store/useCartStore"

import { Product } from "@/types.d"

interface Props {
	product: Product
}

interface Action {
	type: string,
	payload: Product
}

function cartReducer(state: Product[], action: Action) {
	switch (action.type) {
		case 'add':
			return [...state, action.payload];
		case 'remove':
			return state.filter(item => item.id !== action.payload.id);
		default:
			return state;
	}
}

export const CartContext = createContext<Product[]>([]);

export default function ProductCard({ product }: Props) {
	const addToCart = useCartStore(state => state.add)

	const [cart, dispatch] = useReducer(cartReducer, []);

	const addItem = (item: Product) => {
		dispatch({ type: 'add', payload: item });
	}

	const removeItem = (item: Product) => {
		dispatch({ type: 'remove', payload: item });
	}

	return (
		<div className='bg-white rounded-md shadow-lg overflow-hidden hover:shadow-xl flex flex-col justify-between p-4 '>
			<Image
				src={product.images[0]}
				alt={product.title}
				width={100}
				height={100}
				className='object-contain w-full h-40'
			/>
			<div className='flex-1 flex flex-col justify-between'>
				<h2 className='text-lg font-semibold'>{product.title}</h2>
				<p className='text-gray-600 flex-1'>{product.description}</p>
				<div className='mt-4 flex items-center justify-between'>
					<span className='text-gray-800 font-semibold'>${product.price.toFixed(2)}</span>
					<button
						type='button'
						className='ml-2 bg-neutral-500 text-white font-semibold py-2 px-4 rounded hover:bg-neutral-700'
						onClick={() => addToCart(product, cart.length || 1)}
					>
						Add to Cart
					</button>
				</div>
				<div className='mt-4 flex items-center justify-between'>
					
					<button
							type='button'
							className='ml-2 bg-neutral-500 text-white font-semibold py-2 px-4 rounded hover:bg-neutral-700'
							onClick={() => addItem(product)}
						>
							+
						</button>
						<span> {cart?.length}</span>
						<button
							type='button'
							className='ml-2 bg-neutral-500 text-white font-semibold py-2 px-4 rounded hover:bg-neutral-700'
							onClick={() => removeItem(product)}
						>
							-
						</button>
				</div>
			</div>
		</div>
	)
};