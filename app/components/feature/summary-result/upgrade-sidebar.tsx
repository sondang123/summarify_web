import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebar } from '@/hooks/use-sidebar'

export const UpgradeSideBar: React.FC = () => {
  const { isMinimized } = useSidebar()
  return (
    <div className="border-t border-main-divider px-4 pt-6">
      {!isMinimized ? (
        <div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="me-2"
            >
              <path
                d="M19.5 6.25H18.4351C18.6291 5.873 18.75 5.452 18.75 5C18.75 3.484 17.517 2.25 16 2.25C15.178 2.25 14.405 2.61599 13.874 3.26099C13.847 3.29499 12.723 4.78898 12 5.75098C11.276 4.78798 10.151 3.29199 10.119 3.25299C9.59502 2.61499 8.822 2.25 8 2.25C6.483 2.25 5.25 3.484 5.25 5C5.25 5.452 5.36994 5.873 5.56494 6.25H4.5C3.26 6.25 2.25 7.259 2.25 8.5V12C2.25 12.414 2.586 12.75 3 12.75H3.25V18C3.25 20.418 4.582 21.75 7 21.75H17C19.418 21.75 20.75 20.418 20.75 18V12.75H21C21.414 12.75 21.75 12.414 21.75 12V8.5C21.75 7.259 20.74 6.25 19.5 6.25ZM20.25 8.5V11.25H12.75V7.75H16H19.5C19.913 7.75 20.25 8.086 20.25 8.5ZM15.0389 4.20697C15.2809 3.91297 15.622 3.75 16 3.75C16.689 3.75 17.25 4.311 17.25 5C17.25 5.689 16.689 6.25 16 6.25H13.502C14.177 5.352 14.9919 4.26797 15.0389 4.20697ZM6.75 5C6.75 4.311 7.311 3.75 8 3.75C8.378 3.75 8.719 3.91198 8.948 4.19098C9.003 4.26198 9.82105 5.35 10.498 6.25H8C7.311 6.25 6.75 5.689 6.75 5ZM3.75 8.5C3.75 8.086 4.087 7.75 4.5 7.75H8H11.25V11.25H3.75V8.5ZM4.75 18V12.75H11.25V20.25H7C5.423 20.25 4.75 19.577 4.75 18ZM19.25 18C19.25 19.577 18.577 20.25 17 20.25H12.75V12.75H19.25V18Z"
                fill="#505264"
              />
            </svg>

            <p className="typo-s14-w500 text-neutral-0">
              Refer for free credits
            </p>
          </div>
          <div className="flex items-center justify-between pt-4.5">
            <p className="typo-s14-w500 text-neutral-0">Free credits:</p>
            <p className="typo-s14-w500 text-neutral-0">0/3</p>
          </div>
        </div>
      ) : (
        <p className="typo-s14-w500 text-center text-neutral-0">0/3</p>
      )}
      <div>
        <Progress
          value={10}
          className="mt-1 h-2 w-full bg-neutral-4 [&>*]:bg-main-primary"
        />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Button className="typo-s14-w500 mt-8 w-full rounded-full bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] py-6 text-white hover:opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={!isMinimized ? 'me-3' : 'me-0'}
              >
                <path
                  d="M5.21289 6.00441C5.21289 6.12058 5.38246 6.25057 5.60905 6.25057H18.2912C18.5177 6.25057 18.6873 6.12058 18.6873 6.00441V3.57139L15.9468 5.57079C15.451 5.91993 14.7814 5.88735 14.322 5.49172L11.95 3.32832L9.57669 5.49287C9.11722 5.88885 8.44745 5.92162 7.95176 5.57212L5.21289 3.57139V6.00441Z"
                  fill="white"
                />
                <path
                  d="M8.36094 11.2608L10.9932 8.62843H5.25L8.36094 11.2608Z"
                  fill="white"
                />
                <path
                  d="M11.9487 8.79402L9.33984 11.4026H14.5314L11.9487 8.79402Z"
                  fill="white"
                />
                <path
                  d="M16.5645 11.4026H22.9929C22.9633 11.3509 22.9228 11.306 22.874 11.2716L19.5495 8.87672L16.5645 11.4026Z"
                  fill="white"
                />
                <path
                  d="M18.6151 8.62843H12.9004L15.5056 11.2596L18.6151 8.62843Z"
                  fill="white"
                />
                <path
                  d="M12.584 23.2023L22.6546 12.1952H15.7794L12.584 23.2023Z"
                  fill="white"
                />
                <path
                  d="M8.91211 12.1952L11.9334 22.6023L14.9544 12.1952H8.91211Z"
                  fill="white"
                />
                <path
                  d="M1.24609 12.1952L11.2652 23.1461L8.08613 12.1952H1.24609Z"
                  fill="white"
                />
                <path
                  d="M4.33287 8.89009L1.02721 11.2716C0.978421 11.306 0.937955 11.3509 0.908203 11.4026H7.30196L4.33287 8.89009Z"
                  fill="white"
                />
                <path
                  d="M6.00676 1.89129C6.00676 2.54787 5.47441 3.08013 4.81775 3.08013C4.16108 3.08013 3.62891 2.54787 3.62891 1.89129C3.62891 1.23471 4.16108 0.702271 4.81775 0.702271C5.47441 0.702271 6.00676 1.23471 6.00676 1.89129Z"
                  fill="white"
                />
                <path
                  d="M13.1395 1.89129C13.1395 2.54787 12.6071 3.08013 11.9506 3.08013C11.2938 3.08013 10.7617 2.54787 10.7617 1.89129C10.7617 1.23471 11.2938 0.702271 11.9506 0.702271C12.6071 0.702271 13.1395 1.23471 13.1395 1.89129Z"
                  fill="white"
                />
                <path
                  d="M20.2723 1.89129C20.2723 2.54787 19.74 3.08013 19.0835 3.08013C18.4269 3.08013 17.8945 2.54787 17.8945 1.89129C17.8945 1.23471 18.4269 0.702271 19.0835 0.702271C19.74 0.702271 20.2723 1.23471 20.2723 1.89129Z"
                  fill="white"
                />
              </svg>

              {!isMinimized ? 'Upgrade to Unlimited' : ''}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            align="center"
            side="right"
            sideOffset={8}
            className={!isMinimized ? 'hidden' : 'inline-block'}
          >
            <p>Upgrade to Unlimited</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
