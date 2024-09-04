export const setAuthUser = (user = "test-user-1") => {
  localStorage.setItem("auth", user);
};

export const getAuthUser = () => {
  return localStorage.getItem("auth");
};
