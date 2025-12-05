import type { UserInfo } from "@/types/domain/user";

export type { UserInfo };

const STORAGE_KEY = "mr-daebak-user";

export const getUserInfo = (): UserInfo | null => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveUserInfo = (userInfo: UserInfo): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
  } catch (error) {
    console.error("Failed to save user info:", error);
  }
};

export const clearUserInfo = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

export const isLoggedIn = (): boolean => {
  return getUserInfo() !== null;
};

export const isRegularCustomer = (): boolean => {
  const user = getUserInfo();
  return user?.isRegularCustomer ?? false;
};
