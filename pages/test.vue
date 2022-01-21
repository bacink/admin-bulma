<template>
  <button-delete
    v-model="formData.id"
    action="syarat_pengajuan"
    name="Syarat Pengajuan"
  />
</template>
<script>
import ButtonDelete from '@/components/Button/Delete'
export default {
  components: { ButtonDelete },
  data() {
    return {
      formData: {
        id: 1,
      },
    }
  },
}
</script>
