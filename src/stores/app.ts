import { ref } from "vue";
import { defineStore } from "pinia";

const useAppStore = defineStore("app", () => {
  const loading = ref<boolean>(false);
  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  return { loading, setLoading };
});

export default useAppStore;
