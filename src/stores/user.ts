import { ref } from "vue";
import { defineStore } from "pinia";
import { AuthAPI as AuthServices } from "@/services/api/Auth";

export const useUserStore = defineStore("user", () => {
  const user = ref<Record<string, any>>();

  const storedUser = localStorage.getItem("USER_DATA");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }

  const isAuthenticated = () => {
    return !!user.value?.id;
  };

  const setUser = (_user: Record<string, any>) => {
    user.value = _user;
    localStorage.setItem("USER_DATA", JSON.stringify(_user));
  };

  const getToken = () => {
    return localStorage.getItem("AUTH_TOKEN");
  };

  const setToken = (token: string) => {
    localStorage.setItem("AUTH_TOKEN", token);
  }

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("USER_DATA"); 
    user.value = undefined;
  };

  const refreshUser = async () => {
    try {
      const { data } = await AuthServices.me();
      setUser(data.user);
      return data.user;
    } catch (e) {
      return null;
    }
  };

  return { logout, user, setUser, getToken, refreshUser, isAuthenticated, setToken };
});
