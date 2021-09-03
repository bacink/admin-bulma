<template>
  <SelectRole v-model.number="bacink" />
</template>

<script>
import SelectRole from '@/components/SelectOption/Role'

export default {
  components: { SelectRole },
  data() {
    return {
      bacink: null,
    }
  },
}
</script>
