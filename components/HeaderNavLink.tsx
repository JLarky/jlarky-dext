import React from 'https://esm.sh/react'
import { Link, useRouter } from 'https://deno.land/x/aleph/mod.ts'

export const HeaderNavLink: React.FC<{ href: string }> = ({
  href,
  children
}) => {
  const router = useRouter()
  const active = router.pathname === href
  return (
    <Link to={href}>
      <a
        className={
          (active
            ? 'text-gray-900 font-bold hover:text-black'
            : 'text-gray-600 hover:text-gray-900') +
          ' inline-block py-2 px-4 no-underline hover:no-underline'
        }
      >
        {children}
      </a>
    </Link>
  )
}
