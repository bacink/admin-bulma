<template>
  <section class="section section-pengajuan">
    <steps
      :step-items="stepItems"
      :active-step="activeStep"
      :has-navigation="false"
      :step-type="stepType"
    >
      <template slot-scope="{ content }">
        <h3 class="title has-text-centered">{{ content.title }}</h3>
        <div>
          <card-component
            :title="`Form ` + content.title"
            icon="form"
            header-icon="pencil"
          >
            <template v-if="activeStep == 0">
              <section class="section is-main-section">
                <FormPengajuanPegawai class="tile is-child" />
              </section>
            </template>
            <template v-else> <FormPengajuanUploadBerkas /> </template>
          </card-component>
        </div>
      </template>
    </steps>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import Steps from '@/components/Steps'
import CardComponent from '@/components/CardComponent'
import FormPengajuanPegawai from '@/components/Form/Pengajuan/Pegawai'
import FormPengajuanUploadBerkas from '@/components/Form/Pengajuan/UploadBerkas'
export default {
  components: {
    Steps,
    CardComponent,
    FormPengajuanPegawai,
    FormPengajuanUploadBerkas,
  },
  data() {
    return {
      activeStep: '0',
      stepType: 'is-warning',
      stepItems: [
        {
          label: 'Identitas Pegawai',
          icon: 'account-key',
          title: 'Identitas Pegawai',
          type: 'is-success',
          value: '1',
        },
        {
          label: 'Upload Berkas Persyaratan',
          icon: 'upload',
          title: 'Account',
          type: 'is-primary',
          value: '2',
        },
        {
          label: 'Selesai',
          icon: 'certificate',
          title: 'Selesai',
          type: 'is-success',
          value: '3',
        },
      ],
    }
  },
  computed: {
    ...mapState(['userName', 'userId']),
  },
  mounted() {},

  methods: {},
}
</script>
