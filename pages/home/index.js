import { Image } from '@studio-freight/compono'
import cn from 'clsx'
import { Layout } from 'layouts/default'
import Shopify from 'lib/shopify'
import s from './home.module.scss'

export default function Home({ productsArray }) {
  return (
    <Layout>
      <section className={s.hero}>
        <h1 className={s.title}>Shopify Starter</h1>
      </section>
      <section>
        <div className={cn('layout-grid', s['product-grid'])}>
          {productsArray.map((product, key) => (
            <a key={`product-${key}`} href={`/${product.slug}`}>
              <div className={s.image}>
                <Image
                  src={product.images[0].src}
                  alt=""
                  layout="fill"
                  priority
                />
              </div>
              <p className={s['product-name']}>{product.name}</p>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const store = new Shopify()
  const productsArray = await store.getAllProducts('active')

  return {
    props: {
      productsArray: [
        ...productsArray,
        ...productsArray,
        ...productsArray,
        ...productsArray,
      ],
    },
    revalidate: 1,
  }
}
