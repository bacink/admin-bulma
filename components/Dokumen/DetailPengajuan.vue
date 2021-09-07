<template>
  <b-table
    :data="isEmpty ? [] : data"
    :bordered="isBordered"
    :striped="isStriped"
    :narrowed="isNarrowed"
    :hoverable="isHoverable"
    :loading="isLoading"
    :focusable="isFocusable"
    :mobile-cards="hasMobileCards"
  >
    <b-table-column v-slot="props" field="id" label="ID" width="40">
      {{ props.row.id }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      field="syarat_pengajuan.id"
      label="Syarat Pengajuan"
    >
      {{ props.row.syarat_pengajuan.nama }}
    </b-table-column>
    <b-table-column
      v-slot="props"
      field="verifikasi.status"
      label="Status Verifikasi"
    >
      <div v-if="props.row.verifikasi">
        <div v-if="props.row.verifikasi.status === 'ms'">
          <b-button
            icon-left="check"
            size="is-small"
            type="is-success"
            label="Memenuhi syarat"
          ></b-button>
        </div>
        <div v-else>
          <b-button
            icon-left="close"
            size="is-small"
            type="is-danger"
            label="Tidak memenuhi syarat"
          ></b-button>
        </div>
      </div>
    </b-table-column>
    <b-table-column v-slot="props" label="Dokumen" width="40">
      <b-button
        icon-left="file"
        label="Lihat Berkas"
        type="is-info"
        @click="verifikasiModal(props.row.id, props.row.id_pengajuan)"
      />
    </b-table-column>
    <template #empty>
      <div class="has-text-centered">No records</div>
    </template>
  </b-table>
</template>

<script>
import verifikasiModal from '@/components/Modal/Verifikasi.vue'

export default {
  data() {
    return {
      data: [],
      isBordered: true,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      isLoading: true,
      isFocusable: true,
      hasMobileCards: true,
      isEmpty: true,
    }
  },
  mounted() {
    this.loadAsyncData()
  },
  methods: {
    loadAsyncData() {
      this.isLoading = true
      this.$axios
        .get(`/dokumen/${this.$route.params.id}`)
        .then(({ data }) => {
          this.isEmpty = false
          this.isLoading = false
          this.data = []
          data.data.forEach((item) => {
            this.data.push(item)
          })
        })
        .catch((error) => {
          this.data = []
          this.total = 0
          this.isLoading = false
          this.isEmpty = true
          throw error
        })
    },
    verifikasiModal(x, y) {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: verifikasiModal,
        fullScreen: true,
        hasModalCard: true,
        props: {
          idDokumen: x,
          idPengajuan: y,
        },
      })
      modal.$on('close', () => {
        this.loadAsyncData()
      })
    },
  },
}
</script>
