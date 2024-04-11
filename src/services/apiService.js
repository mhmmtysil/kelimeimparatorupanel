const ERROR_MESSAGE = "Api request failed.";

async function baseRequesAuth(endpoint, body) {
  var user = JSON.parse(localStorage.getItem("user"));
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (res.status === 401) {
      localStorage.removeItem("user");
      window.location.reload();
      return;
    }
    if (!res.ok) {
      return ERROR_MESSAGE;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return ERROR_MESSAGE;
  }
}

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
      throw new Error(res);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGE);
  }
}

export async function GetAllCategoryDatas() {
  return await baseRequesAuth("Category/GetAllCategoryDatas");
}

export async function DeleteCategory(categoryId) {
  return await baseRequesAuth("Category/DeleteCategory", {
    categoryId: categoryId,
  });
}

export async function UpdateCategory(updateCategory) {
  return await baseRequesAuth(
    "Category/UpdateCategory",

    updateCategory,
  );
}

export async function AddNewCategory(newCategory) {
  return await baseRequesAuth(
    "Category/AddNewCategory",

    newCategory,
  );
}

export async function GetAllSubCategoryDatas() {
  return await baseRequesAuth("Category/GetAllSubCategoryDatas");
}

export async function AddNewSubCategory(newSubCategory) {
  return await baseRequesAuth(
    "SubCategory/AddNewSubCategory",

    newSubCategory,
  );
}

export async function DeleteSubCategory(categoryId) {
  return await baseRequesAuth("SubCategory/DeleteSubCategory", {
    categoryId: categoryId,
  });
}

export async function UpdateSubCategory(updateCategory) {
  return await baseRequesAuth(
    "SubCategory/UpdateSubCategory",

    updateCategory,
  );
}
export async function GetAllLevels() {
  return await baseRequesAuth("Level/GetAllLevels");
}

export async function DeleteLevel(categoryId) {
  return await baseRequesAuth("Level/DeleteLevel", {
    categoryId: categoryId,
  });
}

export async function UpdateLevel(level) {
  return await baseRequesAuth("Level/UpdateLevel", level);
}

export async function AddNewLevel(level) {
  return await baseRequesAuth("Level/AddNewLevel", level);
}

export async function AddNewNotification(notification) {
  return await baseRequesAuth(
    "Notification/SendNotification",

    notification,
  );
}

export async function GetAllNotifications(accessToken) {
  return await baseRequesAuth(
    "Notification/GetAllNotificationsPanel",
    accessToken,
  );
}

export async function GetAdvertisementIds() {
  return await baseRequesAuth("Ad/GetAdvertisementIdsPanel");
}

export async function UpdateAdvert(advert) {
  return await baseRequesAuth("Ad/UpdateAdvert", advert);
}
