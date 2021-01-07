export default async () => {
  const posts = [{ id: 'a-thorough-introduction-to-paseto' }]
  return {
    exclude: ['posts/[id]'],
    ssr: {
      staticPaths: posts.map(({ id }) => `/posts/${id}`)
    }
  }
}
