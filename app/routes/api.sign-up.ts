import { serviceApi } from '@/service-api/service-api'
import { type ActionFunctionArgs, json } from '@remix-run/cloudflare'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const body = await request.text()

    const { email, password, username } = JSON.parse(body)

    const result = await serviceApi('auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })

    return json(result)
  } catch (error) {
    return json({ error: 'Please try again!' }, { status: 400 })
  }
}
