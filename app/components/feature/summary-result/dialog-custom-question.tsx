import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'

import { GlobalIndicator } from '@/components/app-components/loading-indicator'

import { useGetQuiz } from '@/query/quiz/create-quiz'
import useSummaryResultStore from '@/store/summary-result-store'
import { formatDuration, getYoutubeId } from '@/utils'
import { useNavigate } from '@remix-run/react'
import type React from 'react'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import TimeInput from '../../app-components/time-input'
import { PreviewUpload } from '../summary_demo/upload-preview'

interface IDialogCustomQuestion {
  children?: React.ReactNode | string
  title?: string
  subTitle?: string
  open?: boolean
  onOpenChange?: React.Dispatch<React.SetStateAction<any>>
}

const formSchema = z.object({
  topic: z.string().nullable(),
  numberOfQuestion: z
    .string()
    .nullable()
    .refine(
      (val) =>
        val === null || val === '' || (/^\d+$/.test(val) && Number(val) > 0),
      {
        message: 'Must be a positive number or empty',
      },
    ),
  time: z
    .string()
    .nullable()
    .refine(
      (val) => {
        if (val === null || val === '' || val === '00:00:00') return true
        const timeRegex = /^(?:[0-9]{2}):([0-5]\d):([0-5]\d)$/
        return timeRegex.test(val)
      },
      {
        message: 'Invalid time format',
      },
    ),
})

