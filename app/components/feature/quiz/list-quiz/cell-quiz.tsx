interface QuestionRadioGroupProps {
  id: string
  question: string
  options: string[]
  onSelect: (value: number) => void
  questionNumber: number // Thêm prop questionNumber
  totalQuestions: number // Thêm prop totalQuestions
  defaultCheckedIndex: number // Add this new prop
}

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const CellQuiz: React.FC<QuestionRadioGroupProps> = ({
  id,
  question,
  options,
  onSelect,
  questionNumber,
  totalQuestions,
  defaultCheckedIndex,
}) => {
  return (
    <div className="rounded-4 bg-white p-8">
      <p className="typo-s16-w600 text-neutral-1">
        Question {questionNumber} of {totalQuestions}
      </p>
      <p className="typo-s20-w600 pt-2 text-neutral-0">{question}</p>
      <div className="mt-6">
        <RadioGroup
          onValueChange={(value) => {
            const selectedIndex = options.findIndex(
              (option) => option === value,
            )
            onSelect(selectedIndex)
          }}
          className="flex flex-col gap-4"
          defaultValue={options[defaultCheckedIndex]}
        >
          {options.map((option, index) => (
            <div key={`${id}-option-${index}`} className="peer">
              <Label
                htmlFor={`${id}-option-${index}`}
                className="[&:has([data-state=checked])]:bg-main-light_secondary_1 flex cursor-pointer items-center rounded-3 border border-neutral-2 p-4 hover:opacity-80 [&:has([data-state=checked])]:border-main-secondary_1"
              >
                <RadioGroupItem
                  value={option}
                  id={`${id}-option-${index}`}
                  className="me-3 size-4 border-2 border-neutral-4 bg-neutral-4 [&[data-state=checked]>span]:hidden [&[data-state=checked]]:border-main-secondary_1"
                />
                <p className="typo-s16-w400 text-neutral-0 [.peer:has([data-state=checked])_&]:text-main-secondary_1">
                  {option}
                </p>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
