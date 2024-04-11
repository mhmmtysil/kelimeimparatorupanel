"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { Category, NewSubCategoryModel, SubCategory } from "@/models/Category";
import { GetAllCategoryDatas, AddNewSubCategory } from "@/services/apiService";
import Loader from "@/components/common/Loader";
import UpdateSuccess from "@/components/UpdateSuccess";
import UpdateError from "@/components/UpdateError";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CustomModal from "@/components/CustomModal";

const Page = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [letterCount, setLetterCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [isActive, setActive] = useState(true);
  const [isDeleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [resultState, setResultState] = useState<"success" | "error">(
    "success",
  );

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _categories = await GetAllCategoryDatas();

        setCategories(_categories.object);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function AddNewCategoryToDatabase() {
    var updateCategory: NewSubCategoryModel = {
      title: inputValue,
      maxLetters: letterCount,
      isActive: true,
      isDeleted: false,
      categoryId: selectedOption,
    };
    setLoading(true);
    if (updateCategory.categoryId != null || updateCategory.categoryId != 0) {
      var a = await AddNewSubCategory(updateCategory);
      setResultState(a?.code === "100" ? "success" : "error");
      if (a?.code == "100") {
        setErrorText("Alt kategori başarıyla eklendi.");
      } else {
        setErrorText("" + a.object?.resultText);
      }
    } else {
      setErrorText("Alt kategori bulunamadı.");
    }
    setModalOpen(true);
    setLoading(false);
  }

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <DefaultLayout>
      {loading && <Loader />}
      {!loading && (
        <div className="flex flex-col items-center py-4">
          <div className="flex w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full flex-col gap-5.5 p-6.5">
              <div className="border-b border-stroke py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Yeni Alt Kategori Ekle
                </h3>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Alt Kategori Adı:
                  <span className="text-meta-1">*Zorunlu alan</span>
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(text) => {
                    setInputValue(text.target.value);
                  }}
                  placeholder={"Alt Kategori Adı"}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Maksimum Harf sayısı:
                  <span className="text-meta-1">*Zorunlu alan</span>
                </label>
                <input
                  type="text"
                  value={letterCount}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = inputValue.replace(/\D/g, ""); // Sadece sayıları al
                    setLetterCount(Number(numericValue));
                  }}
                  placeholder={"0"}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="relative z-20 bg-white dark:bg-form-input">
                <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </span>

                <select
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(Number(e.target.value));
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-black dark:text-white" : ""
                  }`}
                >
                  <option
                    value={0}
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Kategori Seçiniz.
                  </option>
                  {categories.map((category, index) => (
                    <option
                      key={index}
                      value={category.id}
                      className="text-body dark:text-bodydark"
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>

                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Aktif Mi?
                  <span className="text-meta-1">
                    *Kapalı olursa bu kategorideki{" "}
                    <span className="text-danger underline">Tüm</span> seviyeler
                    pasif olur
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
                <button
                  onClick={AddNewCategoryToDatabase}
                  className="inline-flex items-center justify-center gap-2.5 rounded-md bg-green-500 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5"
                >
                  <span>
                    <UpdateTick />
                  </span>
                  Kaydet
                </button>
                <Link
                  passHref
                  href={"/alt-kategoriler"}
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
          <CustomModal
            isOpen={modalOpen}
            closeModal={handleCloseModal}
            title={
              resultState == "error"
                ? "Değişiklikler Kaydedilemedi."
                : "Değişiklikler Başarıyla Kaydedildi."
            }
            message={errorText}
            viewDetailsButtonText={"Tamam"}
            type={resultState}
          />
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
