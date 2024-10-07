import { serviceApi } from '@/service-api/service-api'
import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = request.headers.get('Authorization')?.split(' ')[1]

  try {
    const result = await serviceApi('web/info/current', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return json(result)
  } catch (error) {
    return json(
      { error: 'Không thể lấy thông tin. Vui lòng thử lại.' },
      { status: 400 },
    )
  }
}
