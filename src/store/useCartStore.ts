import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "../types"
import { useMemo } from 'react'

interface State {
	cart: Product[]
	count: number
	totalPrice: number
}

interface Actions {
	add: (Item: Product, ItemsCount: number) => void
	remove: (Item: Product) => void
}

const INITIAL_STATE: State = {
	cart: [],
	count: 0,
	totalPrice: 0,
}


export const useCartStore = create(
	persist<State & Actions>(
		(set, get) => ({
			cart: [],
			count: INITIAL_STATE.count,
			totalPrice: INITIAL_STATE.totalPrice,
			add: (product: Product, ItemsCount=1) => {
				const cart = get().cart
				const cartItem = cart.find(item => item.id === product.id)   

				if (cartItem) {
					const updatedCart = cart.map(item =>
						item.id === product.id ? { ...item, quantity: (item.quantity as number) + ItemsCount} : item
					)
					set(state => ({
						cart: updatedCart,
						count: state.count,
						totalPrice: state.totalPrice + product.price,
					}))
				} else {
					const updatedCart = [...cart, { ...product, quantity: ItemsCount }]
					set(state => ({
						cart: updatedCart,
						count: state.count,
						totalPrice: state.totalPrice + product.price,
					}))
				}
			},
			remove: (product: Product) => {
				set(state => ({
					cart: state.cart.filter(item => item.id !== product.id),
					count: state.count - 1,
					totalPrice: state.totalPrice - product.price,
				}))
			},
		}),
		{
			name: "cart-storage",
		}
	)
)