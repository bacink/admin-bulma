<template>
  <section>
    <div class="timeline is-centered">
      <header class="timeline-header">
        <span class="tag is-medium is-primary">Start</span>
      </header>

      <div
        v-for="item in tracking.data"
        :key="item.id"
        class="timeline-item is-primary"
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
                  icon="android-messages"
                  size="is-small"
                  type="is-success"
                >
                </b-icon>
                {{ item.deskripsi }}
              </p>
              <p>
                <b-icon icon="clock" size="is-small" type="is-dark"> </b-icon>
                {{ item.tanggal_selisih }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          console.log(resp)
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
