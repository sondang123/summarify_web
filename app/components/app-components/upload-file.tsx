import type React from 'react'
import { useRef } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface UploadFileProps {
  onChange: (Event: any) => void
  acceptFile?: string
  subtileSupport?: string | React.ReactNode
  multiple?: boolean
}
export const UploadFile: React.FC<UploadFileProps> = ({
  onChange = () => {},
  acceptFile = '',
  subtileSupport,
  multiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className="border border-dashed border-main-primary bg-main-background rounded-2 p-6 flex items-center justify-center flex-col relative hover:opacity-80"
      style={{
        strokeDasharray: 12,
      }}
    >
      <Button
        className="rounded-full border-main-primary bg-transparent"
        variant="outline"
        type="button"
      >
        <p className="typo-s16-w400 text-main-primary"> Select File</p>
      </Button>
      <div className="py-2 flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M29 14.6667C29 18.3027 26.4186 21.4627 22.8639 22.18C22.7973 22.1933 22.7307 22.2 22.6654 22.2C22.1987 22.2 21.7825 21.872 21.6865 21.3973C21.5772 20.856 21.9281 20.328 22.4694 20.22C25.0961 19.6906 27 17.3547 27 14.6667C27 11.5413 24.4587 9 21.3333 9C20.956 9 20.5933 9.03337 20.2253 9.1027C19.8186 9.18004 19.4068 8.99735 19.1908 8.64535C18.8014 8.01735 18.3068 7.43064 17.7188 6.90397C16.3348 5.6773 14.5387 5 12.6667 5C8.43867 5 5 8.43867 5 12.6667C5 15.7707 6.85208 18.548 9.71875 19.744C10.2281 19.956 10.4679 20.5427 10.2559 21.052C10.0425 21.5627 9.45458 21.8014 8.94792 21.5894C5.33458 20.0827 3 16.58 3 12.6667C3 7.336 7.336 3 12.6667 3C15.028 3 17.2961 3.85603 19.0495 5.41203C19.6095 5.91336 20.1015 6.45867 20.5215 7.04134C20.7895 7.01334 21.0587 7 21.3333 7C25.5613 7 29 10.4387 29 14.6667ZM16.708 13.96C16.616 13.868 16.5055 13.7946 16.3828 13.744C16.1388 13.6426 15.8628 13.6426 15.6188 13.744C15.4961 13.7946 15.3853 13.868 15.2933 13.96L12.6266 16.6266C12.236 17.0173 12.236 17.6507 12.6266 18.0413C13.0173 18.432 13.6507 18.432 14.0413 18.0413L15.0013 17.0813V28C15.0013 28.552 15.4493 29 16.0013 29C16.5533 29 17.0013 28.552 17.0013 28V17.0813L17.9613 18.0413C18.1559 18.236 18.412 18.3346 18.668 18.3346C18.924 18.3346 19.18 18.2373 19.3747 18.0413C19.7653 17.6507 19.7653 17.0173 19.3747 16.6266L16.708 13.96Z"
            className="fill-main-primary"
          />
        </svg>
        <p className="typo-s18-w600 text-neutral-0 pl-2">
          Select a files or drag and drop here
        </p>
      </div>

      <p className="typo-s14-w400 text-neutral-1"> {subtileSupport}</p>
      <Input
        type="file"
        className="absolute top-0 left-0 right-0 h-full opacity-0 cursor-pointer "
        accept={acceptFile}
        ref={inputRef}
        multiple={multiple}
        onChange={(e) => {
          onChange(e)
          if (inputRef?.current) {
            inputRef.current.value = ''
          }
        }}
      />
    </div>
  )
}
