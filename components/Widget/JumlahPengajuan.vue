<template>
  <tiles>
    <template v-for="(key, value) in data">
      <card-widget
        :key="key"
        class="tile is-child"
        type="is-primary"
        icon="file"
        :number="key"
        :label="value.split('_').join(' ').toUpperCase()"
      />
    </template>
  </tiles>
</template>

<script>
import Tiles from '@/components/Tiles'

import CardWidget from '@/components/CardWidget'

export default {
  components: { CardWidget, Tiles },
  data() {
    return {
      data: null,
    }
  },
  mounted() {
    this.getDashboard()
  },
  methods: {
    getDashboard() {
      this.$axios.$get('dashboard').then((response) => {
        this.data = response
      })
    },
  },
}
</script>
