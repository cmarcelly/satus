import cn from 'clsx'
import { useCart } from 'hooks/use-cart'
import { useStore } from 'lib/store'
import { useState } from 'react'
import s from './add-to-cart.module.scss'

export const AddToCart = ({ children, product }) => {
  const setToggleCart = useStore((state) => state.setToggleCart)
  const cart = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)

  return (
    <div className={s.properties}>
      {children && children}
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
                    selectedVariant && selectedVariant.size === variant.size,
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
  )
}
