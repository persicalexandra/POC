import CartItem from "./CartItem"
import { useMemo, useLayoutEffect, useState, useRef } from "react"

import { useCartStore } from "@/store/useCartStore"

import useFromStore from "@/hooks/useFromStore"

function Cart() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const boxRef = useRef({} as HTMLUListElement);
	const cart = useFromStore(useCartStore, state => state.cart)
  const totalPrice = useMemo(() => cart?.reduce((acc, product) => acc + product.price * (product.quantity as number), 0), [cart]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(boxRef?.current?.clientWidth);
      setHeight(boxRef?.current?.clientHeight);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

	return (
		<section>
			<h3 className='text-2xl font-bold mb-4'>My Cart</h3>
			<ul ref={boxRef}>
				{cart?.map(product => (
					<CartItem key={product.id} product={product} />
				))}
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
			</ul>
			<div className='flex justify-between items-center mt-4'>
				<span className='text-lg font-bold'>Total:</span>
				<span className='text-xl font-bold'>${totalPrice?.toFixed(2)}</span>
			</div>
		</section>
	)
}

export default Cart