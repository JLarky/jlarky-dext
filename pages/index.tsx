import { Link, useDeno } from 'https://deno.land/x/aleph/mod.ts'
import React, { useState } from 'https://esm.sh/react'

import { getSortedPostsData } from '../lib/posts.ts'

import { BlogPosts } from './posts.tsx'

export default function Home() {
  const allPostsData = useDeno(async () => await getSortedPostsData())
  console.log(allPostsData)

  return (
    <>
      <section
        className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
        style={{ fontFamily: 'Georgia,serif' }}
      >
        <p>
          My name is{' '}
          <Link to="/contacts">
            <a className="text-gray-900">Yaroslav Lapin</a>
          </Link>
          , I do things on the internet. There’re few outdated pages about me
          and now I'm adding one more!
        </p>
      </section>
      <BlogPosts allPostsData={allPostsData} />
      <div className="py-6"> </div>
    </>
  )
}
