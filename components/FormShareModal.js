import { ClipboardIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const FormShareModal = ({ formStatus, show }) => {
  const [textCopied, setTextCopied] = useState(false);
  function textCopyHandler() {
    navigator.clipboard.writeText(`https://formbuilder-phi.vercel.app/form/${formStatus.id}`);
    setTextCopied(true);
  }
  return (
    <div className=" fixed z-10 top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
      <div className="w-[100vw] h-[100vh] absolute z-10 "></div>
      {formStatus && (
        <div className="min-w-[50%] p-8 bg-white h-[300px] flex justify-center items-center rounded-xl shadow-xl z-20 relative">
          {!formStatus.isError && (
            <div className="flex justify-center flex-col items-center gap-4">
              Form link is available
              <div className="outline outline-1 p-2 rounded-md flex items-center gap-4 cursor-text ">
                https://formbuilder-phi.vercel.app/form/{formStatus.id}
                <ClipboardIcon
                  className="w-6 cursor-pointer"
                  onClick={textCopyHandler}
                />
              </div>
              <p
                className={`h-[1rem] text-center ${
                  textCopied ? "text-green-800" : ""
                } `}
              >
                {textCopied ? "Link Copied to Clipboard!" : ""}
              </p>
            </div>
          )}
          {
            formStatus.isError && (
              <p>Something went wrong during creating form</p>
            )
          }
          <button
            className="absolute top-2 right-2 z-50 text-black"
            onClick={() => show(false)}
          >
            <XMarkIcon className="w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FormShareModal;
