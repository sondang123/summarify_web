import { menuHeader } from '@/const/app-data'
import { logo } from '@/const/app-resource'
import { cn } from '@/lib/utils'

import { Link, useLocation } from '@remix-run/react'

import { useEffect, useState } from 'react'
import { AccountHeader } from './account-header'

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false)
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-40',
        isSticky ? 'bg-main-background shadow-lg duration-200 ease-in' : '',
      )}
    >
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex cursor-pointer items-center hover:opacity-80"
          >
            <img
              src={logo}
              width={53}
              height={500}
              alt="sumarify"
              className="me-2.5"
            />
            <p className="typo-s32-w700 text-neutral-0">Summarify</p>
          </Link>
          <div className="flex">
            {menuHeader?.map((item, index) => (
              <Link
                to={item?.link}
                key={index}
                className={cn(
                  index === menuHeader?.length - 1 ? 'mr-0' : 'mr-10',
                  location?.pathname === item?.link
                    ? 'typo-s16-w600 text-main-primary'
                    : 'typo-s16-w500 text-neutral-0',
                )}
              >
                {item?.name}
              </Link>
            ))}
          </div>
          <AccountHeader />
        </div>
      </div>
    </div>
  )
}
