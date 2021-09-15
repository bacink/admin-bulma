<template>
  <section>
    <div class="container">
      <b-field>
        <p class="control">
          <b-select v-model="perPage" :disabled="!isPaginated">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </b-select>
        </p>
        <b-input
          v-model="search"
          placeholder="Search..."
          type="search"
          icon="magnify"
          icon-clickable
          expanded
          @input="onSearch"
        ></b-input>
      </b-field>
    </div>
    <hr />
    <b-table
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :current-page.sync="page"
      :paginated="isPaginated"
      :loading="loading"
      :data="isEmpty ? [] : data"
      :total="total"
      :per-page="perPage"
      :opened-detailed="defaultOpenedDetails"
      :detail-transition="useTransition"
      :show-detail-icon="showDetailIcon"
      :default-sort="[sortField, sortOrder]"
      :default-sort-direction="defaultSortOrder"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      :narrowed="isNarrowed"
      :striped="isStriped"
      :mobile-cards="hasMobileCards"
      backend-pagination
      backend-sorting
      detailed
      detail-key="id"
      @page-change="onPageChange"
      @details-open="
        (row) =>
          $buefy.toast.open(`Detail Pegawai: ${row.pegawai.nama_lengkap}`)
      "
      @sort="onSort"
    >
      <b-table-column v-slot="props" field="nip" label="NIP" sortable>
        {{ props.row.pegawai.nip }}
      </b-table-column>
      <b-table-column v-slot="props" field="nama" label="Nama" sortable>
        {{ props.row.pegawai.nama_lengkap }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="jabatan_lama"
        label="Jabatan"
        sortable
      >
        {{ props.row.jabatan_lama.jabatan.nama }}
        <b-taglist>
          <b-tag type="is-info is-light">
            <strong>Unit Kerja: </strong
            >{{ props.row.jabatan_lama.jabatan.unit_kerja.nama_lengkap }}
          </b-tag>
          <b-tag type="is-success is-light">
            <strong>SKPD: </strong
            >{{ props.row.jabatan_lama.jabatan.skpd.nama }}
          </b-tag>
        </b-taglist>
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="jabatan_baru"
        label="Jabatan Yang dilamar"
        sortable
      >
        {{ props.row.jabatan_baru.nama_lengkap }}
        <b-taglist>
          <b-tag type="is-info is-light">
            <strong>Unit Kerja: </strong>
            {{ props.row.jabatan_baru.unit_kerja.nama }}
          </b-tag>
          <b-tag type="is-success is-light">
            <strong>SKPD: </strong>
            {{ props.row.jabatan_baru.skpd.nama }}
          </b-tag>
        </b-taglist>
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="status"
        label="Status Pengajuan"
        sortable
        centered
      >
        <div v-if="props.row.status === 'diajukan'">
          <span class="tag is-warning is-light">
            Menunggu verifikasi skpd
          </span>
        </div>
        <div v-else>
          <span class="tag is-info is-light">
            {{ props.row.status }}
          </span>
        </div>
      </b-table-column>

      <b-table-column field="opsi" label="opsi" sortable centered>
        <template v-slot:header="">
          <b-icon icon="cogs"></b-icon>
        </template>
        <template v-slot="props">
          <div v-if="isSkpd">
            <div v-if="props.row.status === 'diverifikasi_skpd'">
              <div v-if="props.row.surat_pengantar !== null">
                <b-button
                  class="is-small is-warning"
                  icon-left="send"
                  @click="kirmVerifikator(props.row.id)"
                >
                  Kirim Ke Verifikator
                </b-button>
              </div>
              <div v-else>
                <b-button
                  class="is-small is-primary"
                  icon-left="upload"
                  @click="cardModal(props.row.id)"
                >
                  Upload Surat Pengantar
                </b-button>
              </div>
            </div>
            <div v-else-if="props.row.status === 'diajukan'">
              <b-button
                tag="router-link"
                :to="`/pengajuan/verifikasi/${props.row.id}`"
                type="is-info"
              >
                Verifikasi
              </b-button>
            </div>
          </div>
          <div v-if="isAnalis || isBkpsdm">
            <div v-if="props.row.status === 'dikirim_skpd'">
              <b-button
                icon-left="alert-circle-outline"
                type="is-warning"
                size="is-small"
                tag="router-link"
                :to="`/pengajuan/verifikasi/${props.row.id}`"
              >
                Verifikasi
              </b-button>
            </div>
            <div v-if="props.row.status === 'diverifikasi_analis'">
              <b-button
                icon-left="file"
                type="is-info"
                size="is-small"
                tag="router-link"
                :to="`/draft/${props.row.id}`"
              >
                Buat Draft
              </b-button>
            </div>
          </div>
        </template>
      </b-table-column>
      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
      <template #detail="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <strong> Detail Pegawai </strong>
              <ul>
                <li>Pangkat: {{ props.row.golongan.referensi.pangkat }}</li>
                <li>Golongan: {{ props.row.golongan.referensi.golongan }}</li>
              </ul>
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </section>
</template>
<script>
import ModalForm from '@/components/Modal/FormUploadSuratPengantar.vue'

export default {
  filters: {
    /**
     * Filter to truncate string, accepts a length parameter
     */
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + '...' : value
    },
  },
  data() {
    return {
      data: [],
      search: '',
      total: 0,
      loading: false,
      sortField: 'id',
      sortOrder: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      isNarrowed: true,
      isStriped: true,
      isEmpty: true,
      hasMobileCards: true,
      defaultSortOrder: 'desc',
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: 'fade',
      page: 1,
      perPage: 20,
      isPegawai: false,
      isSkpd: false,
      isBkpsdm: false,
      isAnalis: false,
      isPengawas: false,
      isAdmin1: false,
      isAdmin2: false,
      isJpt: false,
      isPaginated: true,
      param: null,
    }
  },
  mounted() {
    const CurrentRole = this.$auth.user.role.nama.toLowerCase()
    switch (CurrentRole) {
      case 'admin skpd':
        this.isSkpd = true
        break
      case 'admin bkpsdm':
        this.isBkpsdm = true
        break
      case 'analis jabatan':
        this.isAnalis = true
        break
      case 'pengawas':
        this.isPengawas = true
        break
      case 'administrator 1':
        this.isAdmin1 = true
        break
      case 'administrator 2':
        this.isAdmin2 = true
        break
      case 'jpt':
        this.isJpt = true
        break
      default:
        this.isPegawai = true
        break
    }
    this.loadAsyncData()
  },
  methods: {
    /*
     * Load async data
     */

    loadAsyncData() {
      const params = [
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.perPage}`,
      ].join('&')

      this.loading = true

      this.$axios
        .get(`/pengajuan/q?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.data = []
          let currentTotal = data.meta.total
          if (data.meta.total / this.perPage > 1000) {
            currentTotal = this.perPage * 1000
          }
          this.total = currentTotal
          data.data.forEach((item) => {
            this.data.push(item)
          })
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
          this.loading = false
        })
        .catch((error) => {
          this.data = []
          this.total = 0
          this.loading = false
          this.isEmpty = true
          throw error
        })
    },
    cardModal(x) {
      this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          idPengajuan: x,
        },
      })
    },
    /*
     * Handle page-change event
     */
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadAsyncData()
    },
    onSearch(value) {
      this.search = value
      this.loadAsyncData()
    },
    pagination(value) {
      this.perPage = value
      this.loadAsyncData()
    },
    kirmVerifikator(value) {
      this.isLoading = true
      this.$axios
        .patch('/pengajuan/update/status', {
          id_pengajuan: value,
          status: 'dikirim_skpd',
        })
        .then((resp) => {
          if (resp.data.success) {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'success',
              queue: false,
            })
            this.isLoading = false
            this.$parent.close()
          }
        })
        .catch((err) => {
          this.isLoading = false

          this.$buefy.toast.open({
            message: `Error: ${err.response.data.message}`,
            type: 'is-danger',
            queue: false,
          })
        })
    },
  },
}
</script>
