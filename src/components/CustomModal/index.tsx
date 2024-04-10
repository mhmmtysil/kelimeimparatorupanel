import React from "react";

import Lottie from "lottie-react";
import success from "@images/lottie/success.json";
import fail from "@images/lottie/fail.json";
import question from "@images/lottie/question.json";

// Props türlerini tanımla
interface ModalProps {
  closeModal: () => void;
  title: string;
  message: string;
  viewDetailsButtonText: string;
  type: "success" | "error" | "question";
  isOpen: boolean;
}

const CustomModal: React.FC<ModalProps> = ({
  closeModal,
  title,
  message,
  viewDetailsButtonText,
  type,
  isOpen,
}) => {
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
          <div
            onClick={handleCloseModal}
            className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15"
          >
            <div className="flex h-40 w-full justify-center">
              <div className="w-40">
                <Lottie
                  animationData={
                    type == "success"
                      ? success
                      : type == "question"
                        ? question
                        : fail
                  }
                  width={20}
                  height={20}
                  loop={false}
                />
              </div>
            </div>
            <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
              {title}
            </h3>
            <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
            <p className="mb-10 font-medium">{message}</p>
            <div className="-mx-3 flex w-full flex-wrap items-center justify-center gap-y-4">
              <div className="w-full px-3 2xsm:w-1/2">
                <button className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition transition hover:border-meta-1 hover:bg-meta-1 hover:bg-opacity-90 hover:text-white">
                  {viewDetailsButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
