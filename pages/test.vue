<template>
  <card-component title="Profile Pegawai" icon="account">
    <Ac-Jabatan />
  </card-component>
</template>
<script>
import AcJabatan from '@/components/AutoComplete/Jabatan.vue'
import CardComponent from '@/components/CardComponent.vue'
export default {
  components: { AcJabatan, CardComponent },
  data() {
    return {}
  },
  methods: {},
}
</script>
