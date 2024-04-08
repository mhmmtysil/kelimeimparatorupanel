const ERROR_MESSAGE = "Api request failed.";

export async function GetAllCategoryDatas() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Category/GetAllCategoryDatas`,
      {
        method: "POST", // HTTP GET methodunu kullan
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json", // İsteğin içeriğinin JSON olduğunu belirt
        },
      }
    );

    if (!res.ok) {
      // Eğer istek başarısız olursa, hatayı at
      throw new Error(ERROR_MESSAGE);
    }

    const data = await res.json(); // Yanıtı JSON formatına çözümle
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE); // Hata durumunda ERROR_MESSAGE'i fırlat
  }
}
