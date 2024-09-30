import { dataHomeHowItWorks } from '@/const/app-data'

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-10">
      <p className="typo-s48-w800 text-neutral-0 text-center">How It Works</p>
      <p className="typo-s18-w400 text-neutral-1 pt-6 text-center">
        We solve clients' projects in a simple & efficient way
      </p>
      <div className="pt-15 grid grid-cols-10">
        {dataHomeHowItWorks?.map((item, index) => (
          <div key={index} className="col-span-2 content-center">
            {item?.icon ? (
              <div className="flex justify-center"> {item?.icon}</div>
            ) : (
              <div className="text-center">
                <div className="typo-s30-w700 text-main-primary bg-main-light_primary rounded-[35px] size-[70px] flex items-center justify-center mx-auto">
                  {item?.step}
                </div>
                <p className="typo-s24-w700 text-neutral-0 pt-7.5">
                  {item?.title}
                </p>
                <p className="typo-s16-w400 text-neutral-1 pt-2">
                  {item?.subtle}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
