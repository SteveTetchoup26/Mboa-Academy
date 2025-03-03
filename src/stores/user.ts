import { ref } from "vue";
import { defineStore } from "pinia";
import { AuthAPI as AuthServices } from "@/services/api/Auth";

export const useUserStore = defineStore("user", () => {
  const user = ref<Record<string, any>>();

  const isAuthenticated = () => {
    return !!user.value?.id;
  };

  const setUser = (_user: Record<string, any>) => {
    user.value = _user;
  };

  const getToken = () => {
    return localStorage.getItem("AUTH_TOKEN");
  };

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
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

  return { logout, user, setUser, getToken, refreshUser, isAuthenticated };
});
