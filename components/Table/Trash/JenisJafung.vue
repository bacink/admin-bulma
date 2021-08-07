<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients"
    >
      <template slot-scope="props">
        <b-table-column label="Index" field="index" sortable>
          {{ props.index + 1 }}
        </b-table-column>
        <b-table-column label="Nama" field="nama" sortable>
          {{ props.row.nama }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <nuxt-link
              :to="{ name: 'jenis-jafung-id', params: { id: props.row.id } }"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <b-tooltip label="Delete" position="is-right">
              <button
                class="button is-small is-danger"
                type="button"
                @click.prevent="trashModal(props.row)"
              >
                <b-icon icon="trash-can" size="is-small" /></button
            ></b-tooltip>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox'

export default {
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.nama
      }
      return null
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.dataUrl) {
        this.isLoading = true
        this.$axios
          .$get(this.dataUrl)
          .then((r) => {
            this.isLoading = false
            if (r.data && r.data.data) {
              if (r.data.data.length > this.perPage) {
                this.paginated = true
              }
              this.clients = r.data.data
            }
          })
          .catch((e) => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
            })
          })
      }
    },
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.handleDelete()
    },
    trashCancel() {
      this.isModalActive = false
    },
    handleDelete() {
      if (this.trashObject) {
        this.isLoading = true
        const payload = this.trashObject
        this.$axios
          .$delete('jenis_jafung/' + payload.id)
          .then((r) => {
            this.$buefy.snackbar.open({
              type: 'is-info',
              message: r.message,
              queue: false,
              position: 'is-top',
            })
            this.isLoading = false
            this.getData()
          })
          .catch((e) => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
            })
          })
      }
    },
  },
}
</script>
