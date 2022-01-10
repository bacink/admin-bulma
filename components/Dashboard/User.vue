<template>
  <section class="section">
    <tiles>
      <WidgetJumlahPengajuan status="diajukan" type="is-info" />
      <WidgetJumlahPengajuan status="diverifikasi_skpd" type="is-info" />
      <WidgetJumlahPengajuan status="diverifikasi_analis" type="is-info" />
      <WidgetJumlahPengajuan status="paraf_administrator_1" type="is-info" />
      <WidgetJumlahPengajuan status="paraf_administrator_2" type="is-info" />
      <WidgetJumlahPengajuan status="cetak_sk" type="is-info" />
    </tiles>
    <tiles>
      <WidgetJumlahPengajuan status="ditolak_skpd" type="is-danger" />
      <WidgetJumlahPengajuan status="ditolak_analis" type="is-danger" />
      <WidgetJumlahPengajuan
        status="ditolak_administrator_1"
        type="is-danger"
      />
      <WidgetJumlahPengajuan
        status="ditolak_administrator_2"
        type="is-danger"
      />
    </tiles>
  </section>
</template>
<script>
import WidgetJumlahPengajuan from '@/components/Widget/JumlahPengajuanPegawai'
import Tiles from '@/components/Tiles'

export default {
  components: { WidgetJumlahPengajuan, Tiles },

  setup() {},
}
</script>
