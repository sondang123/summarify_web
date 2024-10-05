import { AppConfirmDelete } from '@/components/app-components/dialog-confirm-delete'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { ISummaryItem } from '@/types/store/summary-result'
import { useRef, useState } from 'react'
interface SummaryItemProps {
  item: ISummaryItem
  deleteRecentSummary: () => void
  updateSummaryTitle: (newTitle: string) => void
}

export function SummaryItem({
  item,
  deleteRecentSummary,
  updateSummaryTitle,
}: SummaryItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(item.title)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleRename = () => {
    setIsEditing(true)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value)
  }

  const handleTitleSubmit = () => {
    if (editedTitle.trim() !== '') {
      updateSummaryTitle(editedTitle)
    } else {
      updateSummaryTitle(item?.title)
      setEditedTitle(item?.title)
    }
    setIsEditing(false)
  }

  return (
    <div className="flex w-full items-center justify-between overflow-hidden">
      {isEditing ? (
        <Input
          ref={inputRef}
          className="typo-s14-w500 mr-2 h-8 w-full text-neutral-600"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleSubmit}
          onKeyPress={(e) => e.key === 'Enter' && handleTitleSubmit()}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      ) : (
        <p className="typo-s14-w500 mr-2 truncate text-neutral-600">
          {item.title}
        </p>
      )}
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="me-3"
        >
          <path
            d="M10.75 13C10.75 13.414 10.414 13.75 10 13.75H8.75V15C8.75 15.414 8.414 15.75 8 15.75C7.586 15.75 7.25 15.414 7.25 15V13.75H6C5.586 13.75 5.25 13.414 5.25 13C5.25 12.586 5.586 12.25 6 12.25H7.25V11C7.25 10.586 7.586 10.25 8 10.25C8.414 10.25 8.75 10.586 8.75 11V12.25H10C10.414 12.25 10.75 12.586 10.75 13ZM21.75 13V17C21.75 19.36 20.462 21.75 18 21.75H17.741C16.399 21.75 15.1539 21.084 14.4099 19.968C14.3749 19.915 13.575 18.75 12 18.75C10.396 18.75 9.60102 19.9409 9.59302 19.9529C8.84702 21.0799 7.59993 21.75 6.25293 21.75H6C3.538 21.75 2.25 19.36 2.25 17V13C2.25 8.773 4.399 6.25 8 6.25H11.25V6C11.25 4.759 12.26 3.75 13.5 3.75H14.5C14.913 3.75 15.25 3.414 15.25 3C15.25 2.586 15.586 2.25 16 2.25C16.414 2.25 16.75 2.586 16.75 3C16.75 4.241 15.74 5.25 14.5 5.25H13.5C13.087 5.25 12.75 5.586 12.75 6V6.25H16C19.601 6.25 21.75 8.773 21.75 13ZM20.25 13C20.25 9.614 18.74 7.75 16 7.75H8C5.26 7.75 3.75 9.614 3.75 13V17C3.75 18.565 4.454 20.25 6 20.25H6.25293C7.09493 20.25 7.87509 19.8309 8.34009 19.1289C8.38709 19.0559 9.593 17.25 12 17.25C14.408 17.25 15.6131 19.066 15.6631 19.144C16.1241 19.833 16.902 20.25 17.741 20.25H18C19.546 20.25 20.25 18.565 20.25 17V13ZM14.75 13.25C14.198 13.25 13.75 13.698 13.75 14.25C13.75 14.802 14.198 15.25 14.75 15.25C15.302 15.25 15.75 14.802 15.75 14.25C15.75 13.698 15.302 13.25 14.75 13.25ZM17.25 10.751C16.698 10.751 16.25 11.199 16.25 11.751C16.25 12.303 16.698 12.751 17.25 12.751C17.802 12.751 18.25 12.303 18.25 11.751C18.25 11.199 17.802 10.751 17.25 10.751Z"
            fill="#FE8253"
          />
        </svg>

        <Popover>
          <PopoverTrigger
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="px-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="20"
              viewBox="0 0 4 20"
              fill="none"
            >
              <path
                d="M2.02063 3.5C1.19163 3.5 0.515625 2.829 0.515625 2C0.515625 1.171 1.18262 0.5 2.01062 0.5H2.02063C2.84963 0.5 3.52063 1.171 3.52063 2C3.52063 2.829 2.84963 3.5 2.02063 3.5ZM3.52063 10C3.52063 9.171 2.84963 8.5 2.02063 8.5H2.01062C1.18262 8.5 0.515625 9.171 0.515625 10C0.515625 10.829 1.19163 11.5 2.02063 11.5C2.84963 11.5 3.52063 10.829 3.52063 10ZM3.52063 18C3.52063 17.171 2.84963 16.5 2.02063 16.5H2.01062C1.18262 16.5 0.515625 17.171 0.515625 18C0.515625 18.829 1.19163 19.5 2.02063 19.5C2.84963 19.5 3.52063 18.829 3.52063 18Z"
                fill="#505264"
              />
            </svg>
          </PopoverTrigger>
          <PopoverContent
            className="shadow-1 relative w-fit border-0 p-3"
            align="start"
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div
                className="flex cursor-pointer px-3 py-2 hover:opacity-80"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRename()
                  setTimeout(() => {
                    inputRef.current?.focus()
                  }, 0)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.75 15.01V18.01C19.75 20.428 18.418 21.76 16 21.76H6C3.582 21.76 2.25 20.428 2.25 18.01V8.01001C2.25 5.59201 3.582 4.26001 6 4.26001H9C9.414 4.26001 9.75 4.59601 9.75 5.01001C9.75 5.42401 9.414 5.76001 9 5.76001H6C4.423 5.76001 3.75 6.43301 3.75 8.01001V18.01C3.75 19.587 4.423 20.26 6 20.26H16C17.577 20.26 18.25 19.587 18.25 18.01V15.01C18.25 14.596 18.586 14.26 19 14.26C19.414 14.26 19.75 14.596 19.75 15.01ZM21.75 6.06601C21.749 6.65301 21.52 7.20401 21.104 7.61801L12.141 16.541C12 16.681 11.81 16.76 11.612 16.76H8C7.586 16.76 7.25 16.424 7.25 16.01V12.399C7.25 12.201 7.32799 12.01 7.46899 11.87L16.392 2.90601C16.805 2.49001 17.357 2.26101 17.944 2.26001C17.945 2.26001 17.946 2.26001 17.947 2.26001C18.533 2.26001 19.084 2.48802 19.499 2.90302L21.108 4.51202C21.522 4.92702 21.751 5.47901 21.75 6.06601ZM17.617 8.97302L15.037 6.39301L8.75 12.709V15.261H11.302L17.617 8.97302ZM20.25 6.064C20.25 5.878 20.178 5.70302 20.047 5.57202L18.438 3.96301C18.307 3.83201 18.132 3.76001 17.947 3.76001H17.946C17.76 3.76001 17.586 3.83302 17.455 3.96402L16.096 5.32901L18.681 7.914L20.046 6.55502C20.177 6.42502 20.249 6.25 20.25 6.064Z"
                    fill="#170427"
                  />
                </svg>
                <p className="typo-s16-w500 ml-2 text-neutral-0">Rename</p>
              </div>
              <AppConfirmDelete
                onDelete={() => {
                  deleteRecentSummary()
                }}
              >
                <div className="mt-3 flex cursor-pointer px-3 py-2 hover:opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 5.26001H17.441C16.54 5.26001 16.502 5.14601 16.255 4.40601L16.053 3.79901C15.746 2.87901 14.889 2.26001 13.919 2.26001H10.081C9.11099 2.26001 8.253 2.87801 7.947 3.79901L7.745 4.40601C7.498 5.14701 7.46 5.26001 6.559 5.26001H3C2.586 5.26001 2.25 5.59601 2.25 6.01001C2.25 6.42401 2.586 6.76001 3 6.76001H4.298L5.065 18.259C5.213 20.484 6.57701 21.76 8.80701 21.76H15.194C17.423 21.76 18.787 20.484 18.936 18.259L19.703 6.76001H21C21.414 6.76001 21.75 6.42401 21.75 6.01001C21.75 5.59601 21.414 5.26001 21 5.26001ZM9.37 4.27301C9.473 3.96601 9.75799 3.76001 10.081 3.76001H13.919C14.242 3.76001 14.528 3.96601 14.63 4.27301L14.832 4.88C14.876 5.011 14.92 5.13801 14.968 5.26001H9.03C9.078 5.13701 9.12301 5.01 9.16701 4.88L9.37 4.27301ZM17.438 18.159C17.343 19.592 16.629 20.26 15.193 20.26H8.806C7.37 20.26 6.657 19.593 6.561 18.159L5.801 6.76001H6.558C6.683 6.76001 6.787 6.74701 6.899 6.73901C6.933 6.74401 6.964 6.76001 6.999 6.76001H16.999C17.035 6.76001 17.065 6.74401 17.099 6.73901C17.211 6.74701 17.315 6.76001 17.44 6.76001H18.197L17.438 18.159ZM14.75 11.01V16.01C14.75 16.424 14.414 16.76 14 16.76C13.586 16.76 13.25 16.424 13.25 16.01V11.01C13.25 10.596 13.586 10.26 14 10.26C14.414 10.26 14.75 10.596 14.75 11.01ZM10.75 11.01V16.01C10.75 16.424 10.414 16.76 10 16.76C9.586 16.76 9.25 16.424 9.25 16.01V11.01C9.25 10.596 9.586 10.26 10 10.26C10.414 10.26 10.75 10.596 10.75 11.01Z"
                      fill="#FE5353"
                    />
                  </svg>
                  <p className="typo-s16-w500 ml-2 text-main-error">Delete</p>
                </div>
              </AppConfirmDelete>
            </div>
            <div className="absolute left-[3px] top-[-8px] border-[10px] border-t-0 border-transparent border-b-white"></div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
