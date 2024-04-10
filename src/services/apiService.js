const ERROR_MESSAGE = "Api request failed.";

export async function Login(user) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}Auth/Login`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

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

export async function GetAllCategoryDatas(accessToken) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Category/GetAllCategoryDatas`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

export async function AddNewSubCategory(newSubCategory) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}SubCategory/AddNewSubCategory`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubCategory),
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
export async function DeleteSubCategory(categoryId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}SubCategory/DeleteSubCategory`,
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

export async function UpdateSubCategory(updateCategory) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}SubCategory/UpdateSubCategory`,
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
export async function GetAllLevels() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Level/GetAllLevels`,
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

export async function DeleteLevel(categoryId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}Level/DeleteLevel`,
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
