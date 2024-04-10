"use client";
import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SetStateAction, useEffect, useState } from "react";
import { Category, UpdateCategoryModel } from "@/models/Category";
import { UpdateCategory } from "@/services/apiService";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/common/Loader";
import UpdateSuccess from "@/components/UpdateSuccess";
import UpdateError from "@/components/UpdateError";

const Page = () => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id") || 0;
  const categoryName = searchParams.get("categoryName") || "";
  const categoryActive = searchParams.get("isActive") || "";
  const categoryDeleted = searchParams.get("isDeleted") || "";

  const [inputValue, setInputValue] = useState(
    searchParams.get("categoryName") || "",
  );
  const [isActive, setActive] = useState(categoryActive == "true");
  const [isDeleted, setDeleted] = useState(categoryDeleted == "true");

  const [successActive, setSuccessActive] = useState(false);
  const [errorActive, setErrorActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSuccessActive(false);
    }, 3000);
  }, [successActive]);
  useEffect(() => {
    setTimeout(() => {
      setErrorActive(false);
    }, 3000);
  }, [errorActive]);

  async function UpdateCategoryFromDatabase() {
    if (selectedId != null) {
      var updateCategory: UpdateCategoryModel = {
        categoryId: Number(selectedId),
        categoryName: inputValue,
        isActive: isActive,
        isDeleted: isDeleted,
      };
      setLoading(true);
      var a = await UpdateCategory(updateCategory);
      if (a?.code == "100") {
        setSuccessActive(true);
        setErrorActive(false);
      } else {
        setSuccessActive(false);
        setErrorActive(true);
      }
      setLoading(false);
    }
  }

  return (
    <DefaultLayout>
      {loading && <Loader />}
      {!loading && (
        <div className="flex flex-col items-center py-4">
          <div className="flex w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full flex-col gap-5.5 p-6.5">
              <div className="border-b border-stroke py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {selectedId} Numaralı Kategori'yi Düzenle
                </h3>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Kategori Adı: <span className="">*Zorunlu alan</span>
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(text) => {
                    setInputValue(text.target.value);
                  }}
                  placeholder={categoryName}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Aktif Mi?{" "}
                  <span className="text-meta-1">
                    *Kapalı olursa bu kategorideki{" "}
                    <span className="text-danger underline">Tüm</span> seviyeler
                    pasif olur{" "}
                  </span>
                </label>
                <Switch isActive={isActive} setActive={setActive} />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Silinecek mi?
                </label>
                <Switch isActive={isDeleted} setActive={setDeleted} />
              </div>

              <div className="gap-2.5flex flex justify-end gap-2.5">
                {successActive && !loading && (
                  <UpdateSuccess title="Başarıyla güncellendi." />
                )}
                {errorActive && !loading && (
                  <UpdateError title={"Güncelleme sırasında hata."} />
                )}
                <button
                  onClick={UpdateCategoryFromDatabase}
                  className="inline-flex items-center justify-center gap-2.5 rounded-md bg-green-500 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5"
                >
                  <span>
                    <UpdateTick />
                  </span>
                  Güncelle
                </button>
                <Link
                  passHref
                  href={"/ana-kategoriler"}
                  className="inline-flex items-center justify-center gap-2.5 rounded-md bg-danger px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5"
                >
                  <span>
                    <CloseIcon />
                  </span>
                  Vazgeç
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Page;

interface SwitchProps {
  isActive: boolean;
  setActive: (args0: boolean) => void;
}

const Switch = ({ isActive, setActive }: SwitchProps) => {
  return (
    <div>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            id="toggle3"
            className="sr-only"
            onChange={() => {
              setActive(!isActive);
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isActive &&
              "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          >
            <span className={`hidden ${isActive && "!block"}`}>
              <svg
                className="fill-white dark:fill-black"
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                  fill=""
                  stroke=""
                  strokeWidth="0.4"
                ></path>
              </svg>
            </span>
            <span className={`${isActive && "hidden"}`}>
              <svg
                className="h-4 w-4 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};

const UpdateTick = () => {
  return (
    <svg
      className="fill-current"
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2073 0.205533C18.6461 0.540902 18.7299 1.16849 18.3946 1.60729L7.69456 15.6073C7.53139 15.8208 7.28918 15.9596 7.0225 15.9925C6.75583 16.0254 6.48713 15.9496 6.27696 15.7822L0.376961 11.0822C-0.0550141 10.7381 -0.126238 10.109 0.217878 9.67698C0.561994 9.245 1.19114 9.17378 1.62312 9.51789L6.72508 13.5822L16.8055 0.392813C17.1409 -0.0459881 17.7685 -0.129836 18.2073 0.205533Z"
        fill="white"
      />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      className="fill-current"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9007 2.3121C14.2374 1.96352 14.2403 1.40112 13.9071 1.05593C13.5739 0.710744 13.0308 0.713493 12.694 1.06207L7.17882 6.77086L1.51327 1.29743C1.1647 0.960676 0.602289 0.957794 0.257102 1.291C-0.0880853 1.6242 -0.0853346 2.16731 0.263243 2.50407L5.9724 8.01963L0.498956 13.6852C0.162198 14.0338 0.159317 14.5962 0.49252 14.9414C0.825723 15.2866 1.36883 15.2838 1.70559 14.9352L7.22117 9.22605L12.8864 14.6991C13.2349 15.0359 13.7974 15.0388 14.1425 14.7056C14.4877 14.3724 14.485 13.8293 14.1364 13.4925L8.42759 7.97728L13.9007 2.3121Z"
        fill="white"
      />
    </svg>
  );
};