export const DialogCustomQuestion: React.FC<IDialogCustomQuestion> = ({
  children,
  open,
  onOpenChange = () => {},
}) => {
  const navigate = useNavigate()
  const createQuiz = useGetQuiz()
  const { addQuiz, active_recent } = useSummaryResultStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      numberOfQuestion: '5',
      time: '00:05:00',
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    GlobalIndicator.show()
    const numQuiz = values?.numberOfQuestion ?? 5
    const time = values?.time === '00:00:00' ? '00:05:00' : values?.time
    const data = await createQuiz.mutateAsync({
      caption: active_recent?.transcript?.text ?? '',
      translate: `${numQuiz} quiz in ${time} topics ${values?.topic}`,
    })
    if (data?.data?.quiz) {
      addQuiz({
        data: {
          contentQuiz: data?.data,
        },
        id: active_recent?.id ?? '',
      })
      navigate('/quiz')
    }
    GlobalIndicator.hide()
  }

  const videoPlayer = useMemo(() => {
    if (!active_recent?.fileVideo) return null

    return (
      <div>
        <video
          src={URL.createObjectURL(active_recent.fileVideo)}
          controls
          className="w-full rounded-lg aspect-[21/9]"
        >
          <track kind="captions" src="" label="English" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }, [active_recent?.fileVideo])
  const numberOfQuestions = useWatch({
    control: form.control,
    name: 'numberOfQuestion',
    defaultValue: '5',
  })
  const timeQuestion = useWatch({
    control: form.control,
    name: 'time',
    defaultValue: '00:05:00',
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="w-[90%] rounded-2 sm:max-w-[50%]"
        hideCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="typo-s24-w700 text-center leading-6 text-neutral-0">
            {active_recent?.transcript?.info?.title ||
              active_recent?.fileVideo?.name}
          </DialogTitle>
          <p className="typo-s16-w400 pt-4 text-center text-neutral-1">
            This quiz will test your knowledge of key facts and details in the
            video
          </p>
          <p className="typo-s16-w400 text-center text-neutral-1">
            You can edit the question topic, time and number of questions as you
            like below!
          </p>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Configure question topic"
                      {...field}
                      value={field.value ?? ''}
                      className="h-12 rounded-[30px] border-neutral-2 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="numberOfQuestion"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute left-5 top-[50%] translate-y-[-50%]"
                        >
                          <path
                            d="M19.339 2.50609L12.7738 1.34813C11.4818 1.12113 10.4168 1.29211 9.60684 1.85911C8.79684 2.42611 8.27183 3.36808 8.04483 4.66008L7.93692 5.27409L4.65786 5.85112C2.06386 6.31212 0.889003 7.99408 1.35 10.5871L2.89395 19.3401C3.11795 20.6321 3.6399 21.5741 4.4479 22.1411C5.0259 22.5461 5.73389 22.7501 6.56289 22.7501C6.89489 22.7501 7.2478 22.7171 7.6188 22.6511L14.1898 21.4941C16.0568 21.1561 16.8979 20.2541 17.2719 19.3851C17.3199 19.3861 17.375 19.3991 17.422 19.3991C19.422 19.3991 20.716 18.2171 21.11 15.9901L22.653 7.23613C23.108 4.64313 21.933 2.96309 19.339 2.50609ZM13.9259 20.018L7.35782 21.1741C6.46882 21.3301 5.78096 21.2441 5.30996 20.9131C4.83996 20.5831 4.52498 19.9681 4.37198 19.0811L2.82681 10.3241C2.51081 8.54008 3.13685 7.64413 4.91885 7.32713L7.65884 6.84508L6.50088 13.4141C6.04388 16.0081 7.21989 17.6881 9.81289 18.1451L15.663 19.1761C15.385 19.5051 14.8819 19.844 13.9259 20.018ZM21.175 6.97612L19.632 15.7301C19.317 17.5141 18.4228 18.1411 16.6378 17.8261L10.0729 16.6681C8.2899 16.3541 7.66296 15.4591 7.97696 13.6751L9.5209 4.92113C9.6769 4.03513 9.99595 3.41812 10.4669 3.08812C10.7879 2.86412 11.208 2.75108 11.724 2.75108C11.966 2.75108 12.2298 2.77609 12.5138 2.82609L19.079 3.98411C20.862 4.29711 21.489 5.19212 21.175 6.97612ZM18.5968 11.0351C18.5338 11.3991 18.217 11.6551 17.86 11.6551C17.817 11.6551 17.7729 11.6521 17.7289 11.6441L11.164 10.4861C10.756 10.4141 10.4828 10.0251 10.5558 9.61711C10.6268 9.20911 11.02 8.93708 11.424 9.00908L17.9889 10.1671C18.3959 10.2381 18.6688 10.6261 18.5968 11.0351ZM19.297 7.77312C19.234 8.13712 18.917 8.39311 18.56 8.39311C18.517 8.39311 18.4729 8.39012 18.4289 8.38212L11.8639 7.2241C11.4559 7.1521 11.183 6.76309 11.256 6.35509C11.327 5.94809 11.7199 5.67412 12.1239 5.74712L18.6889 6.90514C19.0969 6.97714 19.369 7.36512 19.297 7.77312ZM15.5539 13.8961C15.4909 14.2601 15.1738 14.5161 14.8168 14.5161C14.7738 14.5161 14.7299 14.5131 14.6859 14.5051L10.5819 13.7811C10.1739 13.7091 9.90103 13.3201 9.97403 12.9121C10.045 12.5051 10.4359 12.2311 10.8419 12.3041L14.946 13.0281C15.354 13.0991 15.6259 13.4881 15.5539 13.8961Z"
                            fill="#505264"
                          />
                        </svg>
                        <Input
                          placeholder="Enter the number of questions "
                          {...field}
                          value={field.value ?? ''}
                          className="h-12 rounded-[30px] border-neutral-2 px-4 pl-12"
                          type="number"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TimeInput
                        onChange={field.onChange}
                        defaultValue={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="typo-s16-w500 py-2 text-neutral-0">Played Quiz</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start rounded-3 bg-main-background_summary px-4 py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="me-4.5"
                >
                  <path
                    d="M17.8032 23.7905C17.4019 23.9819 16.933 24.1243 16.4021 24.2199L8.73704 25.5616C6.18204 26.0166 4.67692 24.9666 4.23358 22.4116L2.43716 12.2033C1.98216 9.64827 3.0321 8.14327 5.5871 7.68827L7.68459 7.31956C7.92376 7.27756 8.13279 7.48642 8.08962 7.72558L6.71759 15.4933C6.09926 19.0283 7.7675 21.4082 11.2908 22.0266C11.2908 22.0266 17.3797 23.0964 17.6935 23.1571C18.0809 23.2271 18.1427 23.64 17.8032 23.7905ZM25.5651 8.29026L23.7636 18.5032C23.3296 20.9626 21.9111 22.0137 19.5253 21.6871C19.4343 21.6742 19.3526 21.6743 19.2581 21.6579L11.5987 20.3069C9.0449 19.8566 7.9939 18.3551 8.44424 15.8012L10.0111 6.91588L10.2455 5.58821C10.6958 3.03438 12.1974 1.98324 14.7512 2.43357L22.4115 3.7846C24.9641 4.23493 26.0155 5.73759 25.5651 8.29026ZM18.1461 16.2119C18.2301 15.7359 17.9129 15.282 17.4369 15.198L12.6489 14.3534C12.1752 14.2682 11.7192 14.5879 11.6363 15.0628C11.5523 15.5388 11.8696 15.9926 12.3456 16.0766L17.1336 16.9213C17.1849 16.9306 17.2361 16.9341 17.2862 16.9341C17.7027 16.9353 18.0715 16.6366 18.1461 16.2119ZM21.6963 12.874C21.7803 12.398 21.463 11.9443 20.987 11.8603L13.3279 10.5092C12.8566 10.4264 12.3979 10.7438 12.3151 11.2186C12.2311 11.6946 12.5486 12.1484 13.0246 12.2324L20.6837 13.5834C20.735 13.5927 20.7865 13.5962 20.8367 13.5962C21.2532 13.5962 21.6216 13.2975 21.6963 12.874ZM22.5132 9.06842C22.5972 8.59242 22.2796 8.13856 21.8036 8.05456L14.1446 6.70354C13.6732 6.61954 13.2148 6.93808 13.132 7.41291C13.048 7.88891 13.3652 8.34277 13.8412 8.42677L21.5003 9.77772C21.5516 9.78705 21.6031 9.79061 21.6533 9.79061C22.0698 9.79177 22.4385 9.49309 22.5132 9.06842Z"
                    fill="#8C60F4"
                  />
                </svg>
                <div>
                  <p className="typo-s16-w600 text-neutral-0">
                    {numberOfQuestions || 5}
                    <span> questions</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start rounded-3 bg-main-background_summary px-4 py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="me-4.5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.45144 4.11827L4.11811 6.45161C3.94778 6.62194 3.72374 6.70824 3.49974 6.70824C3.27574 6.70824 3.05171 6.62311 2.88138 6.45161C2.53954 6.10977 2.53954 5.55556 2.88138 5.21373L5.21471 2.8804C5.55654 2.53857 6.11075 2.53857 6.45258 2.8804C6.79442 3.22223 6.79328 3.77644 6.45144 4.11827ZM25.1121 5.20789L22.7788 2.92127C22.4335 2.58294 21.8804 2.58876 21.5398 2.93409C21.2026 3.27942 21.2087 3.83363 21.5529 4.17196L23.8862 6.45858C24.0566 6.62542 24.2781 6.70824 24.4986 6.70824C24.7249 6.70824 24.9523 6.62077 25.1238 6.44577C25.4621 6.10043 25.4563 5.54623 25.1121 5.20789ZM19.3699 21.6265L21.6204 23.8827C21.9611 24.2245 21.9611 24.7787 21.6181 25.1206C21.4478 25.2909 21.2237 25.376 21.0009 25.376C20.7769 25.376 20.5517 25.2898 20.3814 25.1183L17.7937 22.5235C16.634 23.0403 15.353 23.3332 14.002 23.3332C12.651 23.3332 11.37 23.0403 10.2104 22.5235L7.62153 25.1183C7.45119 25.2886 7.22602 25.3749 7.00202 25.3749C6.77919 25.3749 6.55513 25.2897 6.38479 25.1194C6.04179 24.7787 6.04185 24.2234 6.38251 23.8815L8.63296 21.6265C6.2378 19.9372 4.66983 17.1534 4.66983 13.9999C4.66983 8.84557 8.84883 4.66657 14.0032 4.66657C19.1575 4.66657 23.3365 8.84557 23.3365 13.9999C23.333 17.1534 21.7639 19.9372 19.3699 21.6265ZM16.9514 15.7616L14.8747 13.6849V9.38109C14.8747 8.89809 14.4827 8.50609 13.9997 8.50609C13.5167 8.50609 13.1247 8.89809 13.1247 9.38109V14.0478C13.1247 14.2799 13.2169 14.5028 13.3814 14.6661L15.7147 16.9995C15.885 17.1698 16.1091 17.2561 16.3331 17.2561C16.5571 17.2561 16.7811 17.171 16.9514 16.9995C17.2933 16.6565 17.2933 16.1034 16.9514 15.7616Z"
                    fill="#8C60F4"
                  />
                </svg>
                <div>
                  <p className="typo-s16-w600 text-neutral-0">
                    {timeQuestion === '00:00:00' ? '00:05:00 ' : timeQuestion}
                    <span> minutes</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="typo-s16-w500 text-neutral-0">Video</p>
            <div className="flex gap-4">
              {active_recent?.fileVideo ? (
                videoPlayer
              ) : (
                <PreviewUpload
                  title={''}
                  description={''}
                  duration={0}
                  channel={''}
                  idYoutube={getYoutubeId(active_recent?.video ?? '')}
                />
              )}

              <div>
                <p className="typo-s16-w600 text-neutral-0">
                  {active_recent?.transcript?.info?.title ??
                    active_recent?.fileVideo?.name}
                </p>
                <p className="typo-s14-w400 pt-1 text-neutral-1">
                  {active_recent?.transcript?.info?.channelName ?? ''}
                </p>
              </div>
            </div>
            <DialogFooter className="flex gap-6 pt-10">
              <DialogClose className="flex-1 border-0 outline-none">
                <Button
                  variant="outline"
                  className="w-full rounded-[30px] border-main-primary py-6"
                >
                  <p className="typo-s16-w600 text-main-primary">Cancel</p>
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="w-full flex-1 rounded-[30px] bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] py-6 text-main-light_primary hover:opacity-80"
              >
                <p className="typo-s16-w600 text-white">Start now</p>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
