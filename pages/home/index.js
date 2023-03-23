import { useMediaQuery } from '@studio-freight/hamo'
import { Layout } from 'layouts/default'
import dynamic from 'next/dynamic'
import s from './home.module.scss'

const WebGL = dynamic(
  () => import('components/webgl').then(({ WebGL }) => WebGL),
  { ssr: false }
)

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 800px)')

  return (
    <>
      {isDesktop === true && <WebGL />}
      <Layout theme="light">
        <section className={s.hero}>satus + r3f</section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}
