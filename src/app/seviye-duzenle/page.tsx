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
import { GetAllSubCategoryDatas, UpdateLevel } from "@/services/apiService";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/common/Loader";
import UpdateSuccess from "@/components/UpdateSuccess";
import UpdateError from "@/components/UpdateError";
import { useSession } from "next-auth/react";
import CustomModal from "@/components/CustomModal";

interface Props {
  initialList: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const searchParams = useSearchParams();
  const _selectedId = searchParams.get("id") || 0;
  const _isBonus = searchParams.get("isBonus") || false;
  const _letters = searchParams.get("letters") || "";
  const _additionalLetters = searchParams.get("additionalLetters") || "";
  const _solvedWords = searchParams.get("solvedWords") || "";
  const _words = searchParams.get("words") || "";
  const _additionalWords = searchParams.get("additionalWords") || "";
  const _isActive = searchParams.get("isActive") || false;
  const _isDeleted = searchParams.get("isDeleted") || false;
  const _categoryId = searchParams.get("categoryId") || "";

  const [isActive, setActive] = useState(_isActive == "true");
  const [isDeleted, setDeleted] = useState(_isDeleted == "true");
  const [isBonus, setBonus] = useState(_isBonus == "true");

  const [successActive, setSuccessActive] = useState(false);
  const [errorActive, setErrorActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState<number>(
    Number(_categoryId),
  );
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [errorText, setErrorText] = useState("");
  const [resultState, setResultState] = useState<"success" | "error">(
    "success",
  );

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);

