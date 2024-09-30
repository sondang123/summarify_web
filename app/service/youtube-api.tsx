import { serviceApi } from './service-api'

export async function summarizeLink({ youtubeId }: { youtubeId: string }) {
  try {
    const raw = JSON.stringify({
      youtubeId: youtubeId,
    })
    const json = await serviceApi('youtube/summarize', {
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
    const json = await serviceApi('youtube/transcript', {
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
    const json = await serviceApi('youtube/mindmap', {
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
