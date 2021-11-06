<template>
  <section>
    <b-field label="">
      <b-autocomplete
        :value="value"
        :data="data"
        :loading="isFetching"
        :required="required"
        placeholder="Nama atu nip pegawai"
        field="nama_lengkap"
        icon="magnify"
        clearable
        @typing="getAsyncData"
        @select="(option) => (selected = option)"
        @input="$emit('input', $event, selected)"
        :expanded="expanded"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-content">
              {{ props.option.nama }}
              <br />
              <small>
                NIP: {{ props.option.nip }}, NAMA LENGKAP
                <b>{{ props.option.nama_lengkap }}</b>
              </small>
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
    required: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      expanded: true,
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
        this.data = []
        return
      }
      this.isFetching = true
      this.$axios
        .$get(`/pegawai/search?search=${query}`)
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
