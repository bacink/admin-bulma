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
                  <b-taglist attached>
                    <b-tag type="is-dark">{{ item.deskripsi }}</b-tag>
                    <b-tag type="is-info">{{ item.tanggal_selisih }}</b-tag>
                  </b-taglist>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tracking: [],
    }
  },
  mounted() {
    this.loadAsyncData(this.$route.params.id)
  },
  methods: {
    loadAsyncData(id) {
      this.$axios
        .get(`tracking/pengajuan/${id}`)
        .then((resp) => {
          this.tracking = resp.data
          if (resp.data.success) {
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'success',
              queue: false,
            })
          }
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
