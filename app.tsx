import React, { ComponentType } from 'https://esm.sh/react'
import { Head, useRouter } from 'https://deno.land/x/aleph/mod.ts'
import { Layout, siteTitle } from './components/layout.tsx'

export default function App({
  Page,
  pageProps
}: {
  Page: ComponentType<any>
  pageProps: any
}) {
  const router = useRouter()
  return (
    <Layout home={router.pagePath === '/'}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Page {...pageProps} />
    </Layout>
  )
}
