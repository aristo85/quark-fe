const STORAGE_KEY = "quarkToken";

export const getUserToken = () => {
  return localStorage.getItem(STORAGE_KEY);
};

export const setUserToken = (userToken: string) => {
  localStorage.setItem(STORAGE_KEY, userToken);
};

export const resetUserToken = () => {
  localStorage.removeItem(STORAGE_KEY);
};
