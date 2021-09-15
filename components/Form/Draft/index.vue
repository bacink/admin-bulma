<template>
  <section>
    <div class="columns is-desktop">
      <div class="column is-one-third">
        <b-card title="Profile Pegawai">
          <div v-if="dataPengajuan">
            <b-field label="Nama" label-position="on-border">
              <b-input v-model="dataPengajuan.pegawai.nama_lengkap"></b-input>
            </b-field>
            <b-field label="Nip" label-position="on-border">
              <b-input v-model="dataPengajuan.pegawai.nip"></b-input>
            </b-field>

            <b-field grouped>
              <b-field label="Pangkat" label-position="on-border">
                <b-input
                  v-model="dataPengajuan.golongan.referensi.pangkat"
                ></b-input>
              </b-field>
              <b-field label="Golongan" label-position="on-border">
                <b-input
                  v-model="dataPengajuan.golongan.referensi.golongan"
                ></b-input>
              </b-field>
            </b-field>

            <b-field grouped>
              <b-field label="Tempat Lahir" label-position="on-border">
                <b-input v-model="dataPengajuan.pegawai.tempat_lahir"></b-input>
              </b-field>
              <b-field label="Tanggal Lahir" label-position="on-border">
                <b-input
                  v-model="dataPengajuan.pegawai.tanggal_lahir"
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="Pendidikan" label-position="on-border">
              <b-input
                :value="`${dataPengajuan.pegawai.pendidikan.tingkat.nama} (${dataPengajuan.pegawai.pendidikan.tingkat.singkatan})`"
              ></b-input>
            </b-field>
            <b-field label="jurusan" label-position="on-border">
              <b-input
                v-model="dataPengajuan.pegawai.pendidikan.jurusan"
                type="textarea"
                maxlength="300"
              ></b-input>
            </b-field>
          </div>
        </b-card>
        <b-card title="Karir Lama">
          <div v-if="dataPengajuan">
            <b-field label-position="on-border" label="Jabatan">
              <b-input
                v-model="dataPengajuan.jabatan_lama.jabatan.nama"
              ></b-input>
            </b-field>
            <b-field label-position="on-border" label="Skpd">
              <b-input
                v-model="dataPengajuan.jabatan_lama.jabatan.unit_kerja.nama"
              ></b-input>
            </b-field>
            <b-field label-position="on-border" label="Skpd">
              <b-input
                v-model="dataPengajuan.jabatan_lama.jabatan.skpd.nama"
                type="textarea"
                maxlength="300"
              ></b-input>
            </b-field>
          </div>
        </b-card>
        <b-card title="Karir Baru">
          <div v-if="dataPengajuan">
            <b-field label-position="on-border" label="Jenis Jafung">
              <b-input
                v-model="dataPengajuan.jenis_jafung.nama"
                type="textarea"
                maxlength="300"
              ></b-input>
            </b-field>

            <b-field label="Jabatan" label-position="on-border" expanded>
              <b-input
                v-model="dataPengajuan.jabatan_baru.nama_lengkap"
              ></b-input>
            </b-field>

            <b-field label-position="on-border" label="Unit Kerja">
              <b-input
                v-model="dataPengajuan.jabatan_baru.unit_kerja.nama"
              ></b-input>
            </b-field>

            <b-field label-position="on-border" label="Skpd">
              <b-input v-model="dataPengajuan.jabatan_baru.skpd.nama"></b-input>
            </b-field>
          </div>
        </b-card>
      </div>
      <div class="column">
        <b-card title="Form Draft">
          <b-field grouped>
            <b-field
              label="Angka Kredit / Kelas Jabatan"
              label-position="on-border"
            >
              <b-input></b-input>
            </b-field>

            <b-field label="Tunjangan" label-position="on-border" expanded>
              <b-input></b-input>
            </b-field>
          </b-field>

          <b-field grouped label="Surat Keputusan">
            <b-field label="Nomor Depan" label-position="on-border">
              <b-input
                placeholder="Nomor Depan"
                :value="templateSurat.kop_depan"
              ></b-input>
            </b-field>
            <b-field label="Nomor" label-position="on-border">
              <b-input placeholder="Nomor"></b-input>
            </b-field>
            <b-field label="Nomor Belakang" label-position="on-border">
              <b-input
                placeholder="Nomor Belakang"
                :value="templateSurat.kop_depan"
              ></b-input>
            </b-field>
          </b-field>

          <b-field grouped>
            <b-field label="Tanggal" label-position="on-border">
              <b-input placeholder="Tanggal SK"></b-input
            ></b-field>
            <b-field label="TMT" label-position="on-border">
              <b-input placeholder="TMT SK"></b-input>
            </b-field>
          </b-field>

          <b-field label="Perihal" label-position="on-border">
            <b-input v-model="perihal" maxlength="300"></b-input>
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
            <b-input v-model="newMemperhatikan" maxlength="300"></b-input>
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

            <div v-if="templateSurat.jenis_jafung">
              <h3 class="is-family-monospace has-text-weight-bold">
                {{ templateSurat.jenis_jafung.nama }}
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
        </b-card>
      </div>
    </div>

    <hr />

    <b-field horizontal
      ><!-- Label left empty for spacing -->
      <p class="control">
        <b-button label="Send message" type="is-primary" />
      </p>
    </b-field>
  </section>
</template>
<script>
export default {
  props: {
    dataPengajuan: {
      type: [Array, Object],
      default: null,
    },
    pengantarKepala: {
      type: String,
      default: null,
    },
    templateSurat: {
      type: [Array, Object],
      default() {
        return []
      },
    },
  },
  data() {
    return {
      isloading: true,
      perihal: '',
      newMemperhatikan: '',
      newMenimbangId: 0,
      newMenimbang: '',
      newMemperhatikanId: 0,
      menimbang: [],
      memperhatikan: [],
    }
  },
  computed: {
    suratPengantar() {
      let judul = ''
      let nomor = ''
      if (!this.pengantarKepala) {
        judul = ''
      } else {
        judul = `Surat ${this.pengantarKepala} Kabupaten Karawang `
      }

      if (!this.dataPengajuan) {
        nomor = ''
      } else {
        nomor = `Nomor ${this.dataPengajuan.surat_pengantar.nomor} Tanggal ${this.dataPengajuan.surat_pengantar.tanggal_indo}`
      }
      return judul + nomor
    },
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
  },
}
</script>
