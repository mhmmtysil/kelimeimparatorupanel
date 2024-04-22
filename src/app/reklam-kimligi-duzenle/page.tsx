"use client";
import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SetStateAction, useEffect, useState } from "react";
import {
  Category,
  Level,
  SubCategory,
  UpdateCategoryModel,
} from "@/models/Category";
import {
  GetAllSubCategoryDatas,
  UpdateAdvert,
  UpdateLevel,
} from "@/services/apiService";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/common/Loader";
import UpdateSuccess from "@/components/UpdateSuccess";
import UpdateError from "@/components/UpdateError";
import { useSession } from "next-auth/react";
import CustomModal from "@/components/CustomModal";
import { UpdateAdvertModel } from "@/models/Advertisement";

interface Props {
  initialList: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  // id
  //adName
  //platform
  //advertisementId
  //isActive
  //isDeleted
  const _id = searchParams.get("id") || 0;
  const _adName = searchParams.get("adName") || "";
  const _platform = searchParams.get("platform") || "";
  const _advertisementId = searchParams.get("advertisementId") || "";
  const _isActive = searchParams.get("isActive") || false;
  const _isDeleted = searchParams.get("isDeleted") || false;

  const [loading, setLoading] = useState(false);

  const [platform, setPlatform] = useState(_platform || "ios");
  const [adName, setAdName] = useState(_adName || "");
  const [advertId, setAdvertId] = useState(_advertisementId || "");

