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
            </div>
        </div>
    )
}

export default CartPage
