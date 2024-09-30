import { dataCellNewGenerate } from '@/const/app-data'
import { logo } from '@/const/app-resource'

import type { ReactElement } from 'react'
import { InputSummary } from '../input-summary'

interface ICellItemDemoProps {
  icon: ReactElement
  title: string
}
export const NewGenerate: React.FC = () => {
  const CellItemDemo: React.FC<ICellItemDemoProps> = ({ icon, title }) => {
    return (
      <div>
        {icon}

        <p className="typo-s16-w500 pt-3 text-neutral-1">{title}</p>
      </div>
    )
  }
  return (
    <div className="mx-auto flex h-full w-[70%] flex-col justify-between pb-10 pt-25">
      <div>
        <img
          src={logo}
          width={53}
          height={500}
          alt="sumarify"
          className="mx-auto"
        />
        <p className="typo-s18-w500 pt-4 text-center text-neutral-0">
          Get YouTube video summaries in a minute. Just paste the link below.
        </p>

        <div className="mt-10 grid grid-cols-12 gap-6">
          {dataCellNewGenerate?.map((item, index) => (
            <div className="col-span-4 rounded-2 border p-4" key={index}>
              <CellItemDemo icon={item?.icon} title={item?.title} />
            </div>
          ))}
        </div>
      </div>
      <InputSummary showExamples={false} />
    </div>
  )
}
