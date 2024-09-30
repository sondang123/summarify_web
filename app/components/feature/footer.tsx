import { menuFooter } from '@/const/app-data'
import { logo } from '@/const/app-resource'
import { Link } from '@remix-run/react'

export const Footer: React.FC = () => {
  return (
    <div className="bg-default-black">
      <div className="container border-b border-neutral-4 py-12">
        <div className="grid grid-cols-10">
          <div className="col-span-4">
            <div>
              <Link
                to="/"
                className="flex items-center cursor-pointer hover:opacity-80"
              >
                <img
                  src={logo}
                  width={53}
                  height={500}
                  alt="sumarify"
                  className="me-2.5"
                />
                <p className="typo-s28-w700 text-white">Summarify</p>
              </Link>
            </div>
          </div>
          {menuFooter?.map((item, index) => (
            <div className="col-span-2" key={index}>
              <p className="typo-s18-w600 text-white mb-6">{item?.title}</p>
              <ul className="list-none">
                {item?.data?.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={
                      subIndex === item?.data?.length - 1 ? 'pb-0' : 'pb-4'
                    }
                  >
                    <Link
                      to={subItem?.link}
                      className="typo-s16-w400 text-white hover:text-main-primary"
                    >
                      {subItem?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="text-neutral-4 typo-s14-w400 text-center py-6">
        © 2024 All Rights Reserved by Summarify
      </p>
    </div>
  )
}
