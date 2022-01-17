<template>
  <section>
    <b-field label="">
      <b-autocomplete
        :value="value"
        :id-skpd="idSkpd"
        :data="data"
        :loading="isFetching"
        :keep-first="keepFirst"
        open-on-focus
        placeholder="Cari Jabatan"
        field="nama_lengkap"
        icon="magnify"
        clearable
        required
        @typing="getAsyncData"
        @focus="getAsyncData"
        @select="(option) => (selected = option)"
        @input="$emit('input', $event, selected)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-content">
              {{ props.option.nama }}, <b>{{ props.option.jenjang }}</b>
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
  },
  data() {
    return {
      data: [],
      isFetching: false,
      selected: null,
      keepFirst: true,
    }
  },
  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncData: debounce(function (query) {
      if (!query.length) {
        this.data = []
        return
      }
      this.isFetching = true
      this.$axios
        .$get(`/sotk/jabatan/q?search=${query}&id_skpd=${this.idSkpd}`)
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
