<template>
  <section>
    <form name="formData" @submit.prevent="simpan">
      <template v-if="!loading">
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
                <span class="button is-static">{{ formData.nomor }}</span>
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
              {{ formData.tentang.toUpperCase() }} <br />
              BUPATI KARAWANG,
            </strong>
          </p>
        </center>
      </template>
      <template v-else>
        <b-skeleton size="is-large" :active="loading"></b-skeleton>

        <b-skeleton size="is-large" :active="loading"></b-skeleton>
        <b-skeleton size="is-large" :active="loading"></b-skeleton>
        <b-skeleton size="is-large" :active="loading"></b-skeleton>
        <b-skeleton size="is-large" :active="loading"></b-skeleton>
        <b-skeleton size="is-large" :active="loading"></b-skeleton>
      </template>

      <template v-if="!loading">
        <table width="100%" class="table">
          <tr>
            <td width="15">Menimbang</td>
            <td width="2%">:</td>
            <td width="2%" align="center">a.</td>
            <td colspan="3">
              <b-input v-model="formData.menimbang.a" type="textarea"></b-input>
            </td>
          </tr>
          <tr>
            <td></td>
            <td width="2%" align="center">:</td>
            <td width="2%" align="center">b.</td>
            <td colspan="3">
              <b-input v-model="formData.menimbang.b" type="textarea"></b-input>
            </td>
          </tr>
          <tr
            v-for="(item, index) in formData.mengingat"
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
          <tr
            v-for="(item, index) in formData.memperhatikan"
            :key="index + 'b'"
            has-background-info
          >
            <template v-if="index === 0">
              <td>Memperhatikan</td>
              <td width="2%" align="center">:</td>
              <td width="2%" align="center">{{ item.nomor }}</td>
              <td colspan="3">
                <b-input
                  :value="item.text"
                  type="textarea"
                  @input="gantiMemperhatikan(index, $event)"
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
                  type="textarea"
                  @input="gantiMemperhatikan(index, $event)"
                ></b-input>
              </td>
            </template>
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
              <b-input v-model="formData.kesatu.a"></b-input>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center">1.</td>
            <td>Nama</td>
            <td width="2%" align="center">:</td>
            <td><b-input v-model="formData.pegawai.nama"></b-input></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center">2.</td>
            <td>Nip</td>
            <td width="2%" align="center">:</td>
            <td><b-input v-model="formData.pegawai.nip"></b-input></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center">3.</td>
            <td>Tempat,Tanggal Lahir</td>
            <td width="2%" align="center">:</td>
            <td>
              <b-input v-model="formData.pegawai.ttl"></b-input>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center">4.</td>
            <td>Pangkat, Gol.Ruang</td>
            <td width="2%" align="center">:</td>
            <td>
              <b-input v-model="formData.pegawai.pangkat_gol"></b-input>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center">5.</td>
            <td>Pendidikan Formal</td>
            <td width="2%" align="center">:</td>
            <td><b-input v-model="formData.pegawai.pendidikan"></b-input></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center">6.</td>
            <td>Jabatan Lama</td>
            <td width="2%" align="center">:</td>
            <td><b-input v-model="formData.pegawai.jabatan_lama"></b-input></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center">7.</td>
            <td>Unit Kerja</td>
            <td width="2%" align="center">:</td>
            <td><b-input v-model="formData.pegawai.unit_kerja"></b-input></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td colspan="4">
              <b-input v-model="formData.kesatu.b" type="textarea"></b-input>
            </td>
          </tr>
          <tr>
            <td>KEDUA</td>
            <td width="2%" align="center">:</td>
            <td colspan="4">
              {{ formData.kedua }}
            </td>
          </tr>
          <tr>
            <td>KETIGA</td>
            <td width="2%" align="center">:</td>
            <td colspan="4">
              Apabila dikemudian hari terdapat kekeliruan dalam keputusan ini,
              akan diadakan perbaikan dan perhitungan kembali sebagaimana
              mestinya. Asli Keputusan ini disampaikan kepada Pegawai Negeri
              Sipil yang bersangkutan untuk diketahui dan diindahkan sebagaimana
              mestinya.
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td colspan="4">
              <b>Asli</b> Keputusan ini disampaikan kepada Pegawai Negeri Sipil
              yang bersangkutan untuk diketahui dan diindahkan sebagaimana
              mestinya.
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
                KEPALA BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA
                KABUPATEN KARAWANG,
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
                  v-for="(itm, index) in formData.tembusan"
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
                  <b-input v-model="formData.penandatangan.nama"></b-input>
                  <br />
                  <b-input v-model="formData.penandatangan.pangkat"></b-input>
                  <br />
                  <b-input v-model="formData.penandatangan.nip"></b-input>
                </p>
              </center>
            </td>
          </tr>
        </table>
      </template>
      <template v-if="!loading">
        <b-button native-type="submit">simpan</b-button>
      </template>
      <template v-else>
        <b-skeleton :active="loading"></b-skeleton>
      </template>
    </form>
  </section>
