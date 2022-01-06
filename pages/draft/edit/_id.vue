<template>
  <section>
    <template v-if="kode === 'ppk'">
      <FormPpk />
    </template>
  </section>
</template>
<script>
import FormPpk from '@/components/Form/Draft/Edit/ppk'
export default {
  components: { FormPpk },
  data() {
    return {
      kode: null,
    }
  },
  mounted() {
    this.loadDraft()
  },
  methods: {
    loadDraft() {
      this.$axios
        .$get(`/draft/${this.$route.params.id}`)
        .then(({ data }) => {
          this.kode = data.isi.kode
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
