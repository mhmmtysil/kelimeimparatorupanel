const ERROR_MESSAGE = "Api request failed.";

async function baseRequesAuth(endpoint, body) {
  var user = JSON.parse(localStorage.getItem("user"));
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        // Authorization: `Bearer ${user?.accessToken}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtdWhhbW1ldHllc2lsQG91dGxvb2suY29tLnRyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik11aGFtbWV0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IlllxZ9pbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiJBcHIgVGh1IDE4IDIwMjQgMTY6MTY6MjEgUE0iLCJuYmYiOjE3MTMzMzY5ODEsImV4cCI6MTcxMzQ0NjE4MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzM1NTEiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDozMzU1MSJ9.6-79DfiQJ5gj_7y_rZ7zVnopLUdE_9rsP1bFZFkUB1Q`,

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


export async function AddNewLevelBulk(level) {
  return await baseRequesAuth("Level/AddNewLevelBulk", level);
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
