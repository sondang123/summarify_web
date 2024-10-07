import { GlobalIndicator } from '@/components/app-components/loading-indicator'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { validationRules } from '@/const/form-schema'
import { useSignIn } from '@/query/auth/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@remix-run/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PasswordInput } from '../../app-components/password-input'

const formSchema = z.object({
  email: z.string().email().min(validationRules.minLength, {
    message: validationRules.minLengthMessage,
  }),
  password: z.string().min(validationRules.minLength, {
    message: validationRules.minLengthMessage,
  }),
  remember: z.boolean().default(false).optional(),
})

interface FormSignInProps {
  onClickChangeSignUp: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
}

export const FormSignIn: React.FC<FormSignInProps> = ({
  onClickChangeSignUp,
  onClose,
}) => {
  const signInMutation = useSignIn()

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      remember: false,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    GlobalIndicator.show()
    const { email, password } = values
    const res = await signInMutation.mutateAsync({
      email,
      password,
    })

    if (res.data?.token) {
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
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
                    placeholder="Password"
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
            name="remember"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember-me"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-5 w-5 border-neutral-5 rounded-2 data-[state=checked]:bg-main-primary"
                    />
                    <label
                      htmlFor="remember-me"
                      className="typo-s14-w400 text-neutral-1 cursor-pointer"
                    >
                      Remember Me
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-[30px] typo-s16-w600 text-main-light_primary py-6 bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] hover:opacity-80"
          >
            Sign in to the Summarify
          </Button>
        </form>
      </Form>
      <p className="text-center typo-s16-w400 text-main-primary pt-5">
        Forgot Password?
      </p>
      <div>
        <p className="typo-s14-w400 text-neutral-1 text-center pt-10">
          Don’t have an account?
          <span
            className="text-main-primary cursor-pointer hover:opacity-80 pl-1"
            onClick={onClickChangeSignUp}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}
