<template>
  <p class="control">
    <b-button
      :value="value"
      :label="label ? 'Restore' : ''"
      icon-left="restore"
      type="is-success"
      size="is-small"
      @click="confirm(value)"
    />
  </p>
</template>
<script>
export default {
  props: {
    value: { type: Number, default: 0 },
    name: { type: String, default: null },
    action: {
      type: String,
      default: null,
    },
    label: { type: Boolean, default: true },
  },
  data() {
    return {}
  },

  methods: {
    confirm(id) {
      this.$buefy.dialog.confirm({
        title: `Restore ${this.name}`,
        message: `Anda yakin akan <b>mengembalikan</b> ${this.name} ini?`,
        confirmText: `Restore ${this.name}`,
        type: 'is-info',
        hasIcon: true,
        onConfirm: () => this.restore(id),
      })
    },

    restore(id) {
      this.isLoading = true
      this.$axios
        .patch(`/${this.action}`, {
          id,
        })
        .then((resp) => {
          if (resp.data.success) {
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'is-success',
              queue: false,
            })
            location.reload()
          }
        })
        .catch((err) => {
          this.isLoading = false
          throw err
        })
    },
  },
}
</script>
