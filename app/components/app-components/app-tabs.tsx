import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AppTabsProps {
  arrTabs: string[]

  setActiveTab(tab: string): void
}

export const AppTabs: React.FC<AppTabsProps> = ({ arrTabs, setActiveTab }) => {
  return (
    <Tabs defaultValue={arrTabs?.[0]} className="w-full">
      <div className="flex justify-between items-center">
        <TabsList className="rounded-[30px] w-full">
          {arrTabs?.map((item, index) => (
            <TabsTrigger
              value={item}
              className="data-[state=active]:rounded-7.5 data-[state=active]:text-main-primary duration-100 ease-in-out flex-1"
              key={index}
              onClick={() => {
                if (setActiveTab) setActiveTab(item)
              }}
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  )
}
