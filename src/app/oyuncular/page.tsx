"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { Category, Level, SubCategory } from "@/models/Category";
import {
  GetAllCategoryDatas,
  GetAllLevels,
  GetAllSubCategoryDatas,
  DeleteLevel,
  GetAllusers,
} from "@/services/apiService";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CardDataStats from "@/components/CardDataStats";
import Loader from "@/components/common/Loader";
import { User } from "@/models/User";
import moment from "moment";
import "moment/locale/tr";

const CalendarPage = () => {
  const [users, SetUsers] = useState<User[]>([]);
  const [tempUsers, SetTempUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  // Functions
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  //@ts-ignore
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      SetTempUsers(
        users.filter(
          (a) =>
            a.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
            (a.firstName + a.lastName)
              .toLowerCase()
              .includes(event.target.value.toLowerCase()),
        ),
      );
    } else {
      SetTempUsers(users);
    }
  };
  // Hooks

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _users = await GetAllusers();
        if (_users?.objectData) {
          SetUsers(_users.objectData);
          SetTempUsers(_users.objectData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
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
                placeholder="İsim soyisim veya E-Posta adresine göre arayın.."
                className="w-full bg-transparent px-4 py-4 pl-4 pr-4  font-medium focus:outline-none xl:w-125"
                onChange={handleTextChange}
              />
            </div>
          </div>

          <CardDataStats
            title="Toplam Oyuncu"
            total={users?.length.toString()}
            rate={users?.filter((a) => a.isActive).length + " adet aktif"}
            levelUp={false}
          >
            <TotalDataIcon />
          </CardDataStats>

          <CategoriesTable users={tempUsers} openModal={openModal} />
        </>
      )}
    </DefaultLayout>
  );
};

export default CalendarPage;

interface CategoriesTableProps {
  users: User[];
  openModal: (args0: boolean) => void;
}

const CategoriesTable = ({ users, openModal }: CategoriesTableProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] max-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                E-Mail
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Kayıt Tarihi
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Son Güncelleme
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                OneSignal ID
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Zümrüt
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Yıldız
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Düzenle
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.email == "" ? "-" : packageItem.email}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {moment(packageItem.registerDate.toString()).format(
                      "DD MMM YYYY HH:mm",
                    )}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {moment(packageItem.lastUpdateDate.toString()).format(
                      "DD MMM YYYY HH:mm",
                    )}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.oneSignalID ? packageItem.oneSignalID : "-"}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.coins}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.stars}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      className="hover:text-primary"
                      href={`/oyuncu-duzenle?id=${encodeURIComponent(packageItem.id)}`}
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
