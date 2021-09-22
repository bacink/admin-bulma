<template>
  <section>
    <b-loading
      v-model="loading"
      :is-full-page="isFullPage"
      :can-cancel="true"
    ></b-loading>
    <div class="columns is-desktop">
      <div class="column is-one-third">
        <b-card title="Profile Pegawai">
          <div v-if="formData.pegawai">
            <b-field label="Nama" label-position="on-border">
              <b-input v-model="formData.pegawai.nama"></b-input>
            </b-field>
            <b-field label="Nip" label-position="on-border">
              <b-input v-model="formData.pegawai.nip"></b-input>
            </b-field>

            <b-field grouped>
              <b-field label="Pangkat" label-position="on-border" expanded>
                <b-input v-model="formData.pegawai.pangkat"></b-input>
              </b-field>
              <b-field label="Golongan" label-position="on-border" expanded>
                <b-input v-model="formData.pegawai.golongan"></b-input>
              </b-field>
            </b-field>

            <b-field grouped>
              <b-field label="Tempat Lahir" label-position="on-border" expanded>
                <b-input v-model="formData.pegawai.tempat_lahir"></b-input>
              </b-field>
              <b-field
                label="Tanggal Lahir"
                label-position="on-border"
                expanded
              >
                <b-input v-model="formData.pegawai.tanggal_lahir"></b-input>
              </b-field>
            </b-field>
            <b-field label="Pendidikan" label-position="on-border">
              <b-input v-model="formData.pegawai.pendidikan"></b-input>
            </b-field>
            <b-field label="jurusan" label-position="on-border">
              <b-input
                v-model="formData.pegawai.jurusan"
                type="textarea"
                maxlength="300"
              ></b-input>
            </b-field>
          </div>
        </b-card>
        <b-card title="Karir Lama">
          <div v-if="formData.karir_lama">
            <b-field label-position="on-border" label="Jabatan">
              <b-input v-model="formData.karir_lama.jabatan"></b-input>
            </b-field>
            <b-field label-position="on-border" label="Unit Kerja">
              <b-input v-model="formData.karir_lama.unit_kerja"></b-input>
            </b-field>
            <b-field label-position="on-border" label="Skpd">
              <b-input
                v-model="formData.karir_lama.skpd"
                maxlength="300"
              ></b-input>
            </b-field>
          </div>
        </b-card>
        <b-card title="Karir Baru">
          <div v-if="formData.karir_baru">
            <b-field label-position="on-border" label="Jenis Jafung">
              <b-input
                v-model="formData.karir_baru.jenis_jafung"
                maxlength="300"
              >
              </b-input>
            </b-field>

            <b-field label="Jabatan" label-position="on-border" expanded>
              <b-input v-model="formData.karir_baru.jabatan"></b-input>
            </b-field>

            <b-field label-position="on-border" label="Unit Kerja">
              <b-input v-model="formData.karir_baru.unit_kerja"></b-input>
            </b-field>

            <b-field label-position="on-border" label="Skpd">
              <b-input v-model="formData.karir_baru.skpd"></b-input>
            </b-field>

            <b-field grouped>
              <b-field
                label="Angka Kredit / Kelas Jabatan"
                label-position="on-border"
              >
                <b-input v-model="formData.karir_baru.ak_kredit"></b-input>
              </b-field>

              <b-field label="Tunjangan" label-position="on-border" expanded>
                <CurrencyInput
                  v-model="formData.karir_baru.tunjangan"
                  :options="{
                    locale: 'id-ID',
                    currency: 'IDR',
                    currencyDisplay: 'symbol',
                    valueRange: undefined,
                    precision: 0,
                    hideCurrencySymbolOnFocus: true,
                    hideGroupingSeparatorOnFocus: true,
                    hideNegligibleDecimalDigitsOnFocus: true,
                    autoDecimalDigits: false,
                    exportValueAsInteger: true,
                    autoSign: true,
                    useGrouping: true,
                  }"
                />
              </b-field>
            </b-field>
          </div>
        </b-card>
      </div>
      <div class="column">
        <b-card title="Form Draft">
          <b-field grouped label="Surat Keputusan">
            <b-field label="Nomor Depan" label-position="on-border" expanded>
              <b-input
                placeholder="Nomor Depan"
                :value="templateSurat.kop_depan"
              ></b-input>
            </b-field>
            <b-field label="Nomor" label-position="on-border" expanded>
              <b-input placeholder="Nomor"></b-input>
            </b-field>
            <b-field label="Nomor Belakang" label-position="on-border" expanded>
              <b-input
                placeholder="Nomor Belakang"
                :value="templateSurat.kop_depan"
              ></b-input>
            </b-field>
          </b-field>

          <b-field grouped>
            <b-field label="Tanggal" label-position="on-border">
              <b-input placeholder="Tanggal SK"></b-input>
            </b-field>
            <b-field label="TMT" label-position="on-border">
              <b-input placeholder="TMT SK"></b-input>
            </b-field>
          </b-field>

          <b-field label="Perihal" label-position="on-border">
            <b-input v-model="templateSurat.perihal" maxlength="300"></b-input>
          </b-field>
          <b-field grouped label="Menimbang" label-position="on-border">
            <b-input v-model="newMenimbang" maxlength="300" expanded></b-input>
            <p class="control">
              <b-button
                type="is-success"
                icon-right="plus"
                @click="addNewMenimbang"
              ></b-button>
            </p>
          </b-field>
          <b-field grouped label="Memperhatikan" label-position="on-border">
            <b-input
              v-model="newMemperhatikan"
              maxlength="300"
              expanded
            ></b-input>
            <p class="control">
              <b-button
                type="is-success"
                icon-right="plus"
                @click="addNewMemperhatikan"
              ></b-button>
            </p>
          </b-field>
        </b-card>
        <b-card title="Draft">
          <div class="has-text-centered">
            <h3 class="is-family-monospace has-text-weight-bold">
              Keputusan Bupati Karawang
            </h3>
            <h4 class="has-text-weight-semibold">
              NOMOR : {{ templateSurat.kop_depan
              }}{{ templateSurat.kop_belakang }}
            </h4>
            <p>TENTANG</p>

            <div v-if="formData.karir_baru">
              <h3 class="is-family-monospace has-text-weight-bold">
                {{ formData.karir_baru.jenis_jafung }}
              </h3>
            </div>
          </div>
          <table class="table is-bordered is-narrow">
            <tr v-for="(itemMenimbang, index) in menimbang" :key="'A' + index">
              <td><span v-if="index === 0">Menimbang</span></td>
              <td>:</td>
              <td>
                <span v-if="index === 0"> a </span>
                <span v-else-if="index === 1"> b </span>
                <span v-else-if="index === 2"> c </span>
                <span v-else-if="index === 3"> d </span>
                <span v-else-if="index === 4"> e </span>
                <span v-else-if="index === 5"> f </span>
              </td>
              <td>
                {{ itemMenimbang.text
                }}<b-button
                  icon-left="backspace"
                  type="is-danger"
                  size="is-small"
                  @click="menimbang.splice(index, 1)"
                ></b-button>
              </td>
            </tr>
            <template v-if="templateSurat.mengingat">
              <tr
                v-for="(item, index) in templateSurat.mengingat"
                :key="item.id"
              >
                <td><span v-show="index === 0">Mengingat</span></td>
                <td>:</td>
                <td>{{ index + 1 }}</td>
                <td>{{ item.text }}</td>
              </tr>
            </template>
            <tr
              v-for="(itemMemperhatikan, index) in memperhatikan"
              :key="'b' + index"
            >
              <td><span v-show="index === 0">Memperhatikan</span></td>
              <td>:</td>
              <td>{{ index + 1 }}</td>
              <td>
                {{ itemMemperhatikan.text }}
                <b-button
                  icon-left="backspace"
                  type="is-danger"
                  size="is-small"
                  @click="memperhatikan.splice(index, 1)"
                ></b-button>
              </td>
            </tr>
          </table>
          <div class="has-text-centered">
            <h3 class="is-family-monospace has-text-weight-bold">
              MEMUTUSKAN :
            </h3>
          </div>
          <table class="is-bordered table">
            <tr>
              <td>Menetapkan</td>
              <td>:</td>
              <td></td>
            </tr>
            <tr>
              <td>KESATU</td>
              <td>:</td>
              <td colspan="4">
                Terhitung mulai tanggal 1 (satu) bulan berikutnya setelah
                ditetapkan mengangkat dan memberhentikan Pegawai Negeri Sipil :
              </td>
            </tr>
            <template v-if="formData.pegawai">
              <tr>
                <td></td>
                <td></td>
                <td>a.</td>
                <td>Nama</td>
                <td>:</td>
                <td>{{ formData.pegawai.nama }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>b.</td>
                <td>Nip</td>
                <td>:</td>
                <td>{{ formData.pegawai.nip }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>c.</td>
                <td>Pangkat/Gol</td>
                <td>:</td>
                <td>
                  {{ formData.pegawai.pangkat }},
                  {{ formData.pegawai.golongan }}
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td colspan="4">
                  Melalui
                  {{ formData.karir_baru.jenis_jafung.toLowerCase() }} dalam
                  Jabatan Fungsional
                  <strong>{{ formData.karir_baru.jabatan }}</strong>
                  dengan AK. <b> {{ formData.karir_baru.ak_kredit }}</b> ({{
                    terbilang
                  }}) serta diberikan tunjangan Jabatan Fungsional sebesar Rp.{{
                    formData.karir_baru.tunjangan
                  }},-/bulan.
                </td>
              </tr>
              <tr>
                <td>KEDUA</td>
                <td>:</td>
                <td colspan="4">
                  Memberhentikan Pegawai Negeri Sipil sebagaimana DIKTUM KESATU
                  dari :
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>a.</td>
                <td>Jabatan</td>
                <td>:</td>
                <td>{{ formData.karir_lama.jabatan }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>b.</td>
                <td>Kelas/Jabatan</td>
                <td>:</td>
                <td>{{ formData.karir_lama.ak_kredit }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="4">
                  Serta tunjangan jabatannya dan dengan disertai ucapan terima
                  kasih atas segala curahan tenaga dan pikiran selama
                  menjalankan tugas tersebut.
                </td>
              </tr>
              <tr>
                <td>KETIGA</td>
                <td>:</td>
                <td colspan="4">
                  Apabila dikemudian hari ternyata terdapat kekeliruan dalam
                  keputusan ini, akan diadakan perbaikan dan perhitungan kembali
                  sebagaimana mestinya.
                </td>
              </tr>
              <tr>
                <td>KEEMPAT</td>
                <td>:</td>
                <td colspan="4">
                  Keputusan ini disampaikan kepada Pegawai Negeri Sipil yang
                  bersangkutan untuk diketahui dan diindahkan sebagaimana
                  mestinya.
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="2"></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="2"></td>
                <td colspan="2">
                  <p class="has-text-centered">
                    Ditetapkan di : <b>KARAWANG</b>
                  </p>
                </td>
              </tr>
              <tr class="mb-4">
                <td></td>
                <td></td>
                <td colspan="2"></td>
                <td colspan="2">
                  <p class="has-text-centered">Pada tanggal : <b></b></p>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="2"></td>
                <td colspan="2">
                  <p class="has-text-centered"><b>BUPATI KARAWANG</b></p>
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td colspan="2">
                  <div class="block my-6"></div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="content is-small">
                    <b>TEMBUSAN:</b>
                    <ol>
                      <li>Donec blandit a lorem id convallis.</li>
                      <li>Cras gravida arcu at diam gravida gravida.</li>
                      <li>Integer in volutpat libero.</li>
                      <li>Donec a diam tellus.</li>
                      <li>Aenean nec tortor orci.</li>
                      <li>
                        Quisque aliquam cursus urna, non bibendum massa viverra
                        eget.
                      </li>
                      <li>Vivamus maximus ultricies pulvinar.</li>
                    </ol>
                  </div>
                </td>
                <td colspan="2">
                  <p class="has-text-centered">
                    <b>{{ templateSurat.bupati }}</b>
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td colspan="2">
                  <p class="has-text-centered">barcode</p>
                </td>
              </tr>
            </template>
          </table>
        </b-card>
      </div>
    </div>
  </section>
</template>

<script>
import angkaTerbilang from '@develoka/angka-terbilang-js' // if using import
import CurrencyInput from '@/components/CurrencyInput'
export default {
  components: {
    CurrencyInput,
  },
  data() {
    return {
      formData: {
        pegawai: {
          nama: null,
          nip: null,
          pangkat: '',
          golongan: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          ak_kredit: '',
          tunjangan: 12345,
        },
        karir_lama: {
          jabatan: '',
          skpd: '',
          unit_kerja: '',
        },
        karir_baru: {
          jenis_jafung: '',
          jabatan: '',
          skpd: '',
          unit_kerja: '',
        },
        skpd: {
          kepala: '',
        },
      },
      templateSurat: {
        perihal: '',
        kop_depan: '',
        kop_belakang: '',
        mengingat: '',
        bupati: '',
      },

      menimbang: [],
      newMenimbangId: 0,
      newMenimbang: '',
      memperhatikan: [],
      newMemperhatikan: '',
      newMemperhatikanId: 0,
      loading: false,
      isFullPage: true,
    }
  },
  computed: {
    terbilang() {
      return angkaTerbilang(this.formData.karir_baru.ak_kredit)
    },
  },
  created() {
    this.getPengajuan()
    this.getBupati()
  },
  methods: {
    addNewMenimbang() {
      if (this.newMenimbang === '') {
      } else {
        if (this.menimbang) {
          this.newMenimbangId = this.menimbang.length
        } else {
          this.newMenimbangId = 0
        }
        this.menimbang.push({
          id: this.newMenimbangId++,
          text: this.newMenimbang,
        })
        this.newMenimbang = ''
      }
    },
    addNewMemperhatikan() {
      if (this.newMemperhatikan === '') {
      } else {
        if (this.memperhatikan) {
          this.newMemperhatikanId = this.memperhatikan.length
        } else {
          this.newMemperhatikanId = 0
        }

        this.memperhatikan.push({
          id: this.newMemperhatikanId++,
          text: this.newMemperhatikan,
        })
        this.newMemperhatikan = ''
      }
    },
    getPengajuan() {
      this.loading = true

      this.$axios
        .$get(`/pengajuan/${this.$route.params.id}`)
        .then(({ data }) => {
          this.formData.pegawai.nama = data.pegawai.nama_lengkap
          this.formData.pegawai.nip = data.pegawai.nip
          this.formData.pegawai.golongan = data.golongan.referensi.golongan
          this.formData.pegawai.pangkat = data.golongan.referensi.pangkat
          this.formData.pegawai.tempat_lahir = data.pegawai.tempat_lahir
          this.formData.pegawai.tanggal_lahir = data.pegawai.tanggal_lahir
          this.formData.pegawai.jurusan = data.pegawai.pendidikan.jurusan
          this.formData.pegawai.pendidikan = `${data.pegawai.pendidikan.tingkat.nama} (${data.pegawai.pendidikan.tingkat.singkatan})`

          this.formData.karir_lama.jabatan = data.jabatan_lama.jabatan.nama
          this.formData.karir_lama.skpd = data.jabatan_lama.jabatan.skpd.nama
          this.formData.karir_lama.unit_kerja =
            data.jabatan_lama.jabatan.unit_kerja.nama

          this.formData.karir_baru.jenis_jafung = data.jenis_jafung.nama
          this.formData.karir_baru.jabatan = data.jabatan_baru.nama_lengkap
          this.formData.karir_baru.skpd = data.jabatan_baru.skpd.nama
          this.formData.karir_baru.unit_kerja =
            data.jabatan_baru.unit_kerja.nama

          this.getKepala(data.jabatan_lama.jabatan.skpd.id)
          this.getTemplateSurat(data.jenis_jafung.id)
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },
    getKepala(id) {
      this.loading = true
      this.$axios
        .$get(`/sotk/skpd/${id}`)
        .then(({ data }) => {
          this.formData.skpd.kepala = `${data.jabatan_kepala.nama} ${data.jabatan_kepala.spesifikasi}`
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },
    getTemplateSurat(id) {
      this.loading = true
      this.$axios
        .$get(`/template/surat/pengajuan/${id}`)
        .then(({ data }) => {
          this.templateSurat.kop_depan = data.kop_depan
          this.templateSurat.kop_belakang = data.kop_belakang
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },
    getBupati() {
      this.loading = true
      this.$axios
        .$get(`/bupati`)
        .then(({ data }) => {
          this.templateSurat.bupati = data.nama_lengkap
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
