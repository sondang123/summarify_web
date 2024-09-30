import React from "react";
import { AppConfirmDelete } from "@/components/app-components/dialog-confirm-delete";

import { returnFileSize } from "@/utils";
import { Progress } from "@/components/ui/progress";
import { StatusUpload } from "@/types/cell-input-file";

interface CellUpLoadedFileProps {
  showIconDelete?: boolean;
  onDelete?: () => void;
  isLoading?: boolean;
  name?: string;
  size?: Number;
  status?: StatusUpload;
  progress?: Number;
}

export const CellUpLoadedFile: React.FC<CellUpLoadedFileProps> = ({
  showIconDelete = true,
  onDelete = () => {},
  isLoading = false,
  name = "",
  size,
  status,
  progress = 0,
}) => {
  return (
    <div className="border rounded-2 py-2 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M32.0833 13.75H28.3333C25.7 13.75 24.5833 12.6333 24.5833 10V6.25L32.0833 13.75ZM33.3333 16.25V30C33.3333 33.3333 31.6666 35 28.3333 35H13.3333C9.99998 35 8.33331 33.3333 8.33331 30V10C8.33331 6.66667 9.99998 5 13.3333 5H22.0833V10C22.0833 14.0333 24.3 16.25 28.3333 16.25H33.3333ZM22.9166 26.6667C22.9166 25.9767 22.3566 25.4167 21.6666 25.4167H15C14.31 25.4167 13.75 25.9767 13.75 26.6667C13.75 27.3567 14.31 27.9167 15 27.9167H21.6666C22.3566 27.9167 22.9166 27.3567 22.9166 26.6667ZM27.9166 20C27.9166 19.31 27.3566 18.75 26.6666 18.75H15C14.31 18.75 13.75 19.31 13.75 20C13.75 20.69 14.31 21.25 15 21.25H26.6666C27.3566 21.25 27.9166 20.69 27.9166 20Z"
            fill="#8C60F4"
          />
        </svg>
        <div className="ml-2">
          <p className="typo-s16-w600 text-neutral-800">{name}</p>
          <div className="flex items-center mt-1">
            <p className="typo-14-400 mr-1 text-neutral-400 shrink-0">
              {returnFileSize(Number(size))} -
            </p>
            {isLoading ? (
              <Progress value={Number(progress)} className="h-2" />
            ) : status === "SUCCESS" ? (
              <p className="typo-s14-w400 text-main-success">Upload success</p>
            ) : (
              <p className="typo-s14-w400 text-main-error">Upload failed</p>
            )}
          </div>
        </div>
      </div>
      {showIconDelete ? (
        <AppConfirmDelete onDelete={onDelete}>
          <div className="cursor-pointer hover:opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M17.5 4.375H14.5342C13.7833 4.375 13.7517 4.28 13.5458 3.66333L13.3775 3.1575C13.1217 2.39083 12.4075 1.875 11.5992 1.875H8.40083C7.59249 1.875 6.8775 2.39 6.6225 3.1575L6.45417 3.66333C6.24834 4.28083 6.21666 4.375 5.46583 4.375H2.5C2.155 4.375 1.875 4.655 1.875 5C1.875 5.345 2.155 5.625 2.5 5.625H3.58166L4.22084 15.2075C4.34417 17.0617 5.48084 18.125 7.33917 18.125H12.6617C14.5192 18.125 15.6558 17.0617 15.78 15.2075L16.4192 5.625H17.5C17.845 5.625 18.125 5.345 18.125 5C18.125 4.655 17.845 4.375 17.5 4.375ZM7.80833 3.5525C7.89416 3.29667 8.13166 3.125 8.40083 3.125H11.5992C11.8683 3.125 12.1067 3.29667 12.1917 3.5525L12.36 4.05833C12.3967 4.1675 12.4333 4.27333 12.4733 4.375H7.525C7.565 4.2725 7.60251 4.16666 7.63917 4.05833L7.80833 3.5525ZM14.5317 15.1242C14.4525 16.3183 13.8575 16.875 12.6608 16.875H7.33833C6.14167 16.875 5.5475 16.3192 5.4675 15.1242L4.83417 5.625H5.465C5.56917 5.625 5.65583 5.61417 5.74917 5.6075C5.7775 5.61167 5.80333 5.625 5.8325 5.625H14.1658C14.1958 5.625 14.2208 5.61167 14.2492 5.6075C14.3425 5.61417 14.4292 5.625 14.5333 5.625H15.1642L14.5317 15.1242ZM12.2917 9.16667V13.3333C12.2917 13.6783 12.0117 13.9583 11.6667 13.9583C11.3217 13.9583 11.0417 13.6783 11.0417 13.3333V9.16667C11.0417 8.82167 11.3217 8.54167 11.6667 8.54167C12.0117 8.54167 12.2917 8.82167 12.2917 9.16667ZM8.95833 9.16667V13.3333C8.95833 13.6783 8.67833 13.9583 8.33333 13.9583C7.98833 13.9583 7.70833 13.6783 7.70833 13.3333V9.16667C7.70833 8.82167 7.98833 8.54167 8.33333 8.54167C8.67833 8.54167 8.95833 8.82167 8.95833 9.16667Z"
                fill="#FE5353"
              />
            </svg>
          </div>
        </AppConfirmDelete>
      ) : null}
    </div>
  );
};
