import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { bannerLogin, logo } from '@/const/app-resource'
import { TypeSignIn } from '@/types/sign-in'

import { BASE_URL_API } from '@/helper/get-env'
import { Link } from '@remix-run/react'
import { FormSignIn } from './form-sign-in'
import { FormSignUp } from './form-sign-up'

interface DialogSignInUpProps {
  children?: React.ReactNode | string
  open?: boolean
  onOpenChange?: React.Dispatch<React.SetStateAction<any>>
  type?: TypeSignIn
}

export const DialogSignInUp: React.FC<DialogSignInUpProps> = ({
  children,
  open,
  onOpenChange = () => {},
  type = TypeSignIn.SIGN_IN,
}) => {
  const [dialogSignInUp, setDialogSignInUp] = useState(type)
  useEffect(() => {
    setDialogSignInUp(type)
  }, [type])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent hideCloseButton={false} className="p-0 w-[90vw] rounded-4">
        <ScrollArea className="max-h-[95lvh] px-5 lg:px-15 py-5 lg:py-10">
          <img
            src={bannerLogin}
            alt="summarify"
            className="absolute left-[-250px] top-[-150px] z-[-1]"
          />
          <img
            src={bannerLogin}
            alt="summarify"
            className="absolute right-[-200px] bottom-[-200px] z-[-1]"
          />
          <div>
            <div className="text-center">
              <img src={logo} alt="summarify" className="mx-auto mb-6" />
              <p className="typo-s24-w700 text-neutral-0">
                {dialogSignInUp === TypeSignIn.SIGN_IN
                  ? 'Sign in to Summarify'
                  : 'Create a Summarify Account'}
              </p>
              <p className="typo-s16-w400 text-neutral-1 pt-2">
                Welcome Back to Summarify! <br /> Please sign in to get started
              </p>

              <Link to={`${BASE_URL_API}/auth/google`}>
                <Button
                  className="mt-6 rounded-[30px] w-full h-12 typo-s16-w400 text-neutral-1"
                  variant="outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    className="me-2"
                  >
                    <path
                      d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.327 16.3285 15.1115 18 12.5 18C9.1865 18 6.5 15.3135 6.5 12C6.5 8.6865 9.1865 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C6.9775 2 2.5 6.4775 2.5 12C2.5 17.5225 6.9775 22 12.5 22C18.0225 22 22.5 17.5225 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M3.65283 7.3455L6.93833 9.755C7.82733 7.554 9.98033 6 12.4998 6C14.0293 6 15.4208 6.577 16.4803 7.5195L19.3088 4.691C17.5228 3.0265 15.1338 2 12.4998 2C8.65883 2 5.32783 4.1685 3.65283 7.3455Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M12.5002 22C15.0832 22 17.4302 21.0115 19.2047 19.404L16.1097 16.785C15.0719 17.5742 13.8039 18.001 12.5002 18C9.89916 18 7.69066 16.3415 6.85866 14.027L3.59766 16.5395C5.25266 19.778 8.61366 22 12.5002 22Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.7571 15.1082 17.0467 16.0766 16.108 16.7855L16.1095 16.7845L19.2045 19.4035C18.9855 19.6025 22.5 17 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z"
                      fill="#1976D2"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </Link>
            </div>

            <div className="py-4 flex items-center gap-4.5">
              <div className="flex-1 h-[1px] bg-neutral-2"></div>
              <p className="typo-s14-w400 text-neutral-5">Or</p>
              <div className="flex-1 h-[1px] bg-neutral-2"></div>
            </div>
            {dialogSignInUp === TypeSignIn.SIGN_IN ? (
              <FormSignIn
                onClickChangeSignUp={() => {
                  setDialogSignInUp(TypeSignIn.SIGN_UP)
                }}
                onClose={() => {
                  onOpenChange(false)
                }}
              />
            ) : (
              <FormSignUp
                onClickChangeSignIn={() => {
                  setDialogSignInUp(TypeSignIn.SIGN_IN)
                }}
                onClose={() => {
                  onOpenChange(false)
                }}
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
