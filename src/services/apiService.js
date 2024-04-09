const ERROR_MESSAGE = "Api request failed.";

export async function GetAllCategoryDatas() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Category/GetAllCategoryDatas`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE);
  }
}

export async function DeleteCategory(categoryId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Category/DeleteCategory`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: categoryId }),
      },
    );

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE);
  }
}

export async function UpdateCategory(updateCategory) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Category/UpdateCategory`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCategory),
      },
    );

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE);
  }
}

export async function AddNewCategory(newCategory) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Category/AddNewCategory`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      },
    );

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE);
  }
}

export async function GetAllSubCategoryDatas() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Category/GetAllSubCategoryDatas`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE);
  }
}
