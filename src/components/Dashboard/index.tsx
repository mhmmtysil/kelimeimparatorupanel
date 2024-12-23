"use client";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import Link from "next/link";
import {
  GetAllCategoryDatas,
  GetAllLevels,
  GetAllSubCategoryDatas,
} from "@/services/apiService";
import { useSession } from "next-auth/react";
import { Category, Level, SubCategory } from "@/models/Category";

const ECommerce: React.FC = () => {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const _categories = await GetAllCategoryDatas();
      const _subcategories = await GetAllSubCategoryDatas();
      const _levels = await GetAllLevels();
      setCategories(_categories.objectData);
      setSubCategories(_subcategories.objectData);
      setLevels(_levels.objectData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {loading ? (
          <></>
        ) : (
          <Link href={"/ana-kategoriler"}>
            {/* <CardDataStats
              href=""
              title="Kategoriler"
              total={categories?.length.toString()}
              rate={categories?.filter((a) => a.isActive).length + " Aktif"}
              levelUp={false}
            >
              <svg
                className="fill-primary dark:fill-white"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                  fill=""
                />
                <path
                  d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                  fill=""
                />
                <path
                  d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                  fill=""
                />
                <path
                  d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                  fill=""
                />
              </svg>
            </CardDataStats> */}
          </Link>
        )}
        {loading ? (
          <></>
        ) : (
          <Link href={"/alt-kategoriler"}>
            {/* <CardDataStats
              href=""
              title="Alt Kategoriler"
              total={subCategories?.length.toString()}
              rate={subCategories.filter((a) => a.isActive).length + " Aktif"}
              levelUp={false}
            >
              <svg
                className="fill-primary dark:fill-white"
                width="18"
                height="18"
                viewBox="0 0 30 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 8H23V10H28V16H21V18H24V20.142C23.0574 20.3854 22.2358 20.9642 21.6894 21.77C21.143 22.5758 20.9092 23.5532 21.0319 24.519C21.1546 25.4848 21.6253 26.3727 22.3558 27.0163C23.0863 27.6599 24.0264 28.015 25 28.015C25.9736 28.015 26.9137 27.6599 27.6442 27.0163C28.3747 26.3727 28.8455 25.4848 28.9681 24.519C29.0908 23.5532 28.857 22.5758 28.3106 21.77C27.7642 20.9642 26.9427 20.3854 26 20.142V18H28C28.5302 17.9993 29.0385 17.7883 29.4134 17.4134C29.7884 17.0385 29.9993 16.5302 30 16V10C29.9994 9.46975 29.7885 8.9614 29.4136 8.58646C29.0386 8.21152 28.5303 8.00061 28 8ZM27 24C27 24.3956 26.8827 24.7822 26.6629 25.1111C26.4432 25.44 26.1308 25.6964 25.7654 25.8478C25.3999 25.9991 24.9978 26.0387 24.6098 25.9616C24.2219 25.8844 23.8655 25.6939 23.5858 25.4142C23.3061 25.1345 23.1156 24.7781 23.0384 24.3902C22.9613 24.0022 23.0009 23.6001 23.1523 23.2346C23.3036 22.8692 23.56 22.5568 23.8889 22.3371C24.2178 22.1173 24.6044 22 25 22C25.5302 22.0007 26.0385 22.2117 26.4134 22.5866C26.7884 22.9615 26.9993 23.4698 27 24Z"
                  fill=""
                />
                <path
                  d="M18 4H13V6H18V12H11V14H14V20.142C13.0574 20.3854 12.2358 20.9642 11.6894 21.77C11.143 22.5758 10.9092 23.5532 11.0319 24.519C11.1546 25.4848 11.6253 26.3727 12.3558 27.0163C13.0863 27.6599 14.0264 28.015 15 28.015C15.9736 28.015 16.9137 27.6599 17.6442 27.0163C18.3747 26.3727 18.8455 25.4848 18.9681 24.519C19.0908 23.5532 18.857 22.5758 18.3106 21.77C17.7642 20.9642 16.9427 20.3854 16 20.142V14H18C18.5303 13.9994 19.0386 13.7885 19.4136 13.4135C19.7885 13.0386 19.9994 12.5302 20 12V6C19.9994 5.46975 19.7885 4.9614 19.4136 4.58646C19.0386 4.21152 18.5303 4.00061 18 4ZM17 24C17 24.3956 16.8827 24.7822 16.6629 25.1111C16.4432 25.44 16.1308 25.6964 15.7654 25.8478C15.3999 25.9991 14.9978 26.0387 14.6098 25.9616C14.2219 25.8844 13.8655 25.6939 13.5858 25.4142C13.3061 25.1345 13.1156 24.7781 13.0384 24.3902C12.9613 24.0022 13.0009 23.6001 13.1523 23.2346C13.3036 22.8692 13.56 22.5568 13.8889 22.3371C14.2178 22.1173 14.6044 22 15 22C15.5302 22.0007 16.0385 22.2117 16.4134 22.5866C16.7884 22.9615 16.9993 23.4698 17 24Z"
                  fill=""
                />
                <path
                  d="M8 0H2C1.46973 0.000529477 0.961329 0.211413 0.586371 0.586371C0.211413 0.961329 0.000529477 1.46973 0 2V8C0.000529477 8.53027 0.211413 9.03867 0.586371 9.41363C0.961329 9.78859 1.46973 9.99947 2 10H4V20.142C3.05734 20.3854 2.23581 20.9642 1.6894 21.77C1.14299 22.5758 0.909207 23.5532 1.03188 24.519C1.15456 25.4848 1.62526 26.3727 2.35577 27.0163C3.08627 27.6599 4.02643 28.015 5 28.015C5.97357 28.015 6.91373 27.6599 7.64423 27.0163C8.37474 26.3727 8.84544 25.4848 8.96812 24.519C9.09079 23.5532 8.85701 22.5758 8.3106 21.77C7.76419 20.9642 6.94266 20.3854 6 20.142V10H8C8.53027 9.99947 9.03867 9.78859 9.41363 9.41363C9.78859 9.03867 9.99947 8.53027 10 8V2C9.99947 1.46973 9.78859 0.961329 9.41363 0.586371C9.03867 0.211413 8.53027 0.000529477 8 0ZM7 24C7 24.3956 6.8827 24.7822 6.66294 25.1111C6.44318 25.44 6.13082 25.6964 5.76537 25.8478C5.39991 25.9991 4.99778 26.0387 4.60982 25.9616C4.22186 25.8844 3.86549 25.6939 3.58579 25.4142C3.30608 25.1345 3.1156 24.7781 3.03843 24.3902C2.96126 24.0022 3.00087 23.6001 3.15224 23.2346C3.30362 22.8692 3.55996 22.5568 3.88886 22.3371C4.21776 22.1173 4.60444 22 5 22C5.53025 22.0006 6.0386 22.2115 6.41354 22.5865C6.78848 22.9614 6.99939 23.4698 7 24ZM2 8V2H8L8.0015 8H2Z"
                  fill=""
                />
              </svg>
            </CardDataStats> */}
          </Link>
        )}
        {loading ? (
          <></>
        ) : (
          <Link href={"/seviyeler"}>
            {/* <CardDataStats
              href=""
              title="Bölümler"
              total={levels.length.toString()}
              rate={levels.filter((a) => a.isActive).length + " Aktif"}
              levelUp={false}
            >
              <svg
                className="fill-primary dark:fill-white"
                width="18"
                height="18"
                viewBox="0 0 25 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.7108 0C23.2399 0 22.87 0.386299 22.87 0.876623C22.87 1.36695 23.2399 1.75325 23.7108 1.75325C24.1816 1.75325 24.5516 1.36695 24.5516 0.876623C24.5516 0.386299 24.1816 0 23.7108 0ZM24.1031 2.95305L19.5123 4.14935L24.1031 5.3474V2.95305ZM23.2063 6.19481V23.2597H24.2152V6.45779L23.2063 6.19481ZM14.3498 9.35065V12.039H16.9283V9.35065H14.3498ZM10.7623 13.0909V15.7792H13.3408V13.0909H10.7623ZM14.3498 13.0909V15.7792H16.9283V13.0909H14.3498ZM7.17489 16.8312V19.5195H9.75336V16.8312H7.17489ZM10.7623 16.8312V19.5195H13.3408V16.8312H10.7623ZM14.3498 16.8312V19.5195H16.9283V16.8312H14.3498ZM3.58744 20.5714V23.2597H6.16592V20.5714H3.58744ZM7.17489 20.5714V23.2597H9.75336V20.5714H7.17489ZM10.7623 20.5714V23.2597H13.3408V20.5714H10.7623ZM14.3498 20.5714V23.2597H16.9283V20.5714H14.3498ZM0 24.3117V27H2.57848V24.3117H0ZM3.58744 24.3117V27H6.16592V24.3117H3.58744ZM7.17489 24.3117V27H9.75336V24.3117H7.17489ZM10.7623 24.3117V27H13.3408V24.3117H10.7623ZM14.3498 24.3117V27H16.9283V24.3117H14.3498ZM22.4215 24.3117V27H25V24.3117H22.4215Z"
                  fill=""
                />
              </svg>
            </CardDataStats> */}
          </Link>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"></div>
    </>
  );
};

export default ECommerce;
