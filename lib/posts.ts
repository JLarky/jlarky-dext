import { walk } from 'https://deno.land/std@0.83.0/fs/mod.ts'
import {
  relative,
  basename,
  join
} from 'https://deno.land/std@0.83.0/path/mod.ts'

import matter from 'https://jspm.dev/gray-matter' // esm.sh and skypack.dev crash because of `fs`
import remark from 'https://esm.sh/remark'
import html from 'https://esm.sh/remark-html'

type MatterData = {
  date: string
  title: string
  'og:image'?: string
}

type MatterDataWithId = MatterData & { id: string }

export async function getSortedPostsData() {
  // Get file names under /posts
  let allPostsData: MatterDataWithId[] = []

  for await (const entry of walk('./posts', {
    exts: ['.md'],
    includeDirs: false
  })) {
    const fileName = entry.path
    // Remove ".md" from file name to get id
    const id = basename(fileName).replace(/\.md$/, '')

    // Read markdown file as string
    const fileContents = await Deno.readTextFile(fileName)

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    allPostsData.push({ id, ...matterResult.data })
  }

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(id: string) {
  const filename = `${id}.md`
  const filePath = join('./posts', filename)
  if (relative(filePath, './posts/test') !== '../test') {
    // that most likely means security attack of trying to pass relative path in `id`
    throw new Error('oopsie poopsie')
  }
  const fileContents = await Deno.readTextFile(filePath)

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as MatterData)
  }
}

type Await<T> = T extends PromiseLike<infer U> ? U : T

export type PostData = Await<ReturnType<typeof getPostData>>
export type SortedPostsData = MatterDataWithId[]
