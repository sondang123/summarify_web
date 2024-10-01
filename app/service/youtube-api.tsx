import { serviceApi } from './service-api'

export async function summarizeLink({ youtubeId }: { youtubeId: string }) {
  try {
    const raw = JSON.stringify({
      youtubeId: youtubeId,
    })
    const json = await serviceApi('web/youtube/summarize', {
      method: 'POST',
      body: raw,
      redirect: 'follow',
    })
    return json
  } catch (error) {
    console.error('Error fetching video data:', error)
    throw error
  }
}
export async function transcriptLink({ youtubeId }: { youtubeId: string }) {
  try {
    const raw = JSON.stringify({
      youtubeId: youtubeId,
    })
    const json = await serviceApi('web/youtube/transcript', {
      method: 'POST',
      body: raw,
      redirect: 'follow',
    })
    return json
  } catch (error) {
    console.error('Error fetching video data:', error)
    throw error
  }
}
export async function mindMapLink({ youtubeId }: { youtubeId: string }) {
  try {
    const raw = JSON.stringify({
      youtubeId: youtubeId,
    })
    const json = await serviceApi('web/youtube/mindmap', {
      method: 'POST',
      body: raw,
      redirect: 'follow',
    })
    return json
  } catch (error) {
    console.error('Error fetching video data:', error)
    throw error
  }
}
