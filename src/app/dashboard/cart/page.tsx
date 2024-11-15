import WidgetItem from '@/components/WidgetItem';
import { Product, products } from '@/products/data/products.data'
import { ItemCard } from '@/shopping-cart';
import { cookies } from 'next/headers'
import React from 'react'

export const metadata = {
    title: "Carrito de Compras",
    description: "Carrito de compras"
}

interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
    const productsInCart: ProductInCart[] = []
    for (const id of Object.keys(cart)) {
        const product = products.find(p => p.id === id)
        if (product) {
            productsInCart.push({ product, quantity: cart[id] })
        }
    }
    return productsInCart
}

const CartPage = () => {
    const cookiesStore = cookies()
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as { [id: string]: number }
    console.log(cart)
    const products = getProductsInCart(cart)
    const totalToPay = products.reduce((prevVal, currentVal) => (currentVal.product.price * currentVal.quantity)  + prevVal, 0)

    return (
        <div>
            <h1 className='text-5xl'>Productos en el carrito</h1>
            <hr className='mb-2' />
            <div className='flex flex-col sm:flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 w-full sm:w-8/12'>
                    {
                        products.map(({product, quantity}) => (<ItemCard key={product.id} product={product} quantity={quantity}/>))
                    }
                </div>
                <div className='flex flex-col w-full sm:w-4/12'>
                    <WidgetItem title='Total a pagar'>
                        <div className='mt2 flex justify-center gap-4'>
                            <h3 className='text-3xl text-gray-700 font-bold'>Total: ${(totalToPay * 1.15).toFixed(2)}</h3>
                        </div>
                        <span className='font-bold text-center text-gray-500'>Impuestos: 15% ${(totalToPay * 0.15).toFixed(2)}</span>
                    </WidgetItem>
                </div>
            </div>
        </div>
    )
}

export default CartPage
