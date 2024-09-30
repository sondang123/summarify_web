import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import type React from 'react'

interface AppConfirmDeleteProps {
  children?: React.ReactNode | string
  title?: string
  subTitle?: string
  open?: boolean
  onOpenChange?: React.Dispatch<React.SetStateAction<any>>
  onDelete?: () => void
}
export const AppConfirmDelete: React.FC<AppConfirmDeleteProps> = ({
  children,
  title = 'Confirm Delete',
  subTitle = 'Are you sure you want to delete?',
  open,
  onOpenChange = () => {},
  onDelete = () => {},
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose className="border-0 outline-none">
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose className="border-0 outline-none">
            <Button
              onClick={onDelete}
              className="bg-main-primary hover:bg-main-primary hover:opacity-80"
            >
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