</template>
<script>
export default {
  props: {
    kopDepan: {
      type: String,
      default: null,
    },
    kopBelakang: {
      type: String,
      default: null,
    },
    penandatangan: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
    mengingat: {
      type: [Array],
      default() {
        return []
      },
    },
    pengajuan: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
    kepalaSkpd: {
      type: String,
      default: null,
    },
    suratPengantar: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      loading: true,
      nomor: 0,
      nomorMemperhatikan: 0,
      formData: {
        status: 'draft_analis_jabatan',
        id_pengajuan: null,
        kode: null,
        nomor: 'DRAFT',
        kop_depan: this.kopDepan,
        kop_belakang: this.kopBelakang,
        tentang: 'JABATAN FUNGSIONAL',
        pegawai: {
          nama: null,
          nip: null,
          ttl: null,
          pangkat_gol: null,
          pendidikan: null,
          jabatan_lama: null,
          unit_kerja: null,
        },
        menimbang: {
          a: null,
          b: null,
        },
        mengingat: this.mengingat,
        memperhatikan: [],
        penandatangan: {
          nama: 'bupati',
          nip: '000',
          pangkat: 'bupati',
        },
        kesatu: {
          a: 'Terhitung mulai tanggal TANGGAL Pegawai Negeri Sipil :',
          b: 'dari jabatan fungsional JABATAN LAMA ke dalam jabatan fungsional JABATAN BARU dengan angka kredit 000,000 (kosong kosong kosong koma kosong kosong kosong).',
        },
        kedua: null,
        tembusan: [
          { nomor: 1, text: 'Kepala Kantor Regional III BKN;' },
          { nomor: 2, text: 'Inspektur Kab. Karawang;' },
          { nomor: 3, text: 'Kepala BPKAD Kab. Karawang;' },
        ],
      },
    }
  },
  watch: {
    kopDepan(newValue) {
      this.formData.kop_depan = newValue
    },
    kopBelakang(newValue) {
      this.formData.kop_belakang = newValue
    },
    'penandatangan.nama'(newValue) {
      this.formData.penandatangan.nama = newValue
    },
    'penandatangan.nip'(newValue) {
      this.formData.penandatangan.nip = newValue
    },
    'penandatangan.pangkat'(newValue) {
      this.formData.penandatangan.pangkat = newValue
    },
  },
  mounted() {
    this.formData.menimbang.a = `bahwa sebagai pelaksanaan dari Peraturan Menteri Negara pendayagunaan Aparatur Negara dan Reformasi Birokrasi Republik Indonesia Nomor 25 Tahun 2014 dan Peraturan Bersama Menteri Kesehatan dan Kepala Badan Kepegawaian Negara Nomor 5 Tahun 2015, perlu untuk mengangkat Pegawai Negeri Sipil a.n ${this.pengajuan.pegawai.nama_lengkap} NIP. ${this.pengajuan.pegawai.nip} dalam jabatan fungsional ${this.pengajuan.jabatan_baru.nama_lengkap}`
    this.formData.menimbang.b = `bahwa untuk maksud tersebut pada huruf a, perlu ditetapkan dengan Keputusan Bupati Karawang.`

    this.nomor = this.formData.tembusan.length + 1
    this.nomorMemperhatikan = this.formData.memperhatikan.length
    this.formData.kedua =
      'Kepada pemegang jabatan sebagaimana dimaksud diktum KESATU diberikan tunjangan Fungsional sebesar Rp. TUNJANGAN/bulan;'
    this.formData.tembusan.push(
      {
        nomor: this.nomor,
        text: this.kepalaSkpd + 'Kab. Karawang;',
      },
      {
        nomor: this.nomor,
        text: 'Pejabat penilai angka kredit.',
      }
    )
    this.formData.memperhatikan.push(
      {
        nomor: (this.nomorMemperhatikan += 1),
        text: `Surat ${this.kepalaSkpd} Kabupaten Karawang Nomor ${this.suratPengantar.nomor} tanggal ${this.suratPengantar.tanggal_indo} perihal Usulan Kenaikan Jabatan Fungsional ${this.pengajuan.jabatan_baru.nama}.`,
      },
      {
        nomor: (this.nomorMemperhatikan += 1),
        text: `Sertifikat Kompetensi Nomor SILAHKAN ISI  a.n ${this.pengajuan.pegawai.nama_lengkap} tanggal SILAHKAN ISI dengan kualifikasi/kompetensi Jenjang ${this.pengajuan.jabatan_baru.nama_lengkap}`,
      }
    )

    if (this.pengajuan) {
      this.formData.tentang = `${this.pengajuan.jenis_jafung.nama} dalam jabatan fungsional ${this.pengajuan.jabatan_baru.nama}`
      this.formData.menimbang.a = `bahwa sebagai pelaksanaan dari Peraturan Menteri Negara pendayagunaan Aparatur Negara dan Reformasi Birokrasi Republik Indonesia Nomor 25 Tahun 2014 dan Peraturan Bersama Menteri Kesehatan dan Kepala Badan Kepegawaian Negara Nomor 5 Tahun 2015, perlu untuk mengangkat Pegawai Negeri Sipil a.n ${this.pengajuan.pegawai.nama_lengkap} NIP. ${this.pengajuan.pegawai.nip} dalam jabatan fungsional ${this.pengajuan.jabatan_baru.nama_lengkap}`
      this.formData.menimbang.b = `bahwa untuk maksud tersebut pada huruf a, perlu ditetapkan dengan Keputusan Bupati Karawang.`
      this.formData.mengingat = this.mengingat
      this.formData.kode = this.pengajuan.jenis_jafung.kode
      this.formData.id_pengajuan = this.pengajuan.id

      this.formData.pegawai.nama = this.pengajuan.pegawai.nama_lengkap
      this.formData.pegawai.nip = this.pengajuan.pegawai.nip
      this.formData.pegawai.ttl = `${this.pengajuan.pegawai.tempat_lahir}, ${this.pengajuan.pegawai.tanggal_lahir}`
      this.formData.pegawai.pangkat_gol = `${this.pengajuan.golongan.referensi.pangkat}, ${this.pengajuan.golongan.referensi.golongan}`
      this.formData.pegawai.pendidikan = `${this.pengajuan.pegawai.pendidikan.tingkat.singkatan}, ${this.pengajuan.pegawai.pendidikan.jurusan}`
      this.formData.pegawai.jabatan_lama =
        this.pengajuan.jabatan_lama.jabatan.nama
      this.formData.pegawai.unit_kerja =
        this.pengajuan.jabatan_lama.jabatan.unit_kerja.nama
    }
  },
  created() {
    setInterval(() => {
      this.loading = false
    }, 3 * 1000)
  },
  methods: {
    simpan() {
      this.loading = true

      this.$axios
        .$post('/draft', this.formData)
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
    gantiMengingat(index, newValue) {
      this.mengingat.filter(function (item, arrayIndex) {
        if (arrayIndex === index) {
          item.text = newValue
        }
      })
    },
    gantiMemperhatikan(index, newValue) {
      this.mengingat.filter(function (item, arrayIndex) {
        if (arrayIndex === index) {
          item.text = newValue
        }
      })
    },
    gantiTembusan(index, newValue) {
      this.formData.tembusan.filter(function (itm, arrayIndex) {
        if (arrayIndex === index) {
          itm.text = newValue
        }
      })
    },
  },
}
</script>
