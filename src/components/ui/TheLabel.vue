<template>
  <label
    :for="target"
    class="text-sm font-medium text-gray-600 dark:text-gray-300"
  >
    {{ label }}
  </label>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>