<template>
  <section>
    <div class="container">
      <b-field>
        <p class="control">
          <b-select v-model="perPage">
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
    <b-table
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :loading="loading"
      :data="isEmpty ? [] : data"
      :total="total"
      :per-page="perPage"
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
      @page-change="onPageChange"
      @sort="onSort"
    >
      <b-table-column v-slot="props" label="#No">
        {{ data.indexOf(props.row) + 1 }}
      </b-table-column>

      <b-table-column v-slot="props" field="nama" label="Nama Pegawai" sortable>
        <h6 class="title is-6">{{ props.row.pegawai.nama_lengkap }}</h6>
        <h6 class="subtitle is-6">{{ props.row.pegawai.nip }}</h6>
      </b-table-column>
      <b-table-column v-slot="props" field="jabatan" label="Jabatan" sortable>
        {{ props.row.jabatan.nama }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="unit_kerja"
        label="Unit Kerja"
        sortable
      >
        <h6 class="subtitle is-6">
          {{ props.row.jabatan.unit_kerja.nama_lengkap }}
        </h6>
        <h6 class="title is-6">
          {{ props.row.jabatan.skpd.singkatan }}
        </h6>
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
    </b-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      search: '',
      sortField: 'nama',
      sortOrder: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      isNarrowed: true,
      isStriped: true,
      isEmpty: true,
      hasMobileCards: true,
      defaultSortOrder: 'asc',
      page: 1,
      perPage: 10,
    }
  },
  mounted() {
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
      this.$axios
        .get(`/pegawai/jenis/q?${params}`)
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
  },
}
</script>
