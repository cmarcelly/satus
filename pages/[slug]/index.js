import cn from 'clsx'
import { useCart } from 'hooks/use-cart'
import { Layout } from 'layouts/default'
import Shopify from 'lib/shopify'
import { useStore } from 'lib/store'
import Image from 'next/image'
import { useState } from 'react'
import s from './slug.module.scss'

export default function Pdp({ product }) {
  const setToggleCart = useStore((state) => state.setToggleCart)
  const cart = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)

  return (
    <Layout>
      <section className={cn('layout-grid', s.product)}>
        <div className={s.image}>
          <Image src={product.images[0].src} alt="" layout="fill" />
        </div>
        <div className={s.properties}>
          <h1 className={s.name}>{product.name}</h1>
          <div className={s.details}>
            <p className={s.price}>{`price: ${product.price}`}</p>
            <div className={s.variants}>
              <p className="text-uppercase">size: view guide</p>
              <div className={s.options}>
                {product.variants.map((variant, key) => (
                  <button
                    key={`variant-${key}`}
                    onClick={() => {
                      setSelectedVariant(variant)
                    }}
                    className={cn({
                      [s['selected-option']]:
                        selectedVariant &&
                        selectedVariant.size === variant.size,
                      [s['button-disabled']]: !variant.isAvailable,
                    })}
                  >
                    <p>{variant.size}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={s.editable}>
            <div className={s.options}>
              <div
                className={cn(s.quantity, {
                  [s['button-disabled']]: !selectedVariant.size,
                })}
              >
                <button
                  onClick={() => {
                    setPurchaseQuantity(Math.max(purchaseQuantity - 1, 1))
                  }}
                >
                  -
                </button>
                <p>{purchaseQuantity}</p>
                <button
                  className={cn({
                    [s['button-disabled']]:
                      purchaseQuantity === selectedVariant.availableQuantity,
                  })}
                  onClick={() => {
                    setPurchaseQuantity(
                      Math.min(
                        purchaseQuantity + 1,
                        selectedVariant.availableQuantity
                      )
                    )
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className={cn(s['add-cart'], {
                [s['button-disabled']]: !selectedVariant.size,
              })}
              onClick={async () => {
                await cart.utils.addItemUI({
                  merchandiseId: selectedVariant.id,
                  quantity: purchaseQuantity,
                })
                setToggleCart(true)
              }}
            >
              Add To Cart
            </button>
          </div>
          <p className={s.description}>{product.description}</p>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const store = new Shopify()
  const products = await store.getAllProducts('active')

  const paths = products.map((item) => ({
    params: { slug: item.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const store = new Shopify()
  // If you need just the selected product:
  // const product = await store.getProductByHandle(params.slug)

  //If you need product & others products:
  const products = await store.getAllProducts('active')
  const getIndex = products.findIndex((product) => product.slug === params.slug)
  const product = products[getIndex]
  products.splice(getIndex, 1)

  return {
    props: {
      product: product,
      relatedProducts: products,
    },
    revalidate: 1,
  }
}
