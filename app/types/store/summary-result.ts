export interface IMindmapItem {
  id: string
  parent: string
  label: string
}
export interface ISummaryItem {
  title: string
  quiz?: []
  id: string

  transcript?: {
    task: string
    language: string
    duration: number
    words: string
    text: string
    segments: ISegments[]
    info?: {
      title: string
      description?: string
      channelName?: string | undefined
      duration: string
    }
  }
  summarize?: string
  mindMap?: IMindmapItem[]
  video?: string
  fileVideo?: File
}

export interface ISegments {
  id: number
  seek: number
  start: number
  end: number
  text: string
  temperature: number
  avg_logprob: number
  compression_ratio: number
  no_speech_prob: number
  transient: boolean
}
export interface ISummaryResultState {
  recent_summary: ISummaryItem[]
  active_recent?: ISummaryItem
  idPending?: string | undefined
  addSummary: ({ data }: { data: ISummaryItem }) => void
  addIdPending: ({ id }: { id: string }) => void
  updateSummary: ({ data, id }: { data: any; id: string }) => void
  setActiveRecent: ({ data }: { data: ISummaryItem | undefined }) => void
  deleteRecentSummary: ({ id }: { id: string }) => void
  renameItemRecent: ({ id, newName }: { id: string; newName: string }) => void
}
