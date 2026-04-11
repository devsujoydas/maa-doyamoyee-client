import api from "../utils/api";

// GET USERS
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// DELETE USER (ADMIN ONLY)
export const deleteUserByAdmin = async (userId) => {
  const res = await api.delete(`/users/user/${userId}`);
  return res.data;
};

// CHANGE ROLE (ADMIN ONLY)
export const changeUserRole = async ({ userId, role }) => {
  const res = await api.patch(`/users/${userId}/role`, { role });
  return res.data;
};