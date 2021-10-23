<template>
  <b-card title="Karir Lama">
    <div v-if="formData">
      <b-field label-position="on-border" label="Jabatan">
        <b-input v-model="formData.jabatan" readonly></b-input>
      </b-field>
      <b-field label-position="on-border" label="Unit Kerja">
        <b-input v-model="formData.unit_kerja" readonly></b-input>
      </b-field>
      <b-field label-position="on-border" label="Skpd">
        <b-input v-model="formData.skpd" readonly maxlength="300"></b-input>
      </b-field>
    </div>
  </b-card>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,

      default() {
        return {}
      },
    },
  },
}
</script>
