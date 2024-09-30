import type { ISummaryResultState } from '@/types/store/summary-result'
import create from 'zustand'

const useSummaryResultStore = create<ISummaryResultState>((set) => ({
  recent_summary: [],
  active_recent: undefined,
  idPending: undefined,
  addSummary: ({ data }) =>
    set((state) => ({
      recent_summary: [data, ...state.recent_summary],
      active_recent: data,
    })),
  addIdPending: ({ id }) => set({ idPending: id }),
  updateSummary: ({ data, id }) =>
    set((state) => ({
      recent_summary: state.recent_summary.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
      active_recent: state.recent_summary.find((item) => item.id === id)
        ? { ...state.recent_summary.find((item) => item.id === id)!, ...data }
        : state.active_recent,
    })),

  deleteRecentSummary: ({ id }) =>
    set((state) => {
      return {
        recent_summary: state.recent_summary.filter((item) => item.id !== id),
        active_recent: undefined,
      }
    }),

  setActiveRecent: ({ data }) =>
    set(() => ({
      active_recent: data,
    })),
  renameItemRecent: ({ id, newName }) => {
    set((state) => ({
      recent_summary: state.recent_summary.map((item) =>
        item.id === id ? { ...item, title: newName } : item,
      ),
    }))
  },
}))

export default useSummaryResultStore
