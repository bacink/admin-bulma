<template>
  <section>
    <b-field label="">
      <b-autocomplete
        :value="value"
        :data="data"
        :loading="isFetching"
        :keep-first="true"
        placeholder="Cari SKPD"
        field="nama"
        icon="magnify"
        clearable
        @typing="getAsyncData"
        @select="(option) => (selected = option)"
        @input="$emit('input', $event, selected)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-content">
              <b>{{ props.option.singkatan }}</b
              >, {{ props.option.nama }}
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
        this.data = []
        return
      }
      this.isFetching = true
      this.$axios
        .$get(`/sotk/skpd/search?search=${query}`)
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