  const fetchData = async () => {
    try {
      const _categories = await GetAllSubCategoryDatas(
        session?.user.accessToken,
      );

      setCategories(_categories.object);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [itemsLetters, setItemsLetters] = useState(_letters.split(""));

  const [itemsAdditionalLetters, setItemsAdditionalLetters] = useState(
    _additionalLetters.split(""),
  );
  const [items, setItems] = useState(
    _words.split(",").filter((word) => word.trim() !== ""),
  );
  const [itemsExtra, setItemsExtra] = useState(
    _additionalWords.split(",").filter((word) => word.trim() !== ""),
  );
  const [itemsSolved, setItemsSolved] = useState(
    _solvedWords.split(",").filter((word) => word.trim() !== ""),
  );

  const addInput = () => {
    setItems([...items, ""]);
  };

  const addInputWord = () => {
    setItemsLetters([...itemsLetters, ""]);
  };

  const addInputAdditionalLetters = () => {
    setItemsAdditionalLetters([...itemsAdditionalLetters, ""]);
  };

  const addInputforExtra = () => {
    setItemsExtra([...itemsExtra, ""]);
  };
  const addInputforSolved = () => {
    setItemsSolved([...itemsSolved, ""]);
  };

  const removeInput = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  const removeInputLetter = (index: number) => {
    const updatedItems = itemsLetters.filter((_, i) => i !== index);
    setItemsLetters(updatedItems);
  };
  const removeInputAdditionalLetter = (index: number) => {
    const updatedItems = itemsAdditionalLetters.filter((_, i) => i !== index);
    setItemsAdditionalLetters(updatedItems);
  };
  const removeInputExtra = (index: number) => {
    const updatedItems = itemsExtra.filter((_, i) => i !== index);
    setItemsExtra(updatedItems);
  };

  const removeInputSolved = (index: number) => {
    const updatedItems = itemsSolved.filter((_, i) => i !== index);
    setItemsSolved(updatedItems);
  };

  async function UpdateCategoryFromDatabase() {
    var level: Level = {
      id: Number(_selectedId),
      isBonus: isBonus,
      letters: itemsLetters.filter((a) => a.trim().length > 0).join(""),
      additionalLetters: itemsAdditionalLetters
        .filter((item) => item.trim().length > 0)
        .map((item) => item.trim().charAt(0))
        .join(","),
      solvedWords: itemsSolved.filter((a) => a.trim().length > 0).join(","),
      words: items.join(","),
      additionalWords: itemsExtra.filter((a) => a.trim().length > 0).join(","),
      categoryId: selectedOption,
      isActive: isActive,
      isDeleted: isDeleted,
    };
    var a = await UpdateLevel(level, session?.user.accessToken);
    setResultState(a?.code === "100" ? "success" : "error");
    if (a?.code == "100") {
      setErrorText("Bildirim başarıyla gönderildi. ");
    } else {
      setErrorText("Lütfen Bildirim başlığı ve metnini girin.");
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
                  {_selectedId} numaralı Id'ye ait Bölümü Düzenle
                </h3>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Alt Kategori Seçimi:{" "}
                  <span className="text-meta-1">
                    *Alt kategori değişince otomatik olarak ana kategori de
                    değişeceği için sadece alt kategori değiştirmek yeterli.
                  </span>
                </label>
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
                        {category.title}
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
              </div>

              {/* Harfler */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Harfler:{" "}
                  <span className="text-meta-1">*Bölümün harfleri</span>
                </label>

                <button
                  onClick={addInputWord}
                  className="mb-2 mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-2 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                >
                  <span>
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9C5.44772 9 5 9.44771 5 10C5 10.5523 5.44772 11 6 11H9V14C9 14.5523 9.44771 15 10 15C10.5523 15 11 14.5523 11 14V11H14C14.5523 11 15 10.5523 15 10C15 9.44771 14.5523 9 14 9H11V6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V9H6Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 0C4.47716 0 0 4.47716 0 10C0 15.5229 4.47716 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47716 15.5229 0 10 0ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Harf Ekle
                </button>
                {itemsLetters.map((item, index) => (
                  <div key={index} className="mb-2 flex items-center gap-3">
                    <input
                      type="text"
                      value={item}
                      maxLength={1}
                      onChange={(e) => {
                        const updatedItems = [...itemsLetters];
                        updatedItems[index] = e.target.value;
                        setItemsLetters(updatedItems);
                      }}
                      placeholder={`${index + 1}. Harf`}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {/* Her input için sil butonu */}

                    <button
                      onClick={() => removeInputLetter(index)}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-danger px-2.5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
                    >
                      <span>
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 10C0 4.47716 4.47716 0 10 0C15.5229 0 20 4.47716 20 10C20 15.5229 15.5229 20 10 20C4.47716 20 0 15.5229 0 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM5 10C5 9.44771 5.44772 9 6 9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Kaldır
                    </button>
                  </div>
                ))}
              </div>
              {/* Kelimeler */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Kelimeler:{" "}
                  <span className="text-meta-1">*Bölümün Cevapları</span>
                </label>

                <button
                  onClick={addInput}
                  className="mb-2 mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-amber-600 px-2 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                >
                  <span>
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9C5.44772 9 5 9.44771 5 10C5 10.5523 5.44772 11 6 11H9V14C9 14.5523 9.44771 15 10 15C10.5523 15 11 14.5523 11 14V11H14C14.5523 11 15 10.5523 15 10C15 9.44771 14.5523 9 14 9H11V6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V9H6Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 0C4.47716 0 0 4.47716 0 10C0 15.5229 4.47716 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47716 15.5229 0 10 0ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Kelime Ekle
                </button>
                {items.map((item, index) => (
                  <div key={index} className="mb-2 flex items-center gap-3">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updatedItems = [...items];
                        updatedItems[index] = e.target.value;
                        setItems(updatedItems);
                      }}
                      placeholder={`${index + 1}. Kelime`}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {/* Her input için sil butonu */}

                    <button
                      onClick={() => removeInput(index)}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-danger px-2.5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
                    >
                      <span>
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 10C0 4.47716 4.47716 0 10 0C15.5229 0 20 4.47716 20 10C20 15.5229 15.5229 20 10 20C4.47716 20 0 15.5229 0 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM5 10C5 9.44771 5.44772 9 6 9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Kaldır
                    </button>
                  </div>
                ))}
              </div>

              {/* Ekstra Kelimeler */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ekstra Kelimeler:{" "}
                  <span className="text-meta-1">
                    *Bonus Kelimeler. (Yeni kelime eklemeden kaydedilebilir.)
                  </span>
                </label>

                <button
                  onClick={addInputforExtra}
                  className="mb-2 mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-sky-600 px-2 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                >
                  <span>
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9C5.44772 9 5 9.44771 5 10C5 10.5523 5.44772 11 6 11H9V14C9 14.5523 9.44771 15 10 15C10.5523 15 11 14.5523 11 14V11H14C14.5523 11 15 10.5523 15 10C15 9.44771 14.5523 9 14 9H11V6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V9H6Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 0C4.47716 0 0 4.47716 0 10C0 15.5229 4.47716 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47716 15.5229 0 10 0ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Ekstra Kelime Ekle
                </button>
                {itemsExtra.map((item, index) => (
                  <div key={index} className="mb-2 flex items-center gap-3">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updatedItems = [...itemsExtra];
                        updatedItems[index] = e.target.value;
                        setItemsExtra(updatedItems);
                      }}
                      placeholder={`${index + 1}. Ekstra Kelime`}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {/* Her input için sil butonu */}

                    <button
                      onClick={() => removeInputExtra(index)}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-danger px-2.5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
                    >
                      <span>
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 10C0 4.47716 4.47716 0 10 0C15.5229 0 20 4.47716 20 10C20 15.5229 15.5229 20 10 20C4.47716 20 0 15.5229 0 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM5 10C5 9.44771 5.44772 9 6 9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Kaldır
                    </button>
                  </div>
                ))}
              </div>

              {/* Ekstra Harfler */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ekstra Harfler:{" "}
                  <span className="text-meta-1">
                    *Bölümün harflerine ek olarak bonus harf
                  </span>
                </label>

                <button
                  onClick={addInputAdditionalLetters}
                  className="mb-2 mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-fuchsia-600 px-2 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                >
                  <span>
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9C5.44772 9 5 9.44771 5 10C5 10.5523 5.44772 11 6 11H9V14C9 14.5523 9.44771 15 10 15C10.5523 15 11 14.5523 11 14V11H14C14.5523 11 15 10.5523 15 10C15 9.44771 14.5523 9 14 9H11V6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V9H6Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 0C4.47716 0 0 4.47716 0 10C0 15.5229 4.47716 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47716 15.5229 0 10 0ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Ekstra Harf Ekle
                </button>
                {itemsAdditionalLetters.map((item, index) => (
                  <div key={index} className="mb-2 flex items-center gap-3">
                    <input
                      type="text"
                      value={item}
                      maxLength={1}
                      onChange={(e) => {
                        const updatedItems = [...itemsAdditionalLetters];
                        updatedItems[index] = e.target.value;
                        setItemsAdditionalLetters(updatedItems);
                      }}
                      placeholder={`${index + 1}. Ekstra Harf`}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {/* Her input için sil butonu */}

                    <button
                      onClick={() => removeInputAdditionalLetter(index)}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-danger px-2.5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
                    >
                      <span>
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 10C0 4.47716 4.47716 0 10 0C15.5229 0 20 4.47716 20 10C20 15.5229 15.5229 20 10 20C4.47716 20 0 15.5229 0 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM5 10C5 9.44771 5.44772 9 6 9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Kaldır
                    </button>
                  </div>
                ))}
              </div>
              {/* Çözülmüş Kelimeler */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Çözülmüş Kelimeler:{" "}
                  <span className="text-meta-1">
                    *Çözülmüş olarak başlanılan kelimeler. (Yeni kelime
                    eklemeden kaydedilebilir.)
                  </span>
                </label>

                <button
                  onClick={addInputforSolved}
                  className="mb-2 mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-violet-600 px-2 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                >
                  <span>
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9C5.44772 9 5 9.44771 5 10C5 10.5523 5.44772 11 6 11H9V14C9 14.5523 9.44771 15 10 15C10.5523 15 11 14.5523 11 14V11H14C14.5523 11 15 10.5523 15 10C15 9.44771 14.5523 9 14 9H11V6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V9H6Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 0C4.47716 0 0 4.47716 0 10C0 15.5229 4.47716 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47716 15.5229 0 10 0ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Çözülmüş Kelime Ekle
                </button>
                {itemsSolved.map((item, index) => (
                  <div key={index} className="mb-2 flex items-center gap-3">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updatedItems = [...itemsSolved];
                        updatedItems[index] = e.target.value;
                        setItemsSolved(updatedItems);
                      }}
                      placeholder={`${index + 1}. Çözülmüş Kelime`}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {/* Her input için sil butonu */}

                    <button
                      onClick={() => removeInputSolved(index)}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-danger px-2.5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
                    >
                      <span>
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 10C0 4.47716 4.47716 0 10 0C15.5229 0 20 4.47716 20 10C20 15.5229 15.5229 20 10 20C4.47716 20 0 15.5229 0 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM5 10C5 9.44771 5.44772 9 6 9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Kaldır
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Bonus Bölüm mü?
                </label>
                <Switch isActive={isBonus} setActive={setBonus} />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Aktif Mi?{" "}
                  <span className="text-meta-1">
                    *Kapalı olursa bu bölüm oyunda gözükmeyecektir.
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
