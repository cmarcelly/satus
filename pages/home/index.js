import { Layout } from 'layouts/default'
import s from './home.module.scss'

export default function Home() {
  return (
    <Layout theme="light">
      <section className={s.content}>
        <h1 className={s.title}>satus</h1>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const storyBlokVars = {
    slug: 'cdn/stories/pages/homepage',
    params: {
      version: 'draft',
      resolve_relations: ['headers.header', 'footers.footer'],
    },
  }

  let { data } = await getStoryblokApi().get(
    `${storyBlokVars.slug}`,
    storyBlokVars.params
  )

  return {
    props: {
      id: 'home',
      pageData: data.story,
    },
    revalidate: 30,
  }
}
