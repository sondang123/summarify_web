import type { ISummaryResultState } from '@/types/store/summary-result'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useSummaryResultStore = create<ISummaryResultState>()(
  persist(
    (set) => ({
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
            item.id === id ? { ...item, ...data } : item,
          ),
          active_recent: state.recent_summary.find((item) => item.id === id)
            ? {
                ...state.recent_summary.find((item) => item.id === id)!,
                ...data,
              }
            : state.active_recent,
        })),

      addAnswer: ({ data, id }) =>
        set((state) => ({
          recent_summary: state.recent_summary.map((item) =>
            item.id === id
              ? {
                  ...item,
                  answer: item?.answer
                    ? Object.entries(data).reduce(
                        (acc, [key, value]) => {
                          const existingIndex = acc.findIndex(
                            (a) => a.key === key,
                          )
                          if (existingIndex !== -1) {
                            acc[existingIndex].value = value
                          } else {
                            acc.push({ key, value })
                          }
                          return acc
                        },
                        [...item.answer],
                      )
                    : Object.entries(data).map(([key, value]) => ({
                        key,
                        value,
                      })),
                }
              : item,
          ),
          active_recent: state.recent_summary.find((item) => item.id === id)
            ? {
                ...state.recent_summary.find((item) => item.id === id)!,
                answer: state.recent_summary.find((item) => item.id === id)!
                  .answer
                  ? Object.entries(data).reduce(
                      (acc, [key, value]) => {
                        const existingIndex = acc.findIndex(
                          (a) => a.key === key,
                        )
                        if (existingIndex !== -1) {
                          acc[existingIndex].value = value
                        } else {
                          acc.push({ key, value })
                        }
                        return acc
                      },
                      [
                        ...(state.recent_summary.find((item) => item.id === id)
                          ?.answer ?? []),
                      ],
                    )
                  : Object.entries(data).map(([key, value]) => ({
                      key,
                      value,
                    })),
              }
            : state.active_recent,
        })),
      addQuiz: ({ data, id }) =>
        set((state) => ({
          recent_summary: state.recent_summary.map((item) =>
            item.id === id ? { ...item, ...data } : item,
          ),
          active_recent: state.recent_summary.find((item) => item.id === id)
            ? {
                ...state.recent_summary.find((item) => item.id === id)!,
                ...data,
              }
            : state.active_recent,
        })),

      deleteRecentSummary: ({ id }) =>
        set((state) => {
          return {
            recent_summary: state.recent_summary.filter(
              (item) => item.id !== id,
            ),
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
    }),
    {
      name: 'summary-result-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useSummaryResultStore
