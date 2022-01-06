<template>
  <form name="formData" @submit.prevent="simpan">
    <div class="columns is-multiline is-desktop">
      <div class="column">
        <b-card title="Draft Surat Keputusan">
          <template v-if="!isLoading">
            <center>
              <p>
                <strong>KEPUTUSAN BUPATI KARAWANG</strong>
                <br />
                <b-field>
                  <b-input
                    v-model="formData.kop_depan"
                    placeholder="This is expanded"
                    expanded
                  ></b-input>
                  <p class="control">
                    <span class="button is-static">{{
                      formData.isi.nomor
                    }}</span>
                  </p>
                  <b-input
                    v-model="formData.kop_belakang"
                    placeholder="This is expanded"
                    expanded
                  ></b-input>
                </b-field>
              </p>
              <p>
                <strong>
                  TENTANG <br />
                  {{ formData.isi.tentang }} <br />
                  BUPATI KARAWANG,
                </strong>
              </p>
            </center></template
          >
          <template v-else>
            <b-skeleton size="is-large" :active="isLoading"></b-skeleton>
            <b-skeleton size="is-large" :active="isLoading"></b-skeleton>
            <b-skeleton size="is-large" :active="isLoading"></b-skeleton>
            <b-skeleton size="is-large" :active="isLoading"></b-skeleton>
            <b-skeleton size="is-large" :active="isLoading"></b-skeleton>
            <b-skeleton size="is-large" :active="isLoading"></b-skeleton>
          </template>
          <template v-if="!isLoading">
            <table width="100%" class="table">
              <tr>
                <td width="15">Menimbang</td>
                <td width="2%">:</td>
                <td width="2%" align="center">a.</td>
                <td colspan="3">
                  <b-input
                    v-model="formData.isi.menimbang.a"
                    type="textarea"
                  ></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td width="2%" align="center">:</td>
                <td width="2%" align="center">b.</td>
                <td colspan="3">
                  <b-input
                    v-model="formData.isi.menimbang.b"
                    type="textarea"
                  ></b-input>
                </td>
              </tr>
              <tr
                v-for="(item, index) in formData.isi.mengingat"
                :key="item.id"
                has-background-info
              >
                <template v-if="index === 0">
                  <td>Mengingat</td>
                  <td width="2%" align="center">:</td>
                  <td width="2%" align="center">{{ item.nomor }}</td>
                  <td colspan="3">
                    <b-input
                      :value="item.text"
                      @input="gantiMengingat(index, $event)"
                    ></b-input>
                  </td>
                </template>
                <template v-else>
                  <td></td>
                  <td></td>
                  <td width="2%" align="center">{{ item.nomor }}</td>
                  <td colspan="3">
                    <b-input
                      :value="item.text"
                      @input="gantiMengingat(index, $event)"
                    ></b-input>
                  </td>
                </template>
              </tr>
              <tr>
                <td>Memperhatikan</td>
                <td align="center">:</td>
                <td colspan="4">
                  <b-input
                    v-model="formData.isi.memperhatikan"
                    type="textarea"
                  ></b-input>
                </td>
              </tr>
              <tr>
                <td colspan="6" style="padding: -90px !important">
                  <center>
                    <h4>MEMUTUSKAN:</h4>
                  </center>
                </td>
              </tr>
              <tr>
                <td>Menetapkan</td>
                <td align="center">:</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>KESATU</td>
                <td>:</td>
                <td colspan="4">
                  <b-input v-model="formData.isi.kesatu.a"></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td align="center">1.</td>
                <td>Nama</td>
                <td width="2%" align="center">:</td>
                <td>
                  <b-input v-model="formData.isi.pegawai.nama"></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td align="center">2.</td>
                <td>Nip</td>
                <td width="2%" align="center">:</td>
                <td>
                  <b-input v-model="formData.isi.pegawai.nip"></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td align="center">3.</td>
                <td>Tempat,Tanggal Lahir</td>
                <td width="2%" align="center">:</td>
                <td>
                  <b-input v-model="formData.isi.pegawai.ttl"></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td align="center">4.</td>
                <td>Pangkat, Gol.Ruang</td>
                <td width="2%" align="center">:</td>
                <td>
                  <b-input v-model="formData.isi.pegawai.pangkat_gol"></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td align="center">5.</td>
                <td>Pendidikan Formal</td>
                <td width="2%" align="center">:</td>
                <td>
                  <b-input v-model="formData.isi.pegawai.pendidikan"></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td align="center">6.</td>
                <td>Jabatan Lama</td>
                <td width="2%" align="center">:</td>
                <td>
                  <b-input
                    v-model="formData.isi.pegawai.jabatan_lama"
                  ></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td align="center">7.</td>
                <td>Unit Kerja</td>
                <td width="2%" align="center">:</td>
                <td>
                  <b-input v-model="formData.isi.pegawai.unit_kerja"></b-input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="4">
                  <b-input
                    v-model="formData.isi.kesatu.b"
                    type="textarea"
                  ></b-input>
                </td>
              </tr>
              <tr>
                <td>KEDUA</td>
                <td width="2%" align="center">:</td>
                <td colspan="4">
                  {{ formData.isi.kedua }}
                </td>
              </tr>
              <tr>
                <td>KETIGA</td>
                <td width="2%" align="center">:</td>
                <td colspan="4">
                  Apabila dikemudian hari terdapat kekeliruan dalam keputusan
                  ini, akan diadakan perbaikan dan perhitungan kembali
                  sebagaimana mestinya. Asli Keputusan ini disampaikan kepada
                  Pegawai Negeri Sipil yang bersangkutan untuk diketahui dan
                  diindahkan sebagaimana mestinya.
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="4">
                  <b>Asli</b> Keputusan ini disampaikan kepada Pegawai Negeri
                  Sipil yang bersangkutan untuk diketahui dan diindahkan
                  sebagaimana mestinya.
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="3"></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="3"></td>
                <td>
                  <center>Ditetapkan di : <strong>KARAWANG</strong></center>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="3"></td>
                <td>
                  <center style="padding-bottom: 30px !important">
                    Pada tanggal : Tanggal
                  </center>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="3"></td>
                <td>
                  <center>
                    a.n BUPATI KARAWANG <br />
                    KEPALA BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBER DAYA
                    MANUSIA KABUPATEN KARAWANG,
                  </center>
                </td>
              </tr>

              <tr>
                <td colspan="5" style="padding: 20px"></td>
                <td colspan="1"></td>
              </tr>
              <tr>
                <td colspan="5">
                  <p style="padding-top: 50px !important">
                    <strong style="padding-left: 20px !important">
                      TEMBUSAN :
                    </strong>
                  </p>
                  <ol>
                    <li
                      v-for="(itm, index) in formData.isi.tembusan"
                      :key="index + 'a'"
                      :value="index === 0 ? 1 : ''"
                    >
                      <b-input
                        :value="itm.text"
                        @input="gantiTembusan(index, $event)"
                      ></b-input>
                    </li>
                  </ol>
                </td>
                <td colspan="1">
                  <center>
                    <p style="padding-top: -60px !important">
                      <b-input
                        v-model="formData.isi.penandatangan.nama"
                      ></b-input>
                      <br />
                      <b-input
                        v-model="formData.isi.penandatangan.pangkat"
                      ></b-input>
                      <br />
                      <b-input
                        v-model="formData.isi.penandatangan.nip"
                      ></b-input>
                    </p>
                  </center>
                </td>
              </tr>
            </table>
          </template>
          <template v-if="!isLoading">
            <b-button native-type="submit">simpan</b-button>
          </template>
          <template v-else>
            <b-skeleton :active="isLoading"></b-skeleton>
          </template>
        </b-card>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      formData: {
        id: this.$route.params.id,
        kop_depan: null,
        kop_belakang: null,
        isi: {
          tentang: null,
          memperhatikan: null,
          mengingat: [],
          tembusan: [],
          penandatangan: {
            nama: null,
            pangkat: null,
            nip: null,
          },
          menimbang: {
            a: null,
            b: null,
          },
          kesatu: {
            a: null,
            b: null,
          },
          pegawai: {
            nama: null,
            nip: null,
            ttl: null,
            pangkat_gol: null,
            pendidikan: null,
            jabatan_lama: null,
            unit_kerja: null,
          },
        },
      },
    }
  },
  mounted() {
    this.loadDraft()
  },
  methods: {
    loadDraft() {
      this.$axios
        .$get(`/draft/${this.$route.params.id}`)
        .then(({ data }) => {
          this.formData.isi = data.isi
          this.formData.kop_depan = data.kop_depan
          this.formData.kop_belakang = data.kop_belakang
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    gantiMengingat(index, newValue) {
      this.formData.isi.mengingat.filter(function (item, arrayIndex) {
        if (arrayIndex === index) {
          item.text = newValue
        }
      })
    },
    gantiTembusan(index, newValue) {
      this.formData.isi.tembusan.filter(function (itm, arrayIndex) {
        if (arrayIndex === index) {
          itm.text = newValue
        }
      })
    },
    simpan() {
      this.loading = true

      this.$axios
        .$patch('/draft', this.formData)
        .then((resp) => {
          if (resp.success) {
            setInterval(() => {
              this.loading = false
            }, 3 * 1000)
            this.$buefy.toast.open({
              message: `Success: ${resp.message}`,
              type: 'is-success',
              queue: false,
            })
            this.$router.push({ name: 'pengajuan-table' })
          }
        })
        .catch((err) => {
          setInterval(() => {
            this.loading = false
          }, 3 * 1000)
          this.$buefy.toast.open({
            message: `Error: ${Object.values(err.response.data)}`,
            type: 'is-danger',
            queue: false,
          })
        })
    },
  },
}
</script>
