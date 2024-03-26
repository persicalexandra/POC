import { FiShoppingCart } from "react-icons/fi"
import { useContext } from 'react';

import { useCartStore } from "../../store/useCartStore"

import useFromStore from "@/hooks/useFromStore"
import { UserContextType, UserContext } from "@/pages/index";

interface Props {
	onCartIconClick: () => void
}

export default function Header({ onCartIconClick }: Props) {
	const cart = useFromStore(useCartStore, state => state.cart)
  const { user } = useContext(UserContext) as UserContextType;
  

	return (
		<header className='bg-amber-300 text-gray py-4 flex items-center justify-between h-14 sticky top-0 z-10'>
			<nav className='container mx-auto md:w-10/12 px-4 flex justify-between'>
				<span className='text-lg font-semibold'>Hook POC {user}</span>
				<div className='relative'>
					<button
						type='button'
						title='Mini Cart'
						className='text-gray text-xl flex items-center'
						onClick={onCartIconClick}
					>
						<FiShoppingCart />
						<div className='text-white rounded-full bg-neutral-500 w-5 h-5 text-sm -ml-1'>{cart?.length}</div>
					</button>
				</div>
			</nav>
		</header>
	)
}