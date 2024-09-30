import { serviceApi } from './service-api'

export async function summarizeFile({ formData }: { formData: FormData }) {
  try {
    const json = await serviceApi('video/summarize', {
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
    const json = await serviceApi('video/transcript', {
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
    const json = await serviceApi('video/mindmap', {
      method: 'POST',
      body: formData,
    })

    return json
  } catch (error) {
    console.error('Error fetching video data:', error)

    throw error
  }
}
