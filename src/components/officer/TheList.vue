<template>
  <tr
    v-for="officer in officers"
    :key="officer.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ officer.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ officer.name }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ officer.username }}</td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <button
          @click.prevent="showEditModal(officer)"
          class="flex items-center justify-between px-1 py-1 text-sm font-medium leading-5 text-green-600 rounded-lg dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          aria-label="Edit"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>
        </button>
        <button
          @click.prevent="showDeleteModal(officer)"
          class="flex items-center justify-between px-1 py-1 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Delete"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </td>
  </tr>

  <FormModal
    v-model="isEditModalOpen"
    title="Edit Data Petugas"
    buttonText="Submit"
    :onConfirm="handleUpdate"
    :isPending="isPending"
  >
    <InputGroup>
      <TheLabel target="name" label="Nama" />
      <OutlineInput id="name" type="text" v-model="formData.name" />
      <InputError
        v-if="errors && errors.errors && errors.errors.name"
        :label="errors.errors.name[0]"
      />
    </InputGroup>

    <InputGroup>
      <TheLabel target="username" label="Username" />
      <OutlineInput id="username" type="text" v-model="formData.username" />
      <InputError
        v-if="errors && errors.errors && errors.errors.username"
        :label="errors.errors.username[0]"
      />
    </InputGroup>
  </FormModal>

  <ClassicModal
    v-model="isDeleteModalOpen"
    title="Apakah anda yakin?"
    :description="
      'Anda akan menghapus data Petugas dengan nama ' + formData.name
    "
    buttonText="Hapus"
    :onConfirm="handleDestroy"
    :isPending="isPending"
  />

  <AppModal
    v-model="isModalAlertOpen"
    title="Sukses!"
    :description="modalData.description"
    buttonText="OK"
    :modalIcon="modalData.modalIcon"
    :onConfirm="toggleModalAlert"
  />
</template>

<script>
import { reactive, ref } from "vue";
import useOfficer from "@/composables/useOfficer";
import FormModal from "@/components/ui/FormModal";
import TheLabel from "@/components/ui/TheLabel";
import OutlineInput from "@/components/ui/OutlineInput";
import InputError from "@/components/ui/InputError";
import InputGroup from "@/components/ui/InputGroup";
import ClassicModal from "@/components/ui/ClassicModal";
import AppModal from "@/components/ui/AppModal";

export default {
  components: {
    OutlineInput,
    InputError,
    FormModal,
    TheLabel,
    InputGroup,
    ClassicModal,
    AppModal,
  },
  async setup() {
    const {
      officers,
      fetchOfficer,
      updateOfficer,
      destroyOfficer,
      errors,
      isPending,
    } = useOfficer();
    const isEditModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      id: "",
      name: "",
      username: "",
      password: "",
      password_confirmation: "",
    });
    const modalData = reactive({
      description: "",
      modalIcon: "",
    });

    await fetchOfficer(1, 10);

    function showEditModal(officer) {
      isEditModalOpen.value = true;

      formData.id = officer.id;
      formData.name = officer.name;
      formData.username = officer.username;
    }

    function showDeleteModal(officer) {
      isDeleteModalOpen.value = true;

      formData.id = officer.id;
      formData.name = officer.name;
      formData.username = officer.username;
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    async function handleUpdate() {
      await updateOfficer(formData);

      if (!errors.value) {
        modalData.description = "Data Petugas berhasil diedit.";
        modalData.modalIcon = "success";

        isEditModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.tahun = "";
        formData.nominal = "";
      }
    }

    async function handleDestroy() {
      await destroyOfficer(formData.id);

      if (!errors.value) {
        modalData.description = "Data Petugas berhasil dihapus.";
        modalData.modalIcon = "success";

        isDeleteModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.tahun = "";
        formData.nominal = "";
      }
    }

    return {
      errors,
      officers,
      formData,
      isEditModalOpen,
      showEditModal,
      handleUpdate,
      isPending,
      isDeleteModalOpen,
      handleDestroy,
      showDeleteModal,
      isModalAlertOpen,
      toggleModalAlert,
      modalData,
    };
  },
};
</script>