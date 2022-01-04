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
            <section class="section is-main-section">
              <div v-if="activeStep === '0'">
                <FormPengajuanPegawai class="tile is-child" />
              </div>

              <div v-else-if="activeStep === '1'">
                <FormPengajuanUploadBerkas
                  :id-pegawai="id_pegawai"
                  :jenis-jafung-id="jenisJafungId"
                  class="tile is-child"
                />
              </div>
            </section>
          </card-component>
        </div>
      </template>
    </steps>
  </section>
</template>

<script>
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
      jenisJafungId: null,
      stepType: 'is-warning',
      stepItems: [
        {
          label: 'Identitas Pegawai',
          icon: 'account-key',
          title: 'Identitas Pegawai',
          type: 'is-success',
          value: '0',
        },
        {
          label: 'Upload Berkas Persyaratan',
          icon: 'upload',
          title: 'Upload Berkas',
          type: 'is-primary',
          value: '1',
        },
        {
          label: 'Selesai',
          icon: 'certificate',
          title: 'Selesai',
          type: 'is-success',
          value: '2',
        },
      ],
    }
  },
  created() {
    if (this.$route.params.id) {
      this.cekStep(this.$route.params.id)
    }
  },
  methods: {
    cekStep(id) {
      this.$axios
        .$get(`/pengajuan/cekStep/${id}`)
        .then((resp) => {
          if (resp.success) {
            const data = resp.data
            if (data.status === 'form') {
              this.activeStep = '1'
              this.id_pegawai = data.id_pegawai
            } else if (data.status !== 'cetak_sk') {
              this.activeStep = '1'
              this.id_pegawai = data.id_pegawai
            }

            this.jenisJafungId = data.id_jenis_jafung
          }
        })
        .catch((err) => {
          throw err
        })
    },
  },
}
</script>
