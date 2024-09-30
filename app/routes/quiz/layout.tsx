import { HeaderQuiz } from '@/components/feature/quiz/header-quiz'

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section>
      <HeaderQuiz />
      {children}
    </section>
  )
}
