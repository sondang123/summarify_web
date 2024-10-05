import { serviceApi } from '@/service-api/service-api'
import { type ActionFunctionArgs, json } from '@remix-run/cloudflare'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    const formData = await request.formData()

    const result = await serviceApi('web/video/transcript', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return json(result)
  } catch (error) {
    return json({ error: 'Please try again!' }, { status: 400 })
  }
}
