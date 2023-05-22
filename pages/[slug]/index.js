import cn from 'clsx'
import { AddToCart } from 'components/add-to-cart'
import { Layout } from 'layouts/default'
import Shopify from 'lib/shopify'
import Image from 'next/image'
import s from './slug.module.scss'

export default function Pdp({ product }) {
  return (
    <Layout>
      <section className={cn('layout-grid', s.product)}>
        <div className={s.image}>
          <Image src={product.images[0].src} alt="" fill />
        </div>
        <AddToCart product={product}>
          <h1 className={s.name}>{product.name}</h1>
        </AddToCart>
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
  const product = await store.getProductByHandle(params.slug)

  return {
    props: {
      product: product,
    },
    revalidate: 1,
  }
}
