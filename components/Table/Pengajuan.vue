<template>
  <section>
    <b-field grouped>
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
        <p class="control">
          <jenis-jafung v-model="jenisJafungId"></jenis-jafung>
        </p>
      </b-field>
    </b-field>
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
        <p>
          <b>{{ props.row.pegawai.nama }}</b
          ><br />
          {{ props.row.pegawai.nip }}
        </p>
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="jenis_jafung"
        label="Jenis Jafung"
        sortable
      >
        <p class="is-capitalized">{{ props.row.jenis_jafung.nama }}</p>
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
            >{{
              props.row.jabatan_lama.jabatan.unit_kerja
                ? props.row.jabatan_lama.jabatan.unit_kerja.nama_lengkap
                : null
            }}
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
          <b-field>
            <p class="control">
              <b-button
                tag="router-link"
                :to="`/tracking/${props.row.id}`"
                type="is-dark"
                size="is-small"
                icon-left="eye"
              >
                Tracking
              </b-button>
            </p>
            <template v-if="isSkpd">
              <template v-if="props.row.status === 'diverifikasi_skpd'">
                <template v-if="props.row.surat_pengantar !== null">
                  <p class="control">
                    <b-button
                      label="Kirim Ke Verifikator"
                      icon-left="send"
                      type="is-warning"
                      size="is-small"
                      @click="confirm(props.row.id)"
                    />
                  </p>
                  <p class="control">
                    <b-button
                      tag="router-link"
                      :to="`/pengajuan/verifikasi/${props.row.id}`"
                      type="is-success"
                      size="is-small"
                    >
                      Edit Verifikasi
                    </b-button>
                  </p>
                </template>
                <template v-else>
                  <p class="control">
                    <b-button
                      class="is-small is-primary"
                      icon-left="upload"
                      @click="cardModal(props.row.id)"
                    >
                      Upload Surat Pengantar
                    </b-button>
                  </p>
                </template>
              </template>
              <template v-else-if="props.row.status === 'diajukan'">
                <p class="control">
                  <b-button
                    tag="router-link"
                    :to="`/pengajuan/verifikasi/${props.row.id}`"
                    type="is-info"
                    size="is-small"
                    icon-left="pencil"
                  >
                    Verifikasi
                  </b-button>
                </p>
              </template>
              <template v-else-if="props.row.status === 'dikirim_skpd'">
                <p class="control">
                  <btn-surat-pengantar :id-pengajuan="props.row.id" />
                </p>
              </template>
            </template>
            <template v-if="isAnalis || isBkpsdm || isSkpd || isPegawai">
              <template v-if="props.row.status === 'form'">
                <p class="control">
                  <b-button
                    icon-left="pencil"
                    type="is-warning"
                    size="is-small"
                    tag="router-link"
                    :to="`/pengajuan/${props.row.id}`"
                  >
                    Edit
                  </b-button>
                </p>
              </template>
              <template
                v-else-if="
                  props.row.status === 'ditolak_skpd' ||
                  props.row.status === 'ditolak_analis'
                "
              >
                <p class="control">
                  <b-button
                    icon-left="pencil"
                    type="is-warning"
                    size="is-small"
                    tag="router-link"
                    :to="`/pengajuan/${props.row.id}`"
                  >
                    Edit
                  </b-button>
                </p>
              </template>
            </template>
            <template v-if="isAnalis || isBkpsdm">
              <template v-if="props.row.status === 'dikirim_skpd'">
                <p class="control">
                  <btn-surat-pengantar :id-pengajuan="props.row.id" />
                </p>
                <p class="control">
                  <b-button
                    icon-left="alert-circle-outline"
                    type="is-warning"
                    size="is-small"
                    tag="router-link"
                    :to="`/pengajuan/verifikasi/${props.row.id}`"
                  >
                    Verifikasi
                  </b-button>
                </p>
              </template>
              <template v-if="props.row.status === 'diverifikasi_analis'">
                <p class="control">
                  <b-button
                    icon-left="file"
                    type="is-info"
                    size="is-small"
                    tag="router-link"
                    :to="`/draft/${props.row.id}`"
                  >
                    Buat Draft
                  </b-button>
                </p>
              </template>
              <template
                v-if="
                  props.row.status === 'ditolak_administrator_1' ||
                  props.row.status === 'ditolak_administrator_2'
                "
              >
                <p class="control">
                  <b-button
                    icon-left="file"
                    type="is-warning"
                    size="is-small"
                    tag="router-link"
                    :to="`/draft/edit/${props.row.id_draft}`"
                  >
                    Edit Draft
                  </b-button>
                </p>
              </template>
              <template v-if="props.row.status === 'paraf_administrator_2'">
                <p class="control">
                  <b-button
                    icon-left="printer"
                    type="is-info"
                    size="is-small"
                    tag="router-link"
                    :to="`/sk/${props.row.id}`"
                  >
                    Cetak Surat Keputusan
                  </b-button>
                </p>
              </template>
            </template>
            <template v-if="isAdmin1">
              <template v-if="props.row.status === 'draft_analis_jabatan'">
                <p class="control">
                  <btn-draft :id-pengajuan="props.row.id"></btn-draft>
                </p>
                <p class="control">
                  <b-button
                    label="Paraf"
                    type="is-danger"
                    size="is-small"
                    icon-left="pencil"
                    outlined
                    @click="paraf(props.row.id)"
                  /></p
              ></template>
            </template>
            <template v-if="isAdmin2">
              <template v-if="props.row.status === 'paraf_administrator_1'">
                <p class="control">
                  <btn-draft :id-pengajuan="props.row.id"></btn-draft>
                </p>
                <p class="control">
                  <b-button
                    label="Paraf"
                    type="is-danger"
                    size="is-small"
                    icon-left="pencil"
                    outlined
                    @click="paraf(props.row.id)"
                  /></p
              ></template>
            </template>
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
                <li>Pangkat/Golongan: {{ props.row.pegawai.golongan }}</li>
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
import { mapState } from 'vuex'

