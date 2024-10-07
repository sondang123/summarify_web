import { GlobalIndicator } from '@/components/app-components/loading-indicator'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { validationRules } from '@/const/form-schema'
import { useSignUp } from '@/query/auth/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@remix-run/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PasswordInput } from '../../app-components/password-input'

const formSchema = z
  .object({
    username: z.string().min(validationRules.minLength, {
      message: validationRules.minLengthMessage,
    }),
    email: z.string().email().min(validationRules.minLength, {
      message: validationRules.minLengthMessage,
    }),
    password: z.string().min(validationRules.minLength, {
      message: validationRules.minLengthMessage,
    }),
    rePassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.rePassword
    },
    {
      message: 'Passwords must match!',
      path: ['rePassword'],
    },
  )

interface FormSignUpProps {
  onClickChangeSignIn: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
}

export const FormSignUp: React.FC<FormSignUpProps> = ({
  onClickChangeSignIn,
  onClose,
}) => {
  const signUpMutation = useSignUp()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, email, password } = values
    GlobalIndicator.show()
    const res = await signUpMutation.mutateAsync({
      username,
      email,
      password,
    })

    if (res?.data) {
      form.reset()
      onClose()
      navigate('/')
    }
    GlobalIndicator.hide()
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className="rounded-[30px] border-neutral-2 px-4 py-5.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    {...field}
                    className="rounded-[30px] border-neutral-2 px-4 py-5.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter password"
                    {...field}
                    className="rounded-[30px] border-neutral-2 px-4 py-5.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="Re-enter password"
                    {...field}
                    className="rounded-[30px] border-neutral-2 px-4 py-5.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-[30px] typo-s16-w600 text-main-light_primary py-6 bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] hover:opacity-80"
          >
            Sign up
          </Button>
        </form>
      </Form>

      <div>
        <p className="typo-s14-w400 text-neutral-1 text-center pt-10">
          Already have an account?
          <span
            className="text-main-primary cursor-pointer hover:opacity-80 pl-1"
            onClick={onClickChangeSignIn}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}
