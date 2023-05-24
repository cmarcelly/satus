import { Layout } from 'layouts/default'
import Shopify from 'lib/shopify'

export default function Home() {
  return (
    <Layout>
      <h1>satus</h1>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const store = new Shopify()
  const productsArray = await store.getAllProducts('active')

  return {
    props: {
      productsArray: productsArray,
    },
    revalidate: 1,
  }
}
