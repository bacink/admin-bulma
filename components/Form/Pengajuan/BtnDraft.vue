<template>
  <b-button
    label="View Draft"
    type="is-info"
    outlined
    size="is-small"
    icon-left="eye"
    tag="a"
    target="_blank"
    :href="`${$axios.defaults.baseURL}/print-draft/${idPengajuan}`"
  />
</template>

<script>
export default {
  props: {
    idPengajuan: {
      type: Number,
      default: 0,
    },
  },
}
</script>
