const ERROR_MESSAGE = "Api request failed.";

async function baseRequesAuth(endpoint, accessToken, body) {
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
  return await baseRequesAuth("Category/GetAllCategoryDatas", accessToken);
}

export async function DeleteCategory(categoryId, accessToken) {
  return await baseRequesAuth("Category/DeleteCategory", accessToken, {
    categoryId: categoryId,
  });
}

export async function UpdateCategory(updateCategory, accessToken) {
  return await baseRequesAuth(
    "Category/UpdateCategory",
    accessToken,
    updateCategory,
  );
}

export async function AddNewCategory(newCategory, accessToken) {
  return await baseRequesAuth(
    "Category/AddNewCategory",
    accessToken,
    newCategory,
  );
}

export async function GetAllSubCategoryDatas(accessToken) {
  return await baseRequesAuth("Category/GetAllSubCategoryDatas", accessToken);
}

export async function AddNewSubCategory(newSubCategory, accessToken) {
  return await baseRequesAuth(
    "SubCategory/AddNewSubCategory",
    accessToken,
    newSubCategory,
  );
}

export async function DeleteSubCategory(categoryId, accessToken) {
  return await baseRequesAuth("SubCategory/DeleteSubCategory", accessToken, {
    categoryId: categoryId,
  });
}

export async function UpdateSubCategory(updateCategory, accessToken) {
  return await baseRequesAuth(
    "SubCategory/UpdateSubCategory",
    accessToken,
    updateCategory,
  );
}
export async function GetAllLevels(accessToken) {
  return await baseRequesAuth("Level/GetAllLevels", accessToken);
}

export async function DeleteLevel(categoryId, accessToken) {
  return await baseRequesAuth("Level/DeleteLevel", accessToken, {
    categoryId: categoryId,
  });
}

export async function UpdateLevel(level, accessToken) {
  return await baseRequesAuth("Level/UpdateLevel", accessToken, level);
}

export async function AddNewLevel(level, accessToken) {
  return await baseRequesAuth("Level/AddNewLevel", accessToken, level);
}

export async function AddNewNotification(notification, accessToken) {
  return await baseRequesAuth(
    "Notification/SendNotification",
    accessToken,
    notification,
  );
}

export async function GetAllNotifications(accessToken) {
  return await baseRequesAuth(
    "Notification/GetAllNotificationsPanel",
    accessToken,
  );
}
