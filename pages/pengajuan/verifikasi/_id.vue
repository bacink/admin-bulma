<template>
  <div>
    <section class="section is-medium">
      <DokumenPengajuan :dokumen="data" />
    </section>
  </div>
</template>

<script>
import DokumenPengajuan from '@/components/Dokumen/SyaratPengajuan'

export default {
  components: { DokumenPengajuan },
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.getPengajuan(this.$route.params.id)
  },
  methods: {
    getPengajuan(id) {
      try {
        this.$axios.$get(`/dokumen/${id}`).then((resp) => {
          return (this.data = resp.data)
        })
      } catch (error) {}
    },
  },
}
</script>
