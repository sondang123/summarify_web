import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { StepSummary } from "~/components/feature/step-summary";
import { StepUploadFile } from "~/components/feature/step-upload-file";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [stepUpload, setStepUpload] = useState("UPLOAD");
  return (
    <div className="min-h-lvh bg-[url('assets/images/bg-home.png')] bg-no-repeat bg-cover bg-center">
      <div className="container pt-32 pb-10">
        <p className="typo-s48-w800 text-center text-main-secondary_1">
          Summarize videos & create quiz
        </p>
        <p className="typo-s18-w500 text-neutral-1 text-center">
          Take notes from YouTube videos and other supported File easily.
        </p>

        <div className="bg-white rounded-4.5 p-10 mt-10">
          {stepUpload === "SUMMARY" ? (
            <StepSummary
              setStepUpload={setStepUpload}
              stepUpload={stepUpload}
            />
          ) : (
            <StepUploadFile
              setStepUpload={setStepUpload}
              stepUpload={stepUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
}
