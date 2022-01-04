<template>
  <section>
    <b-card title="Progres Usulan Jafung">
      <div class="timeline is-centered">
        <header class="timeline-header">
          <span class="tag is-medium is-primary">Start</span>
        </header>
        <div
          v-for="item in tracking.data"
          :key="item.id"
          class="timeline-item is-warning"
        >
          <div class="timeline-marker is-primary"></div>

          <div class="timeline-content">
            <div class="box">
              <p class="heading">
                {{ item.tanggal }}
              </p>
              <div class="block">
                <p>
                  <b-icon
                    icon="account-circle"
                    size="is-small"
                    type="is-primary"
                  >
                  </b-icon>
                  {{ item.aktor.toUpperCase() }}
                </p>
                <div class="control">
                  <template v-if="item.deskripsi.slice(0, 7) === 'ditolak'">
                    <b-taglist attached>
                      <b-tag type="is-danger">{{ item.deskripsi }}</b-tag>
                      <b-tag type="is-info">{{ item.tanggal_selisih }}</b-tag>
                    </b-taglist>
                    <ol>
                      <li
                        v-for="ket in keterangan(item.pengajuan.verifikasi)"
                        :key="ket.id"
                      >
                        {{ ket.syarat_pengajuan.nama }}
                        <b-tag type="is-danger">{{ ket.keterangan }}</b-tag>
                      </li>
                    </ol>
                  </template>
                  <template v-else>
                    <b-tag type="is-success">{{ item.deskripsi }}</b-tag>
                    <b-tag type="is-info">{{ item.tanggal_selisih }}</b-tag>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="finish" class="timeline-header">
          <span class="tag is-medium is-primary">Finish</span>
        </div>
      </div>
    </b-card>
    <b-loading
      v-model="isLoading"
      :is-full-page="isFullPage"
      :can-cancel="true"
    ></b-loading>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tracking: [],
      finish: false,
      isLoading: true,
      isFullPage: true,
    }
  },
  mounted() {
    this.loadAsyncData(this.$route.params.id)
  },
  methods: {
    keterangan(data) {
      return data.filter(function (item) {
        return item.status === 'tms'
      })
    },
    loadAsyncData(id) {
      this.isLoading = true
      this.$axios
        .get(`tracking/pengajuan/${id}`)
        .then((resp) => {
          this.tracking = resp.data

          this.tracking.data.filter((element) => {
            if (element.deskripsi === 'cetak_sk') {
              return (this.finish = true)
            }
          })
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false

          this.$buefy.toast.open({
            message: `Error: ${err.response.data.message}`,
            type: 'is-danger',
            queue: false,
          })
        })
    },
  },
}
</script>
