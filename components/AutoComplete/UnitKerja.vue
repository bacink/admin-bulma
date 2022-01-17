<template>
  <section>
    <b-field label="">
      <b-autocomplete
        :value="value"
        :data="data"
        :id-skpd="idSkpd"
        :loading="isFetching"
        :keep-first="true"
        placeholder="Cari Unit Kerja"
        field="unit_kerja.nama"
        icon="magnify"
        clearable
        open-on-focus
        @typing="getAsyncData"
        @select="(option) => (selected = option)"
        @input="$emit('input', $event, selected)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-content">
              <b>{{ props.option.unit_kerja.jenis }}</b
              >, {{ props.option.unit_kerja.nama }}
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    idSkpd: {
      type: Number,
      default: null,
    },
    jenjang: {
      type: String,
      default: null,
    },
    jabatan: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      data: [],
      isFetching: false,
      selected: null,
    }
  },

  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncData: debounce(function (query) {
      if (!query.length) {
        this.$axios
          .$get(
            `/sotk/unit_kerja/byJabatan?jabatan=${this.jabatan}&id_skpd=${this.idSkpd}&jenjang=${this.jenjang}`
          )
          .then(({ data }) => {
            this.data = []
            data.forEach((item) => this.data.push(item))
          })
          .catch((error) => {
            this.data = []
            throw error
          })
          .finally(() => {
            this.isFetching = false
          })
      }
      this.isFetching = true

      this.$axios
        .$get(
          `/sotk/unit_kerja/byJabatan?unit_kerja=${query}&jabatan=${this.jabatan}&id_skpd=${this.idSkpd}&jenjang=${this.jenjang}`
        )

        .then(({ data }) => {
          this.data = []
          data.forEach((item) => this.data.push(item))
        })
        .catch((error) => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 200),
  },
}
</script>
