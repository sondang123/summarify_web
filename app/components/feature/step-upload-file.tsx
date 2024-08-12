import { CellUpLoadedFile } from "~/components/app-components/cell-input-file";
import { InputSearch } from "~/components/app-components/input-search";
import { UploadFile } from "~/components/app-components/upload-file";
import { Button } from "~/components/ui/button";

interface IProps {
  stepUpload: string;
  setStepUpload: (step: string) => void;
}
export const StepUploadFile: React.FC<IProps> = ({ setStepUpload }) => {
  return (
    <div>
      <InputSearch />
      <p className="text-center py-6 text-neutral-1 typo-s18-w500">Or</p>
      <UploadFile
        onChange={() => {}}
        subtileSupport={
          <div className="text-center">
            Supported files: mp4, mp3, mov, avi, and Many More...
            <br />
            video size: 500 MB Max video length: 2 hours
          </div>
        }
      />
      <div>
        <p className="typo-s14-w500 text-black pb-3 pt-6">Uploaded File</p>
        <CellUpLoadedFile name="name.mp4" size={1200} />
      </div>
      <div className="mx-auto text-center mt-15">
        <Button
          className="mx-auto text-center rounded-[30px] bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] hover:opacity-80 "
          onClick={() => {
            setStepUpload("SUMMARY");
          }}
        >
          Generate Summary
        </Button>
      </div>
    </div>
  );
};
