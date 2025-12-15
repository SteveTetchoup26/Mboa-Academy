import { ref } from "vue";
import { defineStore } from "pinia";

const useDropdownStore = defineStore("dropdown", () => {
  const openMenu = ref<null | "categories" | "prices" | "languages" | "notifications" | "user">(null);

  const toggleMenu = (menu: "categories" | "prices" | "languages" | "notifications" | "user") => {
    openMenu.value = openMenu.value === menu ? null : menu;
  };

  const closeAllMenus = () => {
    openMenu.value = null;
  };

  return { openMenu, toggleMenu, closeAllMenus };
});

export default useDropdownStore;
