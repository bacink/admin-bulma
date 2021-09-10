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

            <b-field label="Surat Keputusan" label-position="on-border">
              <b-input placeholder="Nomor SK"></b-input>
            </b-field>

            <b-field grouped>
              <b-field label="Tanggal" label-position="on-border">
                <b-input placeholder="Tanggal SK"></b-input
              ></b-field>
              <b-field label="TMT" label-position="on-border">
                <b-input placeholder="TMT SK"></b-input>
              </b-field>
            </b-field>

            <b-field label="Surat Pengantar" label-position="on-border">
              <b-input
                v-model="suratPengantar"
                type="textarea"
                maxlength="300"
              ></b-input>
            </b-field>
          </div>
        </b-card>
      </div>
      <div class="column">
        <b-card title="Draft">
          <div class="has-text-centered">
            <h3 class="is-family-monospace has-text-weight-bold">
              Keputusan Bupati Karawang
            </h3>
            <h4 class="has-text-weight-semibold">
              NOMOR : 230 / Kep. / BKPSDM / 2020
            </h4>
          </div>
          <table class="table is-bordered is-narrow">
            <tr>
              <td>Menimbang</td>
              <td>:</td>
              <td>a.</td>
              <td>
                bahwa menindaklanjuti Surat Menteri Dalam Negeri Nomor
                821.29/1993/IJ tanggal 10 September 2020 Perihal Rekomendasi
                pengangkatan Dalam Jabatan PPUPD Kabupaten Karawang, dipandang
                perlu mengangkat serta menempatkan yang bersangkutan pada
                Inspektorat Kabupaten Karawang;
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>b.</td>
              <td>
                bahwa dalam pasal 64, Pasal 94 dan Pasal 144 Peraturan
                Pemerintah Nomor 11 Tahun 2017 tantang Menajemen Pegawai Negeri
                Sipil antara lain dinyatakan bahwa Pegawai Negeri Sipil dapat
                diberhentikan dari Jabatan Administrasi/Fungsional/Jabatan
                Pimpinan Tinggi, apabila ditugaskan secara penuh diluar jabatan
                yang diampunya;
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>c.</td>
              <td>
                bahwa untuk maksud tersebut, perlu ditetapkan dengan Keputusan
                Bupati Karawang;
              </td>
            </tr>
            <tr>
              <td>Mengingat</td>
              <td>:</td>
              <td>1.</td>
              <td>Undang-Undang Nomor 5 Tahun 2014;</td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>2.</td>
              <td>
                Undang-Undang Nomor 23 Tahun 2014 jo. Undang-Undang Nomor 9
                Tahun 2015;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>3.</td>
              <td>Peraturan Pemerintah Nomor 18 Tahun 2016;</td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>4.</td>
              <td>
                Peraturan Pemerintah Nomor 11 Tahun 2017 jo. Peraturan
                Pemerintah Nomor 17 Tahun 2020;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>5.</td>
              <td>Peraturan Presiden Nomor 4 Tahun 2012;</td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>6.</td>
              <td>
                Keputusan Presiden Nomor 87 Tahun 1999 jo. Peraturan Presiden
                Nomor 116 Tahun 2014;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>7.</td>
              <td>
                Peraturan Menteri Negara Pendayagunaan Aparatur Negara Nomor 15
                Tahun 2009 Tanggal 25 September 2009;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>8.</td>
              <td>
                Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi
                Birokrasi Nomor 42 Tahun 2018;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>9.</td>
              <td>
                Peraturan Bersama Menteri Dalam Negeri dan Kepala Badan
                Kepegawaian Negara Nomor 22 Tahun 2010 dan Nomor 03 Tahun 2010.
              </td>
            </tr>
            <tr>
              <td>Memperhatikan</td>
              <td>:</td>
              <td>1.</td>
              <td>
                Surat Inspektur Kabupaten Karawang Nomor 800/125/Inspt tanggal
                17 Maret 2021 Perihal Usulan Jabfung PPUPD pada Inspektorat
                Kabupaten Karawang;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>2.</td>
              <td>
                Surat Menteri Dalam Negeri Nomor 821.29/1993/IJ tanggal 10
                September 2020 Perihal Rekomendasi pengangkatan Dalam Jabatan
                PPUPD Kabupaten Karawang;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>3.</td>
              <td>
                Sertifikat Kompetensi dari Lembaga Sertifikasi Penyelenggara
                Pemerintahan dalam Negeri No.REG.32/00299/700/2/8.2020 a.n Utin
                Nuraeni, SH yang mana dinyatakan Kompeten sebagai Pengawas
                Pemerintahan Muda tanggal 29 Agustus 2020;
              </td>
            </tr>
            <tr>
              <td></td>
              <td>:</td>
              <td>4.</td>
              <td>
                Pernyataan Pengunduran diri dari Jabatan Pengawas (Eselon IV.a)
                a.n Utin Nuraeni, SH pada tanggal 23 Maret 2021. .
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
  },
  data() {
    return {
      isloading: true,
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
}
</script>
