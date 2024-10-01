import { serviceApi } from './service-api'

export async function summarizeFile({ formData }: { formData: FormData }) {
  try {
    const json = await serviceApi('web/video/summarize', {
      method: 'POST',
      body: formData,
    })

    return json
  } catch (error) {
    console.error('Error fetching video data:', error)

    throw error
  }
}
export async function transcriptFile({ formData }: { formData: FormData }) {
  try {
    const json = await serviceApi('web/video/transcript', {
      method: 'POST',
      body: formData,
    })

    return json
  } catch (error) {
    console.error('Error fetching video data:', error)

    throw error
  }
}
export async function mindMapFile({ formData }: { formData: FormData }) {
  try {
    const json = await serviceApi('web/video/mindmap', {
      method: 'POST',
      body: formData,
    })

    return json
  } catch (error) {
    console.error('Error fetching video data:', error)

    throw error
  }
}
