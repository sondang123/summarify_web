import { serviceApi } from '@/service-api/service-api'
import { type ActionFunctionArgs, json } from '@remix-run/cloudflare'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const body = await request.text()

    const { email, password } = JSON.parse(body)

    const result = await serviceApi('auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    })

    return json(result)
  } catch (error) {
    return json(
      { error: 'Đăng nhập thất bại. Vui lòng thử lại.' },
      { status: 400 },
    )
  }
}
