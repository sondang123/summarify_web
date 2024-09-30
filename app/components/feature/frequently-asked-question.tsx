import { dataHomeFrequentlyAskedQuestions } from '@/const/app-data'

export const FrequentlyAskedQuestion: React.FC = () => {
  return (
    <div className="py-10">
      <p className="typo-s48-w800 text-neutral-0 text-center">
        Frequently Asked Question
      </p>
      <div className="grid grid-cols-12 pt-15 gap-15">
        {dataHomeFrequentlyAskedQuestions?.map((item, index) => (
          <div className="col-span-6" key={index}>
            <p className="typo-s24-w500 text-neutral-0">{item?.title}</p>
            <p className="typo-s16-w400 text-neutral-1 pt-6">{item?.subtle}</p>
          </div>
        ))}
      </div>
      <p className="typo-s16-w400 text-neutral-1 text-center pt-15">
        Didn’t find your answer?
        <span className="text-main-primary pl-1 cursor-pointer hover:opacity-80">
          Contact us here
        </span>
      </p>
    </div>
  )
}
