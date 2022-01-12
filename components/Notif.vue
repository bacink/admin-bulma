<template>
  <b-notification :type="type" aria-close-label="Close notification"
    ><slot />
  </b-notification>
</template>
<script>
export default {
  props: {
    type: {
      default: 'is-success',
      type: String,
    },
  },
}
</script>
