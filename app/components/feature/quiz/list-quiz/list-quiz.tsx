import { Button } from '@/components/ui/button'
import { DialogScore } from '../dialog-score'
import { CellQuiz } from './cell-quiz'

export const ListQuiz: React.FC = () => {
  const handleSelect = (value: string) => {
    console.log('Selected option:', value)
  }
  return (
    <div>
      <div className="flex flex-col gap-6">
        <CellQuiz
          question="Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc.Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc."
          options={['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế']}
          onSelect={handleSelect}
          id="quiz1"
          questionNumber={1}
          totalQuestions={4}
        />
        <CellQuiz
          question="Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc.Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc."
          options={['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế']}
          onSelect={handleSelect}
          id="quiz2"
          questionNumber={2}
          totalQuestions={4}
        />
        <CellQuiz
          question="Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc.Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc."
          options={['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế']}
          onSelect={handleSelect}
          id="quiz3"
          questionNumber={3}
          totalQuestions={4}
        />
        <CellQuiz
          question="Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc.Lorem ipsum dolor sit amet consectetur. Vitae mauris enim urna nunc."
          options={['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế']}
          onSelect={handleSelect}
          id="quiz4"
          questionNumber={4}
          totalQuestions={4}
        />
      </div>

      <DialogScore onPlayAgain={() => {}}>
        <Button className="ml-auto mt-6 flex h-12 rounded-full bg-main-primary hover:bg-main-primary hover:opacity-80 disabled:bg-neutral-5">
          <p className="typo-s16-w600 px-4 text-white"> Continue</p>
        </Button>
      </DialogScore>
    </div>
  )
}
