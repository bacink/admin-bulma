<template>
  <b-card title="Profile Pegawai">
    <div v-if="formData">
      <b-field label="Nama" label-position="on-border">
        <b-input :value="formData.nama" readonly></b-input>
      </b-field>
      <b-field label="Nip" label-position="on-border">
        <b-input :value="formData.nip" readonly></b-input>
      </b-field>

      <b-field grouped>
        <b-field label="Tempat Lahir" label-position="on-border" expanded>
          <b-input :value="formData.tempat_lahir" readonly></b-input>
        </b-field>
        <b-field label="Tanggal Lahir" label-position="on-border" expanded>
          <b-input :value="formData.tanggal_lahir" readonly></b-input>
        </b-field>
      </b-field>

      <b-field grouped>
        <b-field label="Pangkat" label-position="on-border" expanded>
          <b-input :value="formData.pangkat" readonly></b-input>
        </b-field>
        <b-field label="Golongan" label-position="on-border" expanded>
          <b-input :value="formData.golongan" readonly></b-input>
        </b-field>
      </b-field>

      <b-field label="Pendidikan" label-position="on-border">
        <b-input :value="formData.pendidikan" readonly></b-input>
      </b-field>
      <b-field label="jurusan" label-position="on-border">
        <b-input
          :value="formData.jurusan"
          type="textarea"
          maxlength="300"
          readonly
        ></b-input>
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
