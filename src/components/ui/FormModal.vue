<template>
  <transition name="backdrop-fade">
    <div
      v-show="modelValue"
      @click.self="cancelModal"
      class="fixed inset-0 z-30 flex bg-black bg-opacity-50 items-center justify-center"
    >
      <transition name="modal-popout">
        <form
          @submit.prevent="onConfirm"
          v-show="modelValue"
          class="w-11/12 px-6 py-4 overflow-hidden bg-white dark:bg-gray-800 rounded-xl sm:m-4 sm:max-w-xl"
        >
          <header
            class="flex justify-between -mx-6 -my-4 px-6 py-4 bg-gray-50 dark:bg-gray-900"
          >
            <h4 class="text-xl font-extrabold text-gray-800 dark:text-gray-50">
              E-SPP
            </h4>
            <button
              type="button"
              class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded focus:outline-none focus:ring-2 dark:hover:text-gray-200 hover: hover:text-gray-700"
              aria-label="close"
              @click.prevent="cancelModal"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </header>
          <div class="my-8">
            <p class="mb-6 text-2xl font-bold text-gray-700 dark:text-gray-300">
              {{ title }}
            </p>
            <slot />
          </div>
          <footer
            class="flex flex-row items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-50 dark:bg-gray-800"
          >
            <BasicButton type="submit" :isSubmitted="isPending">
              {{ buttonText }}
            </BasicButton>
          </footer>
        </form>
      </transition>
    </div>
  </transition>
</template>

<script>
import BasicButton from "@/components/ui/BasicButton";

export default {
  components: { BasicButton },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
    isPending: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    return {
      cancelModal() {
        console.log("halo");
        props.onCancel();
        context.emit("update:modelValue", false);
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  @apply opacity-0;
}
.backdrop-fade-enter-active {
  @apply transition ease-out duration-150;
}
.backdrop-fade-enter-to {
  @apply opacity-100;
}
.backdrop-fade-leave-from {
  @apply opacity-100;
}
.backdrop-fade-leave-active {
  @apply transition ease-in duration-150;
}
.modal-popout-enter-from,
.modal-popout-leave-to {
  @apply opacity-0 transform translate-y-1/2;
}
.modal-popout-enter-active {
  @apply transition ease-out duration-150;
}
.modal-popout-enter-to {
  @apply opacity-100;
}
.modal-popout-leave-from {
  @apply opacity-100;
}
.modal-popout-leave-active {
  @apply transition ease-in duration-150;
}
</style>
