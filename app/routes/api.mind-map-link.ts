import { serviceApi } from '@/service-api/service-api'
import { type ActionFunctionArgs, json } from '@remix-run/cloudflare'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    const body = await request.text()

    const { youtubeId } = JSON.parse(body)

    const result = await serviceApi('web/youtube/mindmap', {
      method: 'POST',
      body: JSON.stringify({
        youtubeId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return json(result)
  } catch (error) {
    return json({ error: 'Please try again!' }, { status: 400 })
  }
}
