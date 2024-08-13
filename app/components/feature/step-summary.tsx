import { InputSearch } from "~/components/app-components/input-search";
import { UploadFile } from "~/components/app-components/upload-file";
import { Button } from "~/components/ui/button";
import { PreviewUpload } from "./summary/preview-upload";
import { SummaryContent } from "./summary/summary-content";

interface IProps {
  stepUpload: string;
  setStepUpload: (step: string) => void;
}
export const StepSummary: React.FC<IProps> = ({ setStepUpload }) => {
  return (
    <div>
      <InputSearch />
      {/* <UploadFile
        onChange={() => {}}
        subtileSupport={
          <div className="text-center">
            Supported files: mp4, mp3, mov, avi, and Many More...
            <br />
            video size: 500 MB Max video length: 2 hours
          </div>
        }
      /> */}
      <div className="flex items-center justify-center mt-15 gap-6">
        <Button
          className="rounded-[30px] hover:text-main-primary hover:opacity-80 border-main-primary text-main-primary"
          variant="outline"
          onClick={() => {
            setStepUpload("UPLOAD");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="me-2.5"
          >
            <path
              d="M18.1251 10.0001C18.1251 10.3451 17.8451 10.6251 17.5001 10.6251H4.00929L8.77593 15.3918C9.0201 15.636 9.0201 16.0318 8.77593 16.276C8.65427 16.3976 8.49424 16.4593 8.33424 16.4593C8.17424 16.4593 8.01422 16.3985 7.89255 16.276L2.05922 10.4426C2.00172 10.3851 1.956 10.3161 1.92433 10.2394C1.861 10.0869 1.861 9.9144 1.92433 9.7619C1.956 9.68523 2.00172 9.61595 2.05922 9.55845L7.89255 3.72512C8.13672 3.48095 8.53258 3.48095 8.77675 3.72512C9.02091 3.96928 9.02091 4.36515 8.77675 4.60931L4.01011 9.37596H17.5001C17.8451 9.37512 18.1251 9.65514 18.1251 10.0001Z"
              fill="#8C60F4"
            />
          </svg>
          Back to Home
        </Button>
        <Button
          className="rounded-[30px] bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] hover:opacity-80 "
          disabled
        >
          Generate Summary
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-10">
        <div className="col-span-4">
          <PreviewUpload />
        </div>
        <div className="col-span-6">
          <SummaryContent />
        </div>
      </div>
    </div>
  );
};
