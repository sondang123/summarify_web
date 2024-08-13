import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const SummaryContent: React.FC = () => {
  return (
    <div className="border rounded-4 p-4">
      <Tabs defaultValue="Transcript" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList className="rounded-[30px]">
            <TabsTrigger
              value="Transcript"
              className="data-[state=active]:rounded-7.5 duration-100 ease-in-out"
            >
              Transcript
            </TabsTrigger>
            <TabsTrigger
              value="Summary"
              className="data-[state=active]:rounded-7.5 duration-100 ease-in-out"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="MindMap"
              className="data-[state=active]:rounded-7.5 duration-100 ease-in-out"
            >
              MindMap
            </TabsTrigger>
          </TabsList>
          <Button className="text-center rounded-[30px] bg-main-secondary_1 hover:bg-main-secondary_1 hover:opacity-80">
            Create Quiz
          </Button>
        </div>
        <TabsContent value="Transcript">
          Make changes to your account here. Make changes to your account here.
        </TabsContent>
        <TabsContent value="Summary">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};
