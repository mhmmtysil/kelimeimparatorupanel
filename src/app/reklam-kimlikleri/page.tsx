"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/common/Loader";
import { Advertisement } from "@/models/Advertisement";
import { Category } from "@/models/Category";
import { DeleteCategory, GetAdvertisementIds } from "@/services/apiService";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CalendarPage = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  // Functions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _ads = await GetAdvertisementIds();
        setLoading(false);
        setAds(_ads.objectData);
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
          <CategoriesTable data={ads} />
        </>
      )}
    </DefaultLayout>
  );
};

export default CalendarPage;

interface CategoriesTableProps {
  data: Advertisement[];
}

const CategoriesTable = ({ data }: CategoriesTableProps) => {
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
                Reklam Birimi Adı
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Reklam Kimliği
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Platform
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Düzenle
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.adName}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.advertisementId}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {packageItem.platform == "ios" ? (
                    <AndroidIcon />
                  ) : (
                    <IosIcon />
                  )}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      className="hover:text-primary"
                      href={`/reklam-kimligi-duzenle?id=${encodeURIComponent(packageItem.id)}&adName=${encodeURIComponent(packageItem.adName)}&platform=${encodeURIComponent(packageItem.platform)}&advertisementId=${encodeURIComponent(packageItem.advertisementId)}&isActive=${encodeURIComponent(packageItem.isActive)}&isDeleted=${encodeURIComponent(packageItem.isDeleted)}`}
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

const AndroidIcon = () => {
  return (
    <svg
      width="35"
      height="38"
      viewBox="0 0 42 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
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
      width="35"
      height="38"
      viewBox="0 0 42 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28.6202 7.66296C30.37 5.63497 31.5495 2.81038 31.2267 0C28.7052 0.0960009 25.6546 1.61077 23.8465 3.63636C22.2229 5.43395 20.8056 8.30623 21.1867 11.0614C23.9994 11.2702 26.8705 9.69333 28.6202 7.66296ZM34.9277 25.5002C34.9981 32.765 41.5774 35.1816 41.6502 35.2128C41.5968 35.3832 40.5994 38.6563 38.1846 42.0402C36.0951 44.9634 33.9279 47.8748 30.5132 47.9372C27.1592 47.9972 26.0793 46.0317 22.2424 46.0317C18.4079 46.0317 17.209 47.8745 14.0346 47.9969C10.7389 48.1145 8.22705 44.8343 6.12293 41.9207C1.81763 35.9615 -1.47081 25.0804 2.94614 17.7365C5.14005 14.0909 9.05947 11.7788 13.3162 11.7212C16.5513 11.6612 19.6068 13.8072 21.5847 13.8072C23.5626 13.8072 27.2757 11.2272 31.1782 11.6064C32.8115 11.6712 37.3983 12.2374 40.3421 16.3677C40.1043 16.5093 34.8695 19.4283 34.9277 25.5002Z"
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
