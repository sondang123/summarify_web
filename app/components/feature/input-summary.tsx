import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
  useMindMapLinkYoutube,
  useSummarizeLinkYoutube,
  useTranscriptLinkMutation,
} from '@/query/summary/summarize-link'
import useSummaryResultStore from '@/store/summary-result-store'
import { zodResolver } from '@hookform/resolvers/zod'

import { useInfoMe } from '@/query/auth/info-me'
import {
  useMindMapFile,
  useSummarizeFile,
  useTranscriptFile,
} from '@/query/summary/summarize-file'
import { getYoutubeId, uuidRandom } from '@/utils'
import { useNavigate } from '@remix-run/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DialogSignInUp } from './dialog-sign-in-up/screen-sign-in'
interface IInputSummaryProps {
  showExamples?: boolean
}
const formSchema = z
  .object({
    link: z.string().optional(),
    file: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      if (data.file) return true
      if (!data.link || data.link.trim() === '') return false

      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
      return youtubeRegex.test(data.link)
    },
    {
      message: 'Please provide a valid YouTube link or upload a file',
      path: ['link'],
    },
  )

export const InputSummary: React.FC<IInputSummaryProps> = ({
  showExamples = true,
}) => {
  const [showDialogSignIn, setShowDialogSignIn] = useState<boolean>(false)
  const navigate = useNavigate()
  const { addSummary, addIdPending } = useSummaryResultStore()
  const infoMe = useInfoMe()

  const transcriptFile = useTranscriptFile()
  const summarizeFile = useSummarizeFile()
  const mindMapFile = useMindMapFile()

  const transcriptLinkMutation = useTranscriptLinkMutation()
  const summarizeLinkMutation = useSummarizeLinkYoutube()
  const mindMapLinkMutation = useMindMapLinkYoutube()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!infoMe?.data?.data?.user) {
      setShowDialogSignIn(true)
    } else {
      const idRandom = uuidRandom()
      if (values.file) {
        addSummary({
          data: {
            id: idRandom,
            title: values.file?.name ?? '',
            fileVideo: values.file,
          },
        })
        addIdPending({ id: idRandom })
        const formData = new FormData()
        formData.append('file', values.file)

        transcriptFile.mutate({ formData })
        summarizeFile.mutate({ formData })
        mindMapFile.mutate({ formData })
      } else if (values.link) {
        const youtubeId = getYoutubeId(values.link)
        addSummary({
          data: {
            id: idRandom,
            title: values.link,
            video: values.link,
          },
        })
        addIdPending({ id: idRandom })

        transcriptLinkMutation.mutate({ youtubeId })
        summarizeLinkMutation.mutate({ youtubeId })
        mindMapLinkMutation.mutate({ youtubeId })
      }
      navigate('/summary')
      // Reset form
      form.reset()
    }
  }

  return (
    <div className="pb-10 pt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="relative flex-1">
                    <div
                      className={cn(
                        form.getValues('file')
                          ? 'flex h-15 items-center rounded-[30px] border border-main-primary bg-white'
                          : 'p-0',
                      )}
                    >
                      {form.getValues('file') ? (
                        <div className="relative ml-5 flex h-fit max-w-[50%] items-center rounded-1.5 border border-neutral-2 bg-neutral-6 px-2 py-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="me-1"
                          >
                            <path
                              d="M20.53 8.47L14.53 2.47C14.389 2.329 14.199 2.25 14 2.25H8C5.582 2.25 4.25 3.582 4.25 6V18C4.25 20.418 5.582 21.75 8 21.75H17C19.418 21.75 20.75 20.418 20.75 18V9C20.75 8.801 20.671 8.61 20.53 8.47ZM14.75 4.811L18.189 8.25H17C15.423 8.25 14.75 7.577 14.75 6V4.811ZM17 20.25H8C6.423 20.25 5.75 19.577 5.75 18V6C5.75 4.423 6.423 3.75 8 3.75H13.25V6C13.25 8.418 14.582 9.75 17 9.75H19.25V18C19.25 19.577 18.577 20.25 17 20.25Z"
                              fill="#505264"
                            />
                          </svg>
                          <p className="typo-s16-w600 overflow-hidden truncate text-neutral-0">
                            {form.getValues('file')?.name}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="absolute right-[-5px] top-[-5px] cursor-pointer hover:opacity-80"
                            onClick={() => {
                              form.setValue('file', undefined)
                              form.trigger('file')
                            }}
                          >
                            <path
                              d="M7.99967 1.33337C4.31967 1.33337 1.33301 4.32004 1.33301 8.00004C1.33301 11.68 4.31967 14.6667 7.99967 14.6667C11.6797 14.6667 14.6663 11.68 14.6663 8.00004C14.6663 4.32004 11.6797 1.33337 7.99967 1.33337ZM10.353 9.64669C10.5463 9.84002 10.5463 10.1601 10.353 10.3534C10.253 10.4534 10.1263 10.5 9.99967 10.5C9.87301 10.5 9.74634 10.4534 9.64634 10.3534L7.99967 8.70671L6.35301 10.3534C6.25301 10.4534 6.12634 10.5 5.99967 10.5C5.87301 10.5 5.74634 10.4534 5.64634 10.3534C5.45301 10.1601 5.45301 9.84002 5.64634 9.64669L7.29301 8.00004L5.64634 6.35339C5.45301 6.16006 5.45301 5.84002 5.64634 5.64669C5.83968 5.45335 6.15967 5.45335 6.35301 5.64669L7.99967 7.29338L9.64634 5.64669C9.83968 5.45335 10.1597 5.45335 10.353 5.64669C10.5463 5.84002 10.5463 6.16006 10.353 6.35339L8.70634 8.00004L10.353 9.64669Z"
                              fill="#505264"
                            />
                          </svg>
                        </div>
                      ) : (
                        <Input
                          placeholder="Enter URL or youtube video link here..."
                          className="typo-s16-w400 h-15 rounded-[30px] pe-36 pl-5 placeholder:typo-s16-w400 placeholder:text-neutral-5"
                          {...field}
                        />
                      )}

                      <div className="absolute bottom-3 right-3 top-3 rounded-5 bg-main-light_primary hover:opacity-80">
                        <label
                          htmlFor="input_file_summary"
                          className="flex cursor-pointer items-center p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M8.58832 18.125C6.99666 18.125 5.51415 17.5175 4.41332 16.4142C2.09165 14.0858 2.12764 10.2617 4.49347 7.89L9.26683 3.10335C10.056 2.31168 11.1067 1.87585 12.2234 1.87585C13.34 1.87585 14.391 2.31168 15.1801 3.10335C16.8085 4.73668 16.8085 7.39419 15.1801 9.02752L10.3834 13.8367C9.4767 14.7467 7.89432 14.7475 6.98432 13.8367C6.04849 12.8984 6.04849 11.3717 6.98432 10.4333L11.1976 6.20836C11.4417 5.96419 11.8376 5.96335 12.0818 6.20752C12.3268 6.45085 12.3267 6.84669 12.0834 7.09169L7.87014 11.3167C7.41931 11.7683 7.41931 12.5033 7.87014 12.955C8.30431 13.3917 9.06419 13.3908 9.49836 12.955L14.2951 8.14584C15.4384 6.99918 15.4384 5.13335 14.2951 3.98668C13.1884 2.87668 11.2593 2.87668 10.1527 3.98668L5.3793 8.77336C3.53013 10.6267 3.49414 13.7225 5.29914 15.5325C6.16331 16.3992 7.33082 16.8759 8.58832 16.8759C9.87749 16.8759 11.1333 16.3575 12.035 15.4534L16.2242 11.2517C16.4676 11.0075 16.8634 11.0067 17.1084 11.2509C17.3534 11.4942 17.3534 11.89 17.1101 12.135L12.9208 16.3367C11.7858 17.4725 10.2067 18.125 8.58832 18.125Z"
                              fill="#8C60F4"
                            />
                          </svg>
                          <p className="typo-s14-w500 cursor-pointer pl-2 text-main-primary">
                            Upload file
                          </p>
                        </label>
                        <Input
                          type="file"
                          className="hidden"
                          id="input_file_summary"
                          name="input_file_summary"
                          accept="video/mp4"
                          onChange={(e: any) => {
                            form.setValue('file', e?.target?.files[0])
                            form.trigger('file')
                            e.target.value = null
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-6 h-15 w-[200px] shrink-0 rounded-[30px] bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] hover:opacity-80">
              Generate
            </Button>
          </div>
        </form>
      </Form>

      {showExamples ? (
        <div className="flex items-center pt-5.5">
          <p className="typo-s16-w400 pe-2 text-neutral-1">For example:</p>
          <p className="typo-s14-w400 rounded-5 bg-main-light_primary px-3 py-1.5 text-main-primary">
            https://www.youtube.com/watch?v=Au6LqK1UH8g
          </p>
        </div>
      ) : null}

      <DialogSignInUp
        onOpenChange={setShowDialogSignIn}
        open={showDialogSignIn}
      />
    </div>
  )
}
