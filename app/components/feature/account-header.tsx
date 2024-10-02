import { avatarDemo } from '@/const/app-resource'
import { TypeSignIn } from '@/types/sign-in'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { DialogSignInUp } from './dialog-sign-in-up/screen-sign-in'

export const AccountHeader = () => {
  const isLogin = true
  return (
    <div>
      {isLogin ? (
        <div>
          <Popover>
            <PopoverTrigger>
              <div className="flex cursor-pointer gap-2 hover:opacity-80">
                <img
                  src={avatarDemo}
                  alt="avatar"
                  className=" shrink-0 cursor-pointer rounded-full object-cover "
                  onError={(e: any) => {
                    e.target.src = avatarDemo
                  }}
                  width={45}
                  height={45}
                />
                <div className="min-w-[160px] max-w-[250px]">
                  <div className="me-3">
                    <p className="typo-s16-w600 mr-2 break-words text-neutral-800 text-left line-clamp-2">
                      Sơn Đặng
                    </p>
                    <p className="typo-s14-w400 text-neutral-500 line-clamp-1 break-words text-left">
                      sondang2kk@gmail.com
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16.5308 13.47C16.8238 13.763 16.8238 14.238 16.5308 14.531L12.5308 18.531C12.3848 18.677 12.1928 18.751 12.0008 18.751C11.8088 18.751 11.6167 18.678 11.4707 18.531L7.47073 14.531C7.17773 14.238 7.17773 13.763 7.47073 13.47C7.76373 13.177 8.23876 13.177 8.53176 13.47L12.0017 16.94L15.4717 13.47C15.7637 13.177 16.2378 13.177 16.5308 13.47ZM8.53079 10.5301L12.0008 7.06008L15.4707 10.5301C15.6167 10.6761 15.8088 10.75 16.0008 10.75C16.1928 10.75 16.3848 10.6771 16.5308 10.5301C16.8238 10.2371 16.8238 9.76202 16.5308 9.46902L12.5308 5.46902C12.2378 5.17602 11.7628 5.17602 11.4697 5.46902L7.46975 9.46902C7.17675 9.76202 7.17675 10.2371 7.46975 10.5301C7.76275 10.8231 8.23779 10.8231 8.53079 10.5301Z"
                    fill="#505264"
                  />
                </svg>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="shadow-1 relative w-[200px] border-0 p-3"
              align="end"
              sideOffset={5}
            >
              <div>
                <div className="flex cursor-pointer px-3 py-2 hover:opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 1.26001C6.072 1.26001 1.25 6.08201 1.25 12.01C1.25 17.938 6.072 22.76 12 22.76C17.928 22.76 22.75 17.938 22.75 12.01C22.75 6.08201 17.928 1.26001 12 1.26001ZM12 21.26C6.899 21.26 2.75 17.111 2.75 12.01C2.75 6.90901 6.899 2.76001 12 2.76001C17.101 2.76001 21.25 6.90901 21.25 12.01C21.25 17.111 17.101 21.26 12 21.26ZM15.53 14.48C15.823 14.773 15.823 15.248 15.53 15.541C15.384 15.687 15.192 15.761 15 15.761C14.808 15.761 14.616 15.688 14.47 15.541L11.47 12.541C11.329 12.4 11.25 12.209 11.25 12.011V7.01099C11.25 6.59699 11.586 6.26099 12 6.26099C12.414 6.26099 12.75 6.59699 12.75 7.01099V11.7L15.53 14.48Z"
                      fill="#170427"
                    />
                  </svg>
                  <p className="typo-s16-w500 ml-2 text-neutral-0">History</p>
                </div>

                <div className="mt-3 flex cursor-pointer px-3 py-2 hover:opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.75 17.01V18.01C15.75 20.428 14.418 21.76 12 21.76H6C3.582 21.76 2.25 20.428 2.25 18.01V6.01001C2.25 3.59201 3.582 2.26001 6 2.26001H12C14.418 2.26001 15.75 3.59201 15.75 6.01001V7.01001C15.75 7.42401 15.414 7.76001 15 7.76001C14.586 7.76001 14.25 7.42401 14.25 7.01001V6.01001C14.25 4.43301 13.577 3.76001 12 3.76001H6C4.423 3.76001 3.75 4.43301 3.75 6.01001V18.01C3.75 19.587 4.423 20.26 6 20.26H12C13.577 20.26 14.25 19.587 14.25 18.01V17.01C14.25 16.596 14.586 16.26 15 16.26C15.414 16.26 15.75 16.596 15.75 17.01ZM21.692 12.297C21.768 12.114 21.768 11.907 21.692 11.724C21.654 11.632 21.599 11.549 21.53 11.48L18.53 8.48001C18.237 8.18701 17.762 8.18701 17.469 8.48001C17.176 8.77301 17.176 9.24802 17.469 9.54102L19.189 11.261H8C7.586 11.261 7.25 11.597 7.25 12.011C7.25 12.425 7.586 12.761 8 12.761H19.189L17.469 14.481C17.176 14.774 17.176 15.249 17.469 15.542C17.615 15.688 17.807 15.762 17.999 15.762C18.191 15.762 18.383 15.689 18.529 15.542L21.529 12.542C21.599 12.471 21.654 12.388 21.692 12.297Z"
                      fill="#FE5353"
                    />
                  </svg>
                  <p className="typo-s16-w500 ml-2 text-main-error">Log out</p>
                </div>
              </div>
              <div className="absolute right-[2px] top-[-8px] border-[10px] border-t-0 border-transparent border-b-white"></div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div>
          <DialogSignInUp>
            <Button className="rounded-[30px] bg-transparent text-neutral-0 hover:bg-transparent hover:opacity-80">
              Sign in
            </Button>
          </DialogSignInUp>
          <DialogSignInUp type={TypeSignIn.SIGN_UP}>
            <Button className="typo-s16-w600 rounded-[30px] bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] text-main-light_primary hover:opacity-80">
              Sign up
            </Button>
          </DialogSignInUp>
        </div>
      )}
    </div>
  )
}
