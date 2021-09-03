<template>
  <section>
    <b-table
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
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
      paginated
      backend-pagination
      backend-sorting
      detailed
      detail-key="id"
      @page-change="onPageChange"
      @details-open="(row) => $buefy.toast.open(`Detail Users`)"
      @sort="onSort"
    >
      <b-table-column v-slot="props" field="nip" label="NIP" sortable>
        <template v-if="props.row.pegawai">
          {{ props.row.pegawai.nip }}
        </template>
        <template v-else> - </template>
      </b-table-column>
      <b-table-column v-slot="props" field="nama" label="Nama" sortable>
        <template v-if="props.row.pegawai">
          {{ props.row.pegawai.nama_lengkap }}
        </template>
        <template v-else>
          {{ props.row.name }}
        </template>
      </b-table-column>
      <b-table-column v-slot="props" field="role" label="Role" sortable>
        <div v-if="props.row.role">
          <b-tag type="is-info">{{ props.row.role.nama }}</b-tag>
        </div>
      </b-table-column>
      <b-table-column field="opsi" label="opsi" sortable centered>
        <template v-slot:header="">
          <b-icon icon="cogs"></b-icon>
        </template>
        <template v-slot="props">
          <b-button
            tag="router-link"
            :to="`/users/${props.row.id}`"
            type="is-link"
          >
            Edit
          </b-button>
        </template>
      </b-table-column>
      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
      <template #detail="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div v-if="props.row.pegawai">
                <strong> Jabatan Pegawai </strong>
                <ul
                  v-for="(item, index) in props.row.pegawai.jabatan_aktif"
                  :key="index"
                >
                  <li>
                    <b-tag type="is-primary">{{ item.jabatan.jenis }}</b-tag
                    ><br />
                    {{ item.jabatan.nama }}
                  </li>
                </ul>
              </div>
              <dir v-else>
                <div class="has-text-centered">
                  <b-tag type="is-danger"> User Doesn't have details </b-tag>
                </div>
              </dir>
            </div>
          </div>
        </article>
      </template>
    </b-table>
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
      total: 0,
      loading: false,
      sortField: 'id_pegawai',
      sortOrder: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      isNarrowed: true,
      isStriped: true,
      isEmpty: true,
      hasMobileCards: true,
      defaultSortOrder: 'desc',
      defaultOpenedDetails: [],
      showDetailIcon: true,
      useTransition: 'fade',
      page: 1,
      perPage: 20,
    }
  },

  mounted() {
    this.loadAsyncData()
  },
  methods: {
    /*
     * Load async data
     */
    loadAsyncData() {
      this.loading = true
      this.$axios
        .get(`/user`)
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
    /*
     * Type style in relation to the value
     */
    type(value) {
      const number = parseFloat(value)
      if (number < 6) {
        return 'is-danger'
      } else if (number >= 6 && number < 8) {
        return 'is-warning'
      } else if (number >= 8) {
        return 'is-success'
      }
    },
  },
}
</script>
