"use client";
import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SetStateAction, useEffect, useState } from "react";
import { Category, SubCategory } from "@/models/Category";
import {
  GetAllCategoryDatas,
  GetAllSubCategoryDatas,
  DeleteCategory,
  DeleteSubCategory,
} from "@/services/apiService";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CardDataStats from "@/components/CardDataStats";
import Loader from "@/components/common/Loader";
import { useSession } from "next-auth/react";
import CustomModal from "@/components/CustomModal";

const CalendarPage = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [resultCategories, setResultCategories] = useState<SubCategory[]>([]);

  const [selectedId, setSelectedId] = useState<SubCategory | null>(null);
  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState<any>();
  const [resultState, setResultState] = useState<
    "success" | "error" | "question"
  >("success");

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);
  const [loading, setLoading] = useState(true);
  // Functions

  const fetchData = async () => {
    try {
      const _categories = await GetAllCategoryDatas();

      setCategories(_categories.object);
      const _subCategories = await GetAllSubCategoryDatas(
        ,
      );
      setSubCategories(_subCategories.object);

      setResultCategories(_subCategories.object);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      setResultCategories(
        subCategories.filter((a) =>
          a.title.toLowerCase().includes(event.target.value.toLowerCase()),
        ),
      );
    } else {
      setResultCategories(subCategories);
    }
  };
  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }
  function openResultodal() {
    setResultModal(true);
  }

  function closeResultModal() {
    setResultModal(false);
  }

  async function deleteCategoryFromServer(deleteId: number) {
    if (deleteId != null) {
      const deleteResult = await DeleteSubCategory(
        deleteId,
        ,
      );
      // if(deleteResult.)
      if (deleteResult.code == "100") {
        fetchData();
      }

      setResultText(deleteResult);
      openResultodal();
    }
  }

  // Hooks

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col items-center py-4">
            <div className="w-full rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <input
                type="text"
                placeholder="Kategori ismine göre arayın..."
                className="w-full bg-transparent px-4 py-4 pl-4 pr-4  font-medium focus:outline-none xl:w-125"
                onChange={handleTextChange}
              />
            </div>
          </div>

          <CardDataStats
            title="Toplam Alt Kategori"
            total={subCategories.length.toString()}
            rate={
              subCategories.filter((a) => a.isActive).length + " adet aktif"
            }
            levelUp={false}
            buttonText="Yeni Alt Kategori Ekle"
            href="/yeni-alt-kategori"
          >
            <TotalDataIcon />
          </CardDataStats>

          <CategoriesTable
            data={resultCategories}
            openModal={openModal}
            selectId={setSelectedId}
            categories={categories}
          />

          <CustomModal
            isOpen={modalOpen}
            closeModal={() => {
              if (selectedId?.id != null)
                deleteCategoryFromServer(selectedId?.id);
              setModalOpen(false);
            }}
            title={"Bu kayıt silinecek. Onaylıyor musunuz? "}
            message={`Kategori ID'si : ${selectedId?.id} \nKategori Adı : ${selectedId?.title}`}
            viewDetailsButtonText={"Tamam"}
            type={resultState}
          />

          {/* Result Modal */}
          <Dialog
            as="div"
            className="bg-gray-400 fixed fixed inset-0 inset-0 overflow-y-auto"
            open={resultModal}
            onClose={closeResultModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="bg-gray-400 fixed inset-0 opacity-70" />

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left text-center align-middle shadow-xl transition-all">
                <Dialog.Title className="text-gray-900 text-2xl leading-6">
                  İşlem sonuçlandı.
                </Dialog.Title>
                {resultText?.code == "100" ? (
                  <Dialog.Title className="mt-3 text-2xl leading-8 text-green-500">
                    {resultText?.object?.resultText}
                  </Dialog.Title>
                ) : (
                  <Dialog.Title className="mt-3 text-2xl leading-8 text-danger">
                    {resultText?.object?.resultText}
                  </Dialog.Title>
                )}

                <div className="mt-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => closeResultModal()}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </DefaultLayout>
  );
};

export default CalendarPage;

interface CategoriesTableProps {
  data: SubCategory[];
  categories: Category[];
  openModal: (args0: boolean) => void;
  selectId: (args0: SubCategory) => void;
}

const CategoriesTable = ({
  data,
  openModal,
  selectId,
  categories,
}: CategoriesTableProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] max-w-[100px]  px-4 py-4 font-medium text-black dark:text-white">
                ID
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Ana Kategori Adı
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Kategori Adı
              </th>
              <th className="min-w-[150px] px-4 py-4 text-center font-medium text-black dark:text-white">
                Maksimum Harf
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Durum
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Düzenle
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.id}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {
                      categories.find((a) => a.id == packageItem.categoryId)
                        ?.categoryName
                    }
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.title}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-center text-center text-black dark:text-white">
                    {packageItem.maxLetters}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      packageItem.isActive
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {packageItem.isActive ? "Aktif" : "Silinmiş"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        selectId(packageItem);
                        openModal(false);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                    <Link
                      className="hover:text-primary"
                      href={`/alt-kategori-duzenle?id=${encodeURIComponent(packageItem.id)}&categoryName=${encodeURIComponent(packageItem.title)}&mainCategoryId=${encodeURIComponent(packageItem.categoryId)}&maxLetters=${encodeURIComponent(packageItem.maxLetters)}&isActive=${encodeURIComponent(packageItem.isActive)}&isDeleted=${encodeURIComponent(packageItem.isDeleted)}`}
                    >
                      <EditIcon />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      className="fill-current"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
        fill=""
      />
      <path
        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
        fill=""
      />
      <path
        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
        fill=""
      />
      <path
        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
        fill=""
      />
    </svg>
  );
};
const EditIcon = () => {
  return (
    <svg
      className="fill-current"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8" clipPath="url(#clip0_88_10224)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
          fill=""
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
          fill=""
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_88_10224">
          <rect width="20" height="20" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

const TotalDataIcon = () => {
  return (
    <svg
      className="fill-primary dark:fill-white"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>data-storage-check</title>{" "}
        <g id="Layer_2" data-name="Layer 2">
          {" "}
          <g id="invisible_box" data-name="invisible box">
            {" "}
            <rect width="48" height="48" fill="none"></rect>{" "}
          </g>{" "}
          <g id="icons_Q2" data-name="icons Q2">
            {" "}
            <g>
              {" "}
              <circle cx="38" cy="36" r="2"></circle>{" "}
              <circle cx="32" cy="36" r="2"></circle>{" "}
              <circle cx="38" cy="24" r="2"></circle>{" "}
              <circle cx="32" cy="24" r="2"></circle>{" "}
              <path d="M44,4H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H42v8H28a2,2,0,0,0,0,4H42v8H28a2,2,0,0,0,0,4H44a2,2,0,0,0,2-2V6A2,2,0,0,0,44,4ZM6,16V8H42v8Z"></path>{" "}
              <circle cx="38" cy="12" r="2"></circle>{" "}
              <circle cx="32" cy="12" r="2"></circle>{" "}
              <path d="M19.6,26.6,9,37.2,6.4,34.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l4,3.9a1.9,1.9,0,0,0,2.8,0l12-12a2,2,0,0,0-2.8-2.8Z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
