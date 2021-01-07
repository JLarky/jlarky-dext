import React from 'https://esm.sh/react'
import {
  Head,
  useDeno,
  Link,
  useRouter
} from 'https://deno.land/x/aleph/mod.ts'
import { getPostData, PostData } from '../../lib/posts.ts'
import Date from '../../components/date.tsx'

export default function Post({}) {
  const { params } = useRouter()

  const postData = useDeno(async () => await getPostData(params.id))

  const tags = []
  const [overrideHtml, setHtml] = React.useState('')
  const html = overrideHtml || postData.contentHtml

  const isDev = useDeno(() => Deno.env.get('__buildMode') === 'development')

  if (isDev) {
    React.useEffect(() => {
      const loop = async () => {
        const res = await fetch(`/api/getPostData?postId=${params.id}`)
        if (res.status == 200) {
          const { contentHtml: newHtml } = await res.json()
          if (html !== newHtml) {
            setHtml(newHtml)
          }
        }
        timer = setTimeout(loop, 1000)
      }
      let timer = setTimeout(loop, 1000)
      return () => {
        clearTimeout(timer)
      }
    }, [html])
  }

  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta key="og:title" name="og:title" content={postData.title} />
        {!!postData['og:image'] && (
          <meta
            key="og:image"
            property="og:image"
            content={postData['og:image']}
          />
        )}
      </Head>
      <article
        className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
        style={{ fontFamily: 'Georgia,serif' }}
      >
        <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
          {postData.title}
        </h1>
        <p className="font-sans text-sm md:text-base font-normal text-gray-600">
          Published <Date dateString={postData.date} />
        </p>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <div className="text-base md:text-sm text-gray-500 px-4 py-6">
        {!!tags.length && (
          <>
            Tags:{' '}
            <a
              href="#"
              className="text-base md:text-sm text-teal-500 no-underline hover:underline"
            >
              Link
            </a>{' '}
            .{' '}
            <a
              href="#"
              className="text-base md:text-sm text-teal-500 no-underline hover:underline"
            >
              Link
            </a>
          </>
        )}
      </div>
      {/*Divider*/}
      <hr className="mb-1 mx-4 border-gray-400 border-t-2" />
      <div className="flex w-full items-center font-sans px-4 py-12">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src="/images/profile.jpg"
          alt="Avatar of Author"
        />
        <div className="flex-1 px-2">
          <p className="text-base font-bold text-base md:text-xl leading-none mb-2">
            Yaroslav Lapin
          </p>
          <p className="text-gray-600 text-xs md:text-base">
            Senior Software Engineer at null since undefined
          </p>
        </div>
        <div className="justify-end">
          <Link to="/posts">
            <a className="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
              Read More
            </a>
          </Link>
        </div>
      </div>
      <hr className="mb-8 mx-4 border-gray-400 border-t-2" />
      {false && (
        <div className="font-sans flex justify-between content-center px-4 pb-12">
          <div className="text-left">
            <span className="text-xs md:text-sm font-normal text-gray-600">
              &lt; Previous Post
            </span>
            <br />
            <p>
              <a
                href="#"
                className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
              >
                Blog title
              </a>
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs md:text-sm font-normal text-gray-600">
              Next Post &gt;
            </span>
            <br />
            <p>
              <a
                href="#"
                className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
              >
                Blog title
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
