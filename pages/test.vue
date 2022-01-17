<template>
  <SelectOptionJabatan v-model="jabatan" />
</template>
<script>
import SelectOptionJabatan from '@/components/SelectOption/Jabatan'
export default {
  components: { SelectOptionJabatan },
  data() {
    return {
      jabatan: null,
    }
  },
}
</script>