  const [isActive, setActive] = useState(_isActive == "true");
  const [isDeleted, setDeleted] = useState(_isDeleted == "true");
  const [successActive, setSuccessActive] = useState(false);
  const [errorActive, setErrorActive] = useState(false);

  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [errorText, setErrorText] = useState("");
  const [resultState, setResultState] = useState<"success" | "error">(
    "success",
  );

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  async function UpdateCategoryFromDatabase() {
    var _advert: UpdateAdvertModel = {
      id: Number(_id),
      platform: platform,
      adName: adName,
      advertisementId: advertId,
      isActive: isActive,
      isDeleted: isDeleted,
    };

    var a = await UpdateAdvert(_advert);
    setResultState(a?.code === "100" ? "success" : "error");
    if (a?.code == "100") {
      setErrorText("Reklam kimliği başarıyla güncellendi. ");
    } else {
      setErrorText("Reklam kimliği güncellenemedi.");
    }
    setModalOpen(true);
    setLoading(false);
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
                  {_id} numaralı Id'ye ait Reklam Kimliğini Düzenle
                </h3>
              </div>

              {/* Kategori Adı */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Reklam Birimi Adı:{" "}
                  <span className="text-meta-1">
                    *Ne yaptığını bilmiyorsan değiştirme.
                  </span>
                </label>

                <div className="mb-2 flex items-center gap-3">
                  <input
                    type="text"
                    value={adName}
                    onChange={(e) => {
                      setAdName(e.target.value);
                    }}
                    placeholder={"Uygulamada oluşturulan reklam birimi adı."}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* Reklam Kimliği */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Reklam Kimliği:{" "}
                  <span className="text-meta-1">
                    *Admob üzerinden eklenen reklam kimliği.
                  </span>
                </label>

                <div className="mb-2 flex items-center gap-3">
                  <input
                    type="text"
                    value={advertId}
                    onChange={(e) => {
                      setAdvertId(e.target.value);
                    }}
                    placeholder={"Admob üzerinde oluşturulan Reklam Kimliği"}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* Platform */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Platform Seçimi:
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                    {platform == "android" ? <AndroidIcon /> : <IosIcon />}
                  </span>

                  <select
                    value={platform}
                    onChange={(e) => {
                      setPlatform(e.target.value);
                      changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      isOptionSelected ? "text-black dark:text-white" : ""
                    }`}
                  >
                    <option
                      key={0}
                      value={"ios"}
                      className="text-body dark:text-bodydark"
                    >
                      iOS
                    </option>
                    <option
                      key={1}
                      value={"android"}
                      className="text-body dark:text-bodydark"
                    >
                      Android
                    </option>
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
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Aktif Mi?{" "}
                  <span className="text-meta-1">
                    *Kapalı olursa bu reklam birimine istek atılmayacaktır.
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
                  href={"/reklam-kimlikleri"}
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
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red transition ${
              isActive &&
              "dark:!bg-green !right-1 !translate-x-full !bg-success"
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
                className="h-4 w-4 stroke-white"
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

const AndroidIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 42 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.727 9.6009C25.9354 9.6009 25.2945 8.9772 25.2945 8.20673C25.2945 7.43627 25.9354 6.81538 26.727 6.81538C27.5187 6.81538 28.1595 7.43627 28.1595 8.20673C28.1595 8.9772 27.5187 9.6009 26.727 9.6009ZM15.273 9.6009C14.4813 9.6009 13.8405 8.9772 13.8405 8.20673C13.8405 7.43627 14.4813 6.81538 15.273 6.81538C16.0646 6.81538 16.7055 7.43627 16.7055 8.20673C16.7055 8.9772 16.0646 9.6009 15.273 9.6009ZM27.5737 4.01856L28.1073 3.23402L28.6408 2.4607L29.8297 0.722236C29.9776 0.507747 29.9167 0.219853 29.6964 0.0787421C29.4789 -0.0651909 29.1802 -0.00592515 29.0381 0.208564L27.2229 2.85297L26.6777 3.64887C24.9524 2.99694 23.0298 2.63288 21 2.63288C18.9731 2.63288 17.0476 2.99694 15.3223 3.64887L14.78 2.85297L14.2436 2.07123L12.9677 0.208564C12.8198 -0.00592515 12.524 -0.0623689 12.3036 0.0787421C12.0862 0.219853 12.0253 0.507747 12.1703 0.722236L13.3592 2.4607L13.8927 3.23402L14.4292 4.01856C10.3782 5.85583 7.63794 9.33561 7.63794 13.3178H34.3621C34.3621 9.33561 31.6218 5.85583 27.5737 4.01856ZM7.84384 15.1748H7.63794V35.6133C7.63794 37.2361 8.99213 38.5569 10.6624 38.5569H12.843C12.7676 38.8024 12.727 39.0592 12.727 39.3301V45.2145C12.727 46.7526 14.0116 48 15.5919 48C17.1723 48 18.4569 46.7526 18.4569 45.2145V39.3301C18.4569 39.0592 18.4134 38.8024 18.3409 38.5569H23.6591C23.5866 38.8024 23.546 39.0592 23.546 39.3301V45.2145C23.546 46.7526 24.8277 48 26.4081 48C27.9913 48 29.2759 46.7526 29.2759 45.2145V39.3301C29.2759 39.0592 29.2324 38.8024 29.157 38.5569H31.3405C33.0108 38.5569 34.3621 37.2361 34.3621 35.6133V15.1748H7.84384ZM2.86496 15.1748C1.2817 15.1748 0 16.4222 0 17.9603V29.8842C0 31.4223 1.2817 32.6697 2.86496 32.6697C4.44532 32.6697 5.72702 31.4223 5.72702 29.8842V17.9603C5.72702 16.4222 4.44532 15.1748 2.86496 15.1748ZM39.1379 15.1748C37.5547 15.1748 36.273 16.4222 36.273 17.9603V29.8842C36.273 31.4223 37.5547 32.6697 39.1379 32.6697C40.7183 32.6697 42 31.4223 42 29.8842V17.9603C42 16.4222 40.7183 15.1748 39.1379 15.1748Z"
        fill="#95CF00"
      />
    </svg>
  );
};
const IosIcon = () => {
  return (
    <svg
      className="fill-current"
      width="20"
      height="20"
      viewBox="0 0 42 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.6202 7.66296C30.37 5.63497 31.5495 2.81038 31.2267 0C28.7052 0.0960009 25.6546 1.61077 23.8465 3.63636C22.2229 5.43395 20.8056 8.30623 21.1867 11.0614C23.9994 11.2702 26.8705 9.69333 28.6202 7.66296ZM34.9277 25.5002C34.9981 32.765 41.5774 35.1816 41.6502 35.2128C41.5968 35.3832 40.5994 38.6563 38.1846 42.0402C36.0951 44.9634 33.9279 47.8748 30.5132 47.9372C27.1592 47.9972 26.0793 46.0317 22.2424 46.0317C18.4079 46.0317 17.209 47.8745 14.0346 47.9969C10.7389 48.1145 8.22705 44.8343 6.12293 41.9207C1.81763 35.9615 -1.47081 25.0804 2.94614 17.7365C5.14005 14.0909 9.05947 11.7788 13.3162 11.7212C16.5513 11.6612 19.6068 13.8072 21.5847 13.8072C23.5626 13.8072 27.2757 11.2272 31.1782 11.6064C32.8115 11.6712 37.3983 12.2374 40.3421 16.3677C40.1043 16.5093 34.8695 19.4283 34.9277 25.5002Z"
        fill=""
      />
    </svg>
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
