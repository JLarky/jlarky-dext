import { Head, useDeno, Link } from 'https://deno.land/x/aleph/mod.ts'
import React, { ComponentType } from 'https://esm.sh/react'

import { siteTitle } from '../components/layout.tsx'

import { getSortedPostsData, SortedPostsData } from '../lib/posts.ts'
import Date from '../components/date.tsx'

type Props = { allPostsData: SortedPostsData }

export function Blog({
  //
  Page
}: {
  Page?: ComponentType<any>
  pageProps?: {}
}) {
  const allPostsData = useDeno(async () =>
    Page ? [] : await getSortedPostsData()
  )

  return (
    <>
      <Head>
        <title>{siteTitle} &gt; Blog</title>
      </Head>
      {Page ? <Page /> : <BlogPosts allPostsData={allPostsData} />}
      <div className="py-6"> </div>
    </>
  )
}

export const BlogPosts: React.FC<Props> = ({ allPostsData }) => {
  return (
    <section
      className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
      style={{ fontFamily: 'Georgia,serif' }}
    >
      <h2 className="py-4 text-2xl font-bold">Blog</h2>
      <ul className="">
        {allPostsData.map(({ id, date, title }) => (
          <li className="" key={id}>
            <Link to={`/posts/${id}`}>
              <a className="underline">{title}</a>
            </Link>
            <br />
            <small className="">
              <Date dateString={date} format="LLLL d, yyyy" />
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Blog
