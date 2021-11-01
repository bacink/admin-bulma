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
      :sticky-header="stickyHeader"
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
        (row) => $buefy.toast.open(`Detail Pegawai: ${row.pegawai.nama}`)
      "
      @sort="onSort"
    >
      <b-table-column v-slot="props" field="nama" label="Nama" sortable>
        {{ props.row.pegawai.nama }}
      </b-table-column>
      <b-table-column v-slot="props" field="nip" label="Nomor SK" sortable>
        {{ props.row.tanggal_sk_indo }}
      </b-table-column>
      <b-table-column v-slot="props" field="nip" label="Nomor SK" sortable>
        {{ props.row.tmt_indo }}
      </b-table-column>
      <b-table-column field="opsi" label="opsi" sortable centered>
        <template v-slot:header="">
          <b-icon icon="cogs"></b-icon>
        </template>
        <template v-slot="props">
          <b-field>
            <p class="control">
              <b-button
                tag="router-link"
                :to="`/tracking/${props.row.id_pengajuan}`"
                type="is-dark"
                size="is-small"
                icon-left="eye"
              >
                Tracking
              </b-button>
            </p>
            <p class="control">
              <b-button
                type="is-info"
                label="Cetak Sk"
                icon-left="printer"
                tag="a"
                size="is-small"
                target="_blank"
                :href="`${$axios.defaults.baseURL}/print-sk/${props.row.id_pengajuan}`"
              ></b-button>
            </p>
          </b-field>
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
                <li>Pangkat/Gol: {{ props.row.pegawai.pangkat_gol }}</li>
              </ul>
            </div>
          </div>
        </article>
      </template>
    </b-table>
    <b-loading
      v-model="isLoading"
      :is-full-page="isFullPage"
      :can-cancel="true"
    ></b-loading>
  </section>
</template>
<script>
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
      stickyHeader: true,
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
      isFullPage: true,
      isLoading: false,
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
    loadAsyncData() {
      const params = [
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.perPage}`,
      ].join('&')

      this.loading = true
      this.isLoading = true

      this.$axios
        .get(`/surat/keputusan/q?${params}`)
        .then(({ data }) => {
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
          this.isLoading = false
        })
        .catch((error) => {
          this.data = []
          this.total = 0
          this.loading = false
          this.isLoading = false

          this.isEmpty = true
          throw error
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
  },
}
</script>
