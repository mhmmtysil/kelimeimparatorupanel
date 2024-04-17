"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-form-strokedark dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "bg-form-strokedark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <CategoriesIcon />
                        Kategoriler
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/ana-kategoriler"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/ana-kategoriler" && "text-white"
                              }`}
                            >
                              Ana Kategoriler
                            </Link>
                          </li>
                        </ul>

                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/alt-kategoriler"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/alt-kategoriler" && "text-white"
                              }`}
                            >
                              Alt Kategoriler
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Bölümler --> */}

              <li>
                <Link
                  href="/seviyeler"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-form-strokedark dark:hover:bg-meta-4 ${
                    pathname.includes("seviyeler") &&
                    "bg-form-strokedark dark:bg-meta-4"
                  }`}
                >
                  <LevelsIcon />
                  Bölümler
                </Link>
              </li>

              {/* <!-- Yeni Bölüm Ekle --> */}
              <li>
                <Link
                  href="/yeni-seviye"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-form-strokedark dark:hover:bg-meta-4 ${
                    pathname.includes("yeni-seviye") &&
                    "bg-form-strokedark dark:bg-meta-4"
                  }`}
                >
                  <AddNewLevelIcon />
                  Yeni Bölüm Ekle
                </Link>
              </li>

              {/* <!-- Excel Levels --> */}
              <li>
                <Link
                  href="/toplu-seviye"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-form-strokedark dark:hover:bg-meta-4 ${
                    pathname.includes("toplu-seviye") &&
                    "bg-form-strokedark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_852_23)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.08685 1.78021C8.24313 1.62393 8.45509 1.53613 8.67611 1.53613H15.3428C16.7235 1.53613 17.8428 2.65542 17.8428 4.03613V8.2028C17.8428 8.66303 17.4697 9.03613 17.0094 9.03613C16.5492 9.03613 16.1761 8.66303 16.1761 8.2028V4.03613C16.1761 3.5759 15.803 3.2028 15.3428 3.2028H9.50944V7.36947C9.50944 7.8297 9.13636 8.2028 8.67611 8.2028H4.50944V17.3695C4.50944 17.8297 4.88254 18.2028 5.34277 18.2028H6.17611C6.63634 18.2028 7.00944 18.5759 7.00944 19.0361C7.00944 19.4964 6.63634 19.8695 6.17611 19.8695H5.34277C3.96207 19.8695 2.84277 18.7502 2.84277 17.3695V7.36947C2.84277 7.14845 2.93057 6.93649 3.08685 6.78021L8.08685 1.78021ZM5.68795 6.53613H7.84277V4.38131L5.68795 6.53613ZM16.1761 10.7028C16.6364 10.7028 17.0094 11.0759 17.0094 11.5361V16.5361H19.5094C19.9697 16.5361 20.3428 16.9092 20.3428 17.3695C20.3428 17.8297 19.9697 18.2028 19.5094 18.2028H16.1761C15.7159 18.2028 15.3428 17.8297 15.3428 17.3695V11.5361C15.3428 11.0759 15.7159 10.7028 16.1761 10.7028ZM10.1875 11.0518C9.92002 10.6772 9.39961 10.5906 9.02511 10.8581C8.65057 11.1256 8.56382 11.646 8.83136 12.0205L10.5687 14.4528L8.83136 16.8851C8.56382 17.2596 8.65057 17.7801 9.02511 18.0476C9.39961 18.3151 9.92002 18.2284 10.1875 17.8538L11.5928 15.8866L12.998 17.8538C13.2655 18.2284 13.7859 18.3151 14.1604 18.0476C14.535 17.7801 14.6217 17.2596 14.3542 16.8851L12.6169 14.4528L14.3542 12.0205C14.6217 11.646 14.535 11.1256 14.1604 10.8581C13.7859 10.5906 13.2655 10.6772 12.998 11.0518L11.5928 13.0191L10.1875 11.0518Z"
                        fill="#3AE658"
                      />
                    </g>
                  </svg>
                  Toplu Bölüm Ekleme
                </Link>
              </li>

              {/* <!-- Yeni Bildirim Ekle --> */}
              <li>
                <Link
                  href="/yeni-bildirim"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-form-strokedark dark:hover:bg-meta-4 ${
                    pathname.includes("yeni-bildirim") &&
                    "bg-form-strokedark dark:bg-meta-4"
                  }`}
                >
                  <SendNotificationIcon />
                  Bildirim Gönder
                </Link>
              </li>

              {/* <!-- Gönderilen Bildirimler --> */}
              <li>
                <Link
                  href="/gonderilen-bildirimler"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-form-strokedark dark:hover:bg-meta-4 ${
                    pathname.includes("gonderilen-bildirimler") &&
                    "bg-form-strokedark dark:bg-meta-4"
                  }`}
                >
                  <NotificationIcon />
                  Gönderilen Bildirimler
                </Link>
              </li>

              {/* <!-- Gönderilen Bildirimler --> */}
              <li>
                <Link
                  href="/reklam-kimlikleri"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-form-strokedark dark:hover:bg-meta-4 ${
                    pathname.includes("reklam-kimlikleri") &&
                    "bg-form-strokedark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path
                          d="M122.1632,0.4096 C125.8496,0.1024 129.4336,0 133.12,0 C199.7824,2.4576 253.3376,55.9104 256,122.5728 L256,223.232 C255.8976,241.4592 241.0496,256.1024 222.9248,256.000534 C206.336,253.44 193.6384,239.9232 192.1024,223.232 L192.1024,122.5728 C189.3376,87.4496 158.6176,61.1328 123.4944,63.8976 C123.0848,63.8976 122.6752,64 122.2656,64"
                          fill="#FBBC04"
                        ></path>
                        <path
                          d="M256,223.9488 C256,241.5616 241.664,255.8976 224.0512,255.8976 C206.4384,255.8976 192.1024,241.5616 192.1024,223.9488 C192.1024,206.336 206.4384,192 224.0512,192 C241.664,192 256,206.336 256,223.9488 Z"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M124.0064,254.8736 C142.1312,255.0784 156.9792,240.64 157.184,222.5152 C157.184,222.4128 157.184,222.4128 157.184,222.3104 C156.672,204.6976 141.9264,190.7712 124.3136,191.2832 C124.1088,191.2832 123.8016,191.2832 123.5968,191.2832 C88.6784,188.6208 62.3616,158.3104 64.8192,123.2896 L64.8192,122.7776 C67.3792,91.2384 92.4672,66.3552 124.0064,64 C141.6192,64.7168 156.4672,50.9952 157.184,33.3824 C157.184,33.1776 157.184,33.0752 157.184,32.8704 C156.9792,14.7456 142.1312,0.1024 124.0064,0.305077636 C124.0064,0.305077636 124.0064,0.305077636 124.0064,0.305077636 L121.7536,0.305077636 C53.8624,3.4816 0.4096,59.1872 0,127.1808 L0,127.6928 C0,207.4624 69.9392,254.976 122.0608,254.976 L124.0064,254.976 L124.0064,254.8736 Z"
                          fill="#EA4335"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Reklam Kimlikleri
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

const CategoriesIcon = () => {
  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.952 6.39883C14.952 6.91216 14.532 7.33216 14.0187 7.33216C14.0187 7.33216 14.0093 7.33216 14 7.33216H0.933333C0.42 7.33216 0 6.91216 0 6.39883V1.73216C0 1.21883 0.42 0.798828 0.933333 0.798828H11.2C11.5267 0.798828 11.8347 0.966828 12.0027 1.25616L14.7187 5.78283C14.8587 5.94149 14.952 6.16549 14.952 6.39883Z"
        fill="#FE9803"
      />
      <path
        d="M28 6.40013V22.2668C28 22.7801 27.58 23.2001 27.0667 23.2001H0.933333C0.42 23.2001 0 22.7801 0 22.2668V5.4668H27.0667C27.58 5.4668 28 5.8868 28 6.40013Z"
        fill="#FFC10A"
      />
    </svg>
  );
};
const LevelsIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_756_242)">
        <path d="M15.925 0H11.835V4.09008H15.925V0Z" fill="#C8773F" />
        <path d="M8.66349 0H4.5686V4.09008H8.66349V0Z" fill="#C8773F" />
        <path d="M23.1916 0H19.0967V4.09008H23.1916V0Z" fill="#C8773F" />
        <path
          d="M23.1916 3.48047H4.5686V20.3824H23.1916V3.48047Z"
          fill="#C8773F"
        />
        <path
          d="M27.7604 15.5147V27.9831H0V12.3238H3.2247V15.5147H4.5687V15.0747H5.70002V11.8887H9.79497V15.0747H11.8303V11.8887H15.9253V15.0747H17.9654V11.8887H22.0604V15.0747H23.1917V15.5147H24.5357V12.3238H27.7555V15.0891L27.7604 15.5147Z"
          fill="#A75723"
        />
        <path
          opacity="0.1"
          d="M8.66349 1.84766H4.5686V2.19574H8.66349V1.84766Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M15.9253 1.84766H11.8352V2.19574H15.9253V1.84766Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 1.84766H19.0967V2.19574H23.1916V1.84766Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M14.0541 0H13.7061V2.02081H14.0541V0Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M8.66349 1.84766H4.5686V2.19574H8.66349V1.84766Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M15.9253 1.84766H11.8352V2.19574H15.9253V1.84766Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 1.84766H19.0967V2.19574H23.1916V1.84766Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 5.06641H4.5686V5.4193H23.1916V5.06641Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M7.04134 2.01953H6.69287V5.24298H7.04134V2.01953Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M11.6999 3.48047H11.3518V5.24518H11.6999V3.48047Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M16.3651 3.48047H16.0122V5.24518H16.3651V3.48047Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M21.024 2.01953H20.6755V5.24298H21.024V2.01953Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 5.06641H4.5686V5.4193H23.1916V5.06641Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 8.29102H4.5686V8.63921H23.1916V8.29102Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M9.39339 5.24414H9.04492V8.46759H9.39339V5.24414Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M14.0545 5.24414H13.7061V8.46759H14.0545V5.24414Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M18.7154 5.24414H18.3669V8.46759H18.7154V5.24414Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 8.29102H4.5686V8.63921H23.1916V8.29102Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 11.5156H4.5686V11.8637H23.1916V11.5156Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M7.04134 8.4668H6.69287V11.6902H7.04134V8.4668Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M11.7022 8.4668H11.3538V11.6902H11.7022V8.4668Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M16.3631 8.4668H16.0146V11.6902H16.3631V8.4668Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M21.024 8.4668H20.6755V11.6902H21.024V8.4668Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 11.5156H4.5686V11.8637H23.1916V11.5156Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M3.2247 14.7402H0V15.0883H3.2247V14.7402Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 14.7402H4.5686V15.0883H23.1916V14.7402Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7576 14.7402H24.5342V15.0887H27.7576V14.7402Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M9.39339 11.6895H9.04492V14.9129H9.39339V11.6895Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M14.0545 11.6895H13.7061V14.9129H14.0545V11.6895Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M18.7154 11.6895H18.3669V14.9129H18.7154V11.6895Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M3.2247 14.7402H0V15.0883H3.2247V14.7402Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.1916 14.7402H4.5686V15.0883H23.1916V14.7402Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7576 14.7402H24.5342V15.0887H27.7576V14.7402Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7604 17.9609H0V18.3138H27.7604V17.9609Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M2.38045 14.9141H2.03198V18.1375H2.38045V14.9141Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M7.04134 14.9141H6.69287V18.1375H7.04134V14.9141Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M11.7022 14.9141H11.3538V18.1375H11.7022V14.9141Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M16.3631 14.9141H16.0146V18.1375H16.3631V14.9141Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M21.024 14.9141H20.6755V18.1375H21.024V14.9141Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M25.6849 14.9141H25.3364V18.1375H25.6849V14.9141Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7604 17.9609H0V18.3138H27.7604V17.9609Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7604 21.1855H0V21.5336H27.7604V21.1855Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M4.7325 18.1367H4.38403V21.3602H4.7325V18.1367Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M9.39339 18.1367H9.04492V21.3602H9.39339V18.1367Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M14.0545 18.1367H13.7061V21.3602H14.0545V18.1367Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M18.7154 18.1367H18.3669V21.3602H18.7154V18.1367Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.3763 18.1367H23.0278V21.3602H23.3763V18.1367Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7604 21.1855H0V21.5336H27.7604V21.1855Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7604 24.4102H0V24.7582H27.7604V24.4102Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M2.38045 21.3613H2.03198V24.5848H2.38045V21.3613Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M7.04134 21.3613H6.69287V24.5848H7.04134V21.3613Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M11.7022 21.3613H11.3538V24.5848H11.7022V21.3613Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M16.3631 21.3613H16.0146V24.5848H16.3631V21.3613Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M21.024 21.3613H20.6755V24.5848H21.024V21.3613Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M25.6849 21.3613H25.3364V24.5848H25.6849V21.3613Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7604 24.4102H0V24.7582H27.7604V24.4102Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7601 27.6328H0.000244141V27.9813H27.7601V27.6328Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M4.7325 24.584H4.38403V27.8074H4.7325V24.584Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M9.39339 24.584H9.04492V27.8074H9.39339V24.584Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M14.0545 24.584H13.7061V27.8074H14.0545V24.584Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M18.7154 24.584H18.3669V27.8074H18.7154V24.584Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M23.3763 24.584H23.0278V27.8074H23.3763V24.584Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M27.7601 27.6328H0.000244141V27.9813H27.7601V27.6328Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M2.38045 27.8066H2.03198V27.9809H2.38045V27.8066Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M7.04134 27.8066H6.69287V27.9809H7.04134V27.8066Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M11.7022 27.8066H11.3538V27.9809H11.7022V27.8066Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M16.3631 27.8066H16.0146V27.9809H16.3631V27.8066Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M21.024 27.8066H20.6755V27.9809H21.024V27.8066Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M25.6849 27.8066H25.3364V27.9809H25.6849V27.8066Z"
          fill="white"
        />
        <path
          d="M14.2576 17.6934H13.5251C11.7234 17.6934 10.2493 19.1675 10.2493 20.9692V28H17.5335V20.9692C17.5335 19.1675 16.0593 17.6934 14.2576 17.6934Z"
          fill="#4E4D4D"
        />
        <path
          d="M7.96509 5.0625V6.68874H9.13267V8.19883H7.96509V9.82502H11.566V5.0625H7.96509Z"
          fill="#4E4D4D"
        />
        <path
          d="M16.1941 5.0625V6.68874H17.3616V8.19883H16.1941V9.82502H19.795V5.0625H16.1941Z"
          fill="#4E4D4D"
        />
      </g>
      <defs>
        <clipPath id="clip0_756_242">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const AddNewLevelIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8942 16.9194H2.28447C1.2113 16.9194 0.333252 16.0413 0.333252 14.9681V2.2852C0.333252 1.21203 1.2113 0.333984 2.28447 0.333984H17.8942C18.9674 0.333984 19.8454 1.21203 19.8454 2.2852V14.9681C19.8454 16.0413 18.9674 16.9194 17.8942 16.9194Z"
        fill="#00659E"
      />
      <path
        d="M13.9917 4.72513C13.9917 5.11325 14.1459 5.48548 14.4203 5.75992C14.6948 6.03437 15.067 6.18855 15.4551 6.18855C15.8432 6.18855 16.2155 6.03437 16.4899 5.75992C16.7643 5.48548 16.9185 5.11325 16.9185 4.72513C16.9185 4.33701 16.7643 3.96479 16.4899 3.69034C16.2155 3.4159 15.8432 3.26172 15.4551 3.26172C15.067 3.26172 14.6948 3.4159 14.4203 3.69034C14.1459 3.96479 13.9917 4.33701 13.9917 4.72513Z"
        fill="#B3DDF5"
      />
      <path
        d="M8.13807 4.72461L2.77222 12.5295H13.5039L8.13807 4.72461Z"
        fill="#9AC9E3"
      />
      <path
        d="M13.504 7.65039L9.60156 12.5284H17.4064L13.504 7.65039Z"
        fill="#B3DDF5"
      />
      <path
        d="M12.0405 15.4562C12.0405 16.7499 12.5545 17.9907 13.4693 18.9055C14.3841 19.8203 15.6248 20.3342 16.9186 20.3342C18.2123 20.3342 19.4531 19.8203 20.3679 18.9055C21.2827 17.9907 21.7966 16.7499 21.7966 15.4562C21.7966 14.1624 21.2827 12.9217 20.3679 12.0069C19.4531 11.0921 18.2123 10.5781 16.9186 10.5781C15.6248 10.5781 14.3841 11.0921 13.4693 12.0069C12.5545 12.9217 12.0405 14.1624 12.0405 15.4562Z"
        fill="#43A047"
      />
      <path d="M15.9431 12.5293H17.8943V18.383H15.9431V12.5293Z" fill="white" />
      <path
        d="M13.9917 14.4805H19.8454V16.4317H13.9917V14.4805Z"
        fill="white"
      />
    </svg>
  );
};

const NotificationIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 44 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5635 46.9655C24.4772 46.9655 26.8393 44.6035 26.8393 41.6898C26.8393 38.7761 24.4772 36.4141 21.5635 36.4141C18.6499 36.4141 16.2878 38.7761 16.2878 41.6898C16.2878 44.6035 18.6499 46.9655 21.5635 46.9655Z"
        fill="url(#paint0_linear_756_172)"
      />
      <path
        d="M21.5634 36.4141C18.8155 36.4141 16.5592 38.5153 16.3114 41.1985L22.0546 46.9418C24.7378 46.694 26.8391 44.4377 26.8391 41.6898C26.8391 38.776 24.4771 36.4141 21.5634 36.4141Z"
        fill="url(#paint1_linear_756_172)"
      />
      <path
        d="M38.8513 32.4902H4.27566C1.91424 32.4902 0 34.4045 0 36.766C0 39.1274 1.91424 41.0417 4.27566 41.0417H38.8513C41.2128 41.0417 43.1271 39.1274 43.1271 36.766C43.127 34.4045 41.2128 32.4902 38.8513 32.4902Z"
        fill="url(#paint2_linear_756_172)"
      />
      <path
        d="M36.3764 29.2644V20.6933C36.3764 13.7616 31.6154 7.94433 25.1856 6.32813C25.5524 5.70409 25.7647 4.97703 25.7647 4.20117C25.7646 1.88121 23.8834 0 21.5635 0C19.2435 0 17.3623 1.88121 17.3623 4.20117C17.3623 4.97712 17.5747 5.70409 17.9414 6.32813C11.5114 7.94433 6.75173 13.7617 6.75173 20.6933V29.2644C6.75173 31.1198 5.24753 32.6241 3.39209 32.6241H39.7349C37.8793 32.6241 36.3764 31.1198 36.3764 29.2644ZM21.5635 5.88049C20.6357 5.88049 19.883 5.12903 19.883 4.20126C19.883 3.27222 20.6357 2.52076 21.5635 2.52076C22.4912 2.52076 23.244 3.27222 23.244 4.20126C23.244 5.12903 22.4912 5.88049 21.5635 5.88049Z"
        fill="url(#paint3_linear_756_172)"
      />
      <path
        d="M0.0531006 37.6152C0.375901 39.6569 2.14328 41.2181 4.27565 41.025H38.8513C40.9838 41.2181 42.7511 39.6569 43.0739 37.6152H0.0531006Z"
        fill="url(#paint4_linear_756_172)"
      />
      <path
        d="M36.3764 23.1258V28.0657L29.7986 21.4879L29.8225 21.4865C30.1606 21.4679 30.4912 21.5739 30.7652 21.7729C32.0145 22.6799 33.5513 23.2146 35.2132 23.2146C35.6095 23.2147 35.9968 23.1838 36.3764 23.1258Z"
        fill="url(#paint5_linear_756_172)"
      />
      <path
        d="M35.214 23.5483C39.5846 23.5483 43.1277 20.0052 43.1277 15.6345C43.1277 11.2638 39.5846 7.7207 35.214 7.7207C30.8433 7.7207 27.3002 11.2638 27.3002 15.6345C27.3002 20.0052 30.8433 23.5483 35.214 23.5483Z"
        fill="url(#paint6_linear_756_172)"
      />
      <path
        d="M33.429 12.4641C33.429 12.2075 33.5326 12.0049 33.74 11.8569L35.2804 10.3758C35.389 10.2673 35.5223 10.2129 35.6803 10.2129C35.8581 10.2129 36.0183 10.2599 36.1617 10.3536C36.3047 10.4475 36.3764 10.5735 36.3764 10.7313V20.5364C36.3764 20.6945 36.2973 20.8203 36.1395 20.9141C35.9815 21.008 35.7988 21.0548 35.5915 21.0548C35.3742 21.0548 35.1891 21.008 35.0361 20.9141C34.8829 20.8203 34.8066 20.6944 34.8066 20.5364V12.3013L34.2882 12.9531C34.1894 13.0519 34.0809 13.1011 33.9624 13.1011C33.8142 13.1011 33.6883 13.0345 33.5847 12.9012C33.4808 12.7678 33.429 12.6222 33.429 12.4641Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_756_172"
          x1="460.265"
          y1="424.525"
          x2="1368.11"
          y2="1937.57"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFC200" />
          <stop offset="0.268" stop-color="#FFBB00" />
          <stop offset="0.659" stop-color="#FFA801" />
          <stop offset="1" stop-color="#FF9102" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_756_172"
          x1="1358.65"
          y1="1246.01"
          x2="151.766"
          y2="39.1543"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFC200" stop-opacity="0" />
          <stop offset="0.203" stop-color="#FFBB00" stop-opacity="0.203" />
          <stop offset="0.499" stop-color="#FFA700" stop-opacity="0.499" />
          <stop offset="0.852" stop-color="#FF8800" stop-opacity="0.852" />
          <stop offset="1" stop-color="#FF7800" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_756_172"
          x1="1627.35"
          y1="-421.738"
          x2="1717.66"
          y2="3406.17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFC200" />
          <stop offset="0.268" stop-color="#FFBB00" />
          <stop offset="0.659" stop-color="#FFA801" />
          <stop offset="1" stop-color="#FF9102" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_756_172"
          x1="1284.46"
          y1="1903.42"
          x2="3120.03"
          y2="4049.01"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFC200" />
          <stop offset="0.268" stop-color="#FFBB00" />
          <stop offset="0.659" stop-color="#FFA801" />
          <stop offset="1" stop-color="#FF9102" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_756_172"
          x1="4077.48"
          y1="-8.83932"
          x2="4034.4"
          y2="692.139"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFC200" stop-opacity="0" />
          <stop offset="0.203" stop-color="#FFBB00" stop-opacity="0.203" />
          <stop offset="0.499" stop-color="#FFA700" stop-opacity="0.499" />
          <stop offset="0.852" stop-color="#FF8800" stop-opacity="0.852" />
          <stop offset="1" stop-color="#FF7800" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_756_172"
          x1="1131.44"
          y1="876.282"
          x2="371.636"
          y2="117.276"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFC200" stop-opacity="0" />
          <stop offset="0.203" stop-color="#FFBB00" stop-opacity="0.203" />
          <stop offset="0.499" stop-color="#FFA700" stop-opacity="0.499" />
          <stop offset="0.852" stop-color="#FF8800" stop-opacity="0.852" />
          <stop offset="1" stop-color="#FF7800" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_756_172"
          x1="488.905"
          y1="13.1405"
          x2="1145.18"
          y2="1576.47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D63305" />
          <stop offset="0.366" stop-color="#CF3004" />
          <stop offset="0.899" stop-color="#BC2602" />
          <stop offset="1" stop-color="#B72401" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const SendNotificationIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 505 505"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M252.5 505C391.952 505 505 391.952 505 252.5C505 113.048 391.952 0 252.5 0C113.048 0 0 113.048 0 252.5C0 391.952 113.048 505 252.5 505Z"
        fill="#FFD05B"
      />
      <path
        d="M310.1 409.701H121.4C119.6 409.701 118.1 408.201 118.1 406.401V98.6008C118.1 96.8008 119.6 95.3008 121.4 95.3008H310.2C312 95.3008 313.5 96.8008 313.5 98.6008V406.401C313.5 408.201 312 409.701 310.1 409.701Z"
        fill="#324A5E"
      />
      <path d="M299.8 134.5H131.7V363.2H299.8V134.5Z" fill="white" />
      <path
        d="M215.7 398.601C222.824 398.601 228.6 392.825 228.6 385.701C228.6 378.576 222.824 372.801 215.7 372.801C208.576 372.801 202.8 378.576 202.8 385.701C202.8 392.825 208.576 398.601 215.7 398.601Z"
        fill="#E6E9EE"
      />
      <path
        d="M245 125.1H186.5C185.5 125.1 184.7 124.3 184.7 123.3C184.7 122.3 185.5 121.5 186.5 121.5H244.9C245.9 121.5 246.7 122.3 246.7 123.3C246.8 124.2 246 125.1 245 125.1Z"
        fill="#ACB3BA"
      />
      <path d="M223.6 110.301H207.8V114.001H223.6V110.301Z" fill="#ACB3BA" />
      <path
        d="M412.7 161.1H259.8C250.2 161.1 242.4 168.9 242.4 178.5V275C242.4 284.6 250.2 292.4 259.8 292.4H268.5L264.9 327L303.1 292.4H412.7C422.3 292.4 430.1 284.6 430.1 275V178.5C430.1 168.9 422.3 161.1 412.7 161.1Z"
        fill="#FF7058"
      />
    </svg>
  );
};
