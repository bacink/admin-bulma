<template>
  <section>
    <b-field grouped>
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
    </b-field>
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

      <b-table-column
        v-slot="props"
        field="nama"
        label="Syarat Pengajuan"
        sortable
      >
        {{ props.row.nama }}
      </b-table-column>
      <b-table-column field="opsi" label="Opsi">
        <template v-slot:header="">
          <b-icon icon="cogs"></b-icon>
        </template>
        <template v-slot="props">
          <b-field>
            <button-delete
              :label="isLabel"
              :value="props.row.id"
              action="syarat_pengajuan/trash"
              name="Syarat Pengajuan"
            ></button-delete>
            <button-restore
              :label="isLabel"
              :value="props.row.id"
              action="syarat_pengajuan/trash"
              name="Syarat Pengajuan"
            ></button-restore>
          </b-field>
        </template>
      </b-table-column>
      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
    </b-table>
  </section>
</template>
<script>
import ButtonDelete from '@/components/Button/ForceDelete'
import ButtonRestore from '@/components/Button/Restore'
export default {
  components: { ButtonDelete, ButtonRestore },
  data() {
    return {
      isLabel: false,
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
        `trash=true`,
      ].join('&')

      this.loading = true
      this.$axios
        .get(`/syarat_pengajuan/q?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.data = []
          this.total = data.total
          this.page = data.current_page
          this.perPage = data.per_page
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
    onSearch(value) {
      this.search = value
      this.loadAsyncData()
    },
  },
}
</script>
