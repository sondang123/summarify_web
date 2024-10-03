import type { createQuiz } from '@/types/quiz/create-quiz'
import { serviceApi } from './service-api'

export async function getQuiz({ caption, translate }: createQuiz) {
  try {
    const json = await serviceApi('web/quiz', {
      method: 'POST',
      body: JSON.stringify({ caption, translate }),
      redirect: 'follow',
    })
    return json
  } catch (error) {
    console.error('Error data:', error)
    throw error
  }
}
