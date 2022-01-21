<template>
  <p class="control">
    <b-button
      :value="value"
      :label="label ? 'Hapus' : ''"
      icon-left="delete"
      type="is-danger"
      size="is-small"
      @click="confirmHapus(value)"
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
    confirmHapus(id) {
      this.$buefy.dialog.confirm({
        title: 'Hapus Pengajuan',
        message: `Anda yakin akan <b>menghapus</b> ${this.name} ini? Pengajuan akan disimpan di <b>Trash ${this.name}.</b>`,
        confirmText: `Delete ${this.name}`,
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.hapus(id),
      })
    },

    hapus(id) {
      this.isLoading = true
      this.$axios
        .delete(`/${this.action}/${id}`)
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
