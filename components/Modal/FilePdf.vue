<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Dokumen</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body section">
        <div class="columns is-centered">
          <div class="column is-half box">
            <b-field class="grouped group-multiline">
              <div class="control">
                <span class="button is-static">{{ page }}</span>
                <span class="button is-static">/</span>
                <span class="button is-static">{{ numPages }}</span>
                <b-button
                  type="is-info"
                  icon-left="mdi mdi-rotate-right"
                  @click="rotate += 90"
                ></b-button>
                <b-button
                  type="is-info"
                  icon-left="mdi mdi-rotate-left"
                  @click="rotate -= 90"
                ></b-button>
                <b-button
                  type="is-primary"
                  icon-left="mdi mdi-chevron-left"
                  :disabled="disabled_min"
                  @click="page -= 1"
                ></b-button>
                <b-button
                  type="is-primary"
                  icon-left="mdi mdi-chevron-right"
                  :disabled="disabled_plus"
                  @click="page += 1"
                ></b-button>
              </div>
            </b-field>
            <div
              v-if="loadedRatio > 0 && loadedRatio < 1"
              style="background-color: green; color: white; text-align: center"
              :style="{ width: loadedRatio * 100 + '%' }"
            >
              {{ Math.floor(loadedRatio * 100) }}%
            </div>
            <pdf-viewer
              ref="pdf"
              style="border: 1px solid red"
              :src="`https://api.jafung.test/api/dokumen/pdf/${idDokumen}`"
              :page="page"
              :rotate="rotate"
              @progress="loadedRatio = $event"
              @num-pages="numPages = $event"
              @link-clicked="page = $event"
            ></pdf-viewer>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
      </footer>
    </div>
  </div>
</template>
<script>
import pdfViewer from 'vue-pdf'

export default {
  components: {
    pdfViewer,
  },
  props: {
    idDokumen: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      numPages: 0,
      page: 1,
      loadedRatio: 0,
      rotate: 0,
      disabled_plus: false,
      disabled_min: true,
    }
  },
  watch: {
    // a computed getter
    page(val) {
      if (val === this.numPages) {
        return (this.disabled_plus = true)
      } else if (val === 1) {
        return (this.disabled_min = true)
      } else {
        this.disabled_min = false
        this.disabled_plus = false
      }
    },
  },
}
</script>
