import { apiFetch } from "../api/api";
export const getUsers = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await apiFetch("/staff/user-list", "GET", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.success) {
      return res.users;
    }
    return [];
  } catch (err) {
    return [];
  }
};

export const getStaff = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await apiFetch("/staff/staff-list", "GET", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (res.success) {
      return res.staff;
    }
    return [];
  } catch (error) {
    console.error("Failed to parse staff data", error);
    return [];
  }
};

export const updateStaff = async (username, role) => {
  try {
    const staff = await getStaff();

    const existingStaff = staff.find((s) => s.username === username && s.role === role);

    if (!existingStaff || existingStaff.length == 0) {
      const token = localStorage.getItem("access_token");
      const res = await apiFetch("/staff/update-stuff", "POST", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          username,
          role,
        },
      });

      window.dispatchEvent(new CustomEvent("staffUpdated"));
      if (!res.success) {
        return { success: false };
      }

      return { success: true };
    } else {
      throw new Error();
    }
  } catch (err) {
    window.dispatchEvent(new CustomEvent("staffUpdated"));
    return { success: false };
  }
};

export const removeStaff = async (st) => {
  try {
    const staff = await getStaff();
    const existingItem = staff.find((s) => s.id === st._id);
    if (existingItem && existingItem.role == "Super Admin") {
      return {
        success: false,
        error: "Cannot remove root system administrators.",
      };
    }
    const token = localStorage.getItem("access_token");
    const res = await apiFetch("/staff/update-stuff", "POST", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: {
        username: st.username,
        role: "Member",
      },
    });
    console.log(res)
    if (res.success) {
      window.dispatchEvent(new CustomEvent("staffUpdated"));
      return { success: true };
    } else {
      throw new Error();
    }
  } catch (err) {
    window.dispatchEvent(new CustomEvent("staffUpdated"));
    return { success: false };
  }
};