import ModalForm from '@/components/Modal/FormUploadSuratPengantar.vue'
import BtnSuratPengantar from '@/components/Form/Pengajuan/BtnSuratPengantar.vue'
import BtnDraft from '@/components/Form/Pengajuan/BtnDraft.vue'
import JenisJafung from '@/components/SelectOption/JenisJafung.vue'

export default {
  components: { BtnSuratPengantar, BtnDraft, JenisJafung },
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
      sortIcon: 'chevron-up',
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
      jenisJafungId: '',
    }
  },
  computed: {
    ...mapState(['role']),
  },
  watch: {
    jenisJafungId() {
      this.loadAsyncData()
    },
  },
  mounted() {
    const CurrentRole = this.role.toLowerCase()

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
    updateStatus(idPengajuan, Status, Deskripsi) {
      this.isLoading = true
      this.$axios
        .patch('/pengajuan/update/status', {
          id_pengajuan: idPengajuan,
          status: Status,
          deskripsi: Deskripsi,
        })
        .then((resp) => {
          if (resp.data.success) {
            this.loadAsyncData()
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'is-success',
              queue: false,
            })
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
    confirmTolak(id, status) {
      /* this.$buefy.dialog.confirm({
        title: 'Tolak Draft',
        message: 'Anda yakin <b>Menolak Draft</b> ini tidak bisa dibatalkan.',
        confirmText: 'Tolak Draft',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open(`Paraf sedang di proses`)
          setTimeout(() => {
            this.updateStatus(id, status)
          }, 2000)
        },
      }) */
      this.$buefy.dialog.prompt({
        message: `Alasan Penolakan`,
        inputAttrs: {
          placeholder: 'e.g. Draft Salah pada nomor surat',
          minlength: 10,
          type: 'textarea',
          required: 'required',
        },
        type: 'is-danger',
        trapFocus: true,
        onConfirm: (value) => {
          this.$buefy.toast.open(value)
          setTimeout(() => {
            this.updateStatus(id, status, value)
          }, 2000)
        },
      })
    },
    parafOk(id, status) {
      this.$buefy.toast.open(`Paraf sedang di proses`)
      setTimeout(() => {
        this.updateStatus(id, status, null)
      }, 2000)
    },

    paraf(idPengajuan) {
      let role = this.role.toLowerCase()
      role = role.replace(/\s+/g, '_')

      this.$buefy.dialog.confirm({
        title: 'Paraf Draft',
        message:
          'Pastikan anda sudah melihat <b>draft</b> terlebih dahulu ? Karena ini tidak bisa dibatalkan.',
        confirmText: 'Paraf',
        type: 'is-info',
        hasIcon: true,
        cancelText: 'Tolak',
        canCancel: true,
        onConfirm: () => {
          this.parafOk(idPengajuan, 'paraf_' + role)
        },
        onCancel: () => {
          this.confirmTolak(idPengajuan, 'ditolak_' + role)
        },
      })
    },

    loadAsyncData() {
      const params = [
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `jenis_jafung=${this.jenisJafungId}`,
        `page=${this.page}`,
        `take=${this.perPage}`,
      ].join('&')

      this.loading = true
      this.isLoading = true

      this.$axios
        .get(`/pengajuan/q?${params}`)
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
    cardModal(x) {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          idPengajuan: x,
        },
      })
      modal.$on('close', () => {
        this.loadAsyncData()
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
    confirm(value) {
      this.$buefy.dialog.confirm({
        message: 'Kirim Pengajuan Ke Verifiktor?',
        onConfirm: () => this.kirmVerifikator(value),
      })
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
            this.loadAsyncData()
            this.$buefy.toast.open({
              message: `Success: ${resp.data.message}`,
              type: 'is-success',
              queue: false,
            })
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
