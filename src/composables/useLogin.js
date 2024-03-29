import { ref } from "vue";
import app from "@/main";
import ApiService from "@/services/api";
import router from "@/router";

const errors = ref({});
const isPending = ref(false);

const login = async (formData) => {
  isPending.value = true;

  try {
    await ApiService.get("/sanctum/csrf-cookie");
  } catch (e) {
    console.log(e.response);
  }

  try {
    await ApiService.post("/login", formData);

    errors.value = null;

    // if (res.data.data.role === "administrator") {
    router.push({ name: "Home" });
    // }
  } catch (e) {
    app.$Progress.fail();

    errors.value = e.response.data;
  }

  isPending.value = false;
};

const logout = async () => {
  isPending.value = true;

  try {
    await ApiService.post("/logout");

    errors.value = null;

    router.push({ name: "Login" });
  } catch (e) {
    app.$Progress.fail();

    errors.value = e.response.data;
  }

  isPending.value = false;
};

const useLogin = () => {
  return { login, isPending, errors, logout };
};

export default useLogin;
