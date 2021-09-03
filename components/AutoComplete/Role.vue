<template>
  <section>
    <b-field label="">
      <b-autocomplete
        :value="value"
        :data="data"
        :loading="isFetching"
        :required="required"
        placeholder="Role"
        field="id"
        icon="magnify"
        clearable
        @typing="getAsyncData"
        @select="(option) => (selected = option)"
        @input="$emit('input', $event, selected)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-content">
              {{ props.option.nama }}
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
        .$get(`/role`)
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
