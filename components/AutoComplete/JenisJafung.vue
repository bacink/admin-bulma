<template>
  <section>
    <b-field label="">
      <b-autocomplete
        :value="value"
        :data="filteredData"
        open-on-focus
        field="nama"
        placeholder="Pilih Jenis Jafung"
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
  computed: {
    filteredData() {
      let tempRecipes = this.data

      if (this.value !== '' && this.value) {
        tempRecipes = tempRecipes.filter((item) => {
          return item.nama.toUpperCase().includes(this.value.toUpperCase())
        })
      }
      return tempRecipes
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.isFetching = true
      this.$axios
        .$get(`/jenis_jafung`)
        .then(({ data }) => {
          this.data = []
          this.data = data
        })
        .catch((error) => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    },
  },
}
</script>
