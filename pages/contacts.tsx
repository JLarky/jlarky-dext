import { Head, useDeno } from 'https://deno.land/x/aleph/mod.ts'
import React, { useEffect, useState } from 'https://esm.sh/react'

import { siteTitle } from '../components/layout.tsx'

export function Contacts() {
  const lastModified = useDeno(async () => {
    const { mtime } = await Deno.stat('./pages/contacts.tsx')
    return mtime?.toISOString()
  })
  const [date] = useState(() => new Date(lastModified || 0))
  return (
    <>
      <Head>
        <title>{siteTitle} contacts</title>
      </Head>
      <section
        className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
        style={{ fontFamily: 'Georgia,serif' }}
      >
        <p className="py-2">Hi!</p>
        <p className="py-2">
          On most things on the internet I have nick <b>JLarky</b> or{' '}
          <b>jlarky2012</b> (it was funnier before the end of the world
          happened, I should have used jlarky2020). But my real name is Yaroslav
          Ivanovich Lapin (Ярослав Иванович Лапин), I was born in USSR and lived
          most of my live in Russia but last few years I live in USA. I rarely
          care about updating this kind of information on social networks, so
          this is going to go stale at some point as well :)
        </p>
        <p className="py-2">
          I care about some people, games and programming. Lately I mostly code
          in React/TypeScript and Elixir.
        </p>
        <p className="py-2" title={lastModified}>
          Right at this moment (<Time date={date} />) I would say that best way
          to reach me is Telegram or Twitter. But I have some other links that
          I'm going to add here in time :)
        </p>
      </section>
      <div className="py-6"></div>
    </>
  )
}

function Time({ date }: { date: Date }) {
  const iso = date.toISOString()
  const [text, setText] = useState(iso.split('T')[0])
  useEffect(() => {
    // https://stackoverflow.com/a/3552493
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    setText(`${da} ${mo} ${ye}`)
  }, [])
  return <time dateTime={iso}>{text}</time>
}

export default Contacts
