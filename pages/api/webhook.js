export default async function handler(req, res) {
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Method not allowed' })
  // }

  // const token = req.headers['revalidation-token']?.toString()
  // if (token !== process.env.NEXT_REVALIDATION_STORYBLOK_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  console.log('this is webhook response', res)

  // try {
  //   await Promise.all([
  //     res.revalidate(`/users/${req.query.slug}`),
  //     res.revalidate(`/users/${req.query.slug}/products`),
  //   ])
  //   return res.status(200).send({ message: 'Revalidated' })
  // } catch (err) {
  //   return res.status(500).send({ message: 'Error revalidating' })
  // }

  return res.status(200).send({ message: 'Revalidated' })
}
