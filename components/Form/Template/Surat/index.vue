<template>
  <div class="content">
    <form @submit.prevent="addNewMengingat">
      <b-field grouped>
        <b-field label="Kop Depan" label-position="on-border" expanded>
          <b-input v-model="kop_depan" placeholder="230/Kep."></b-input>
        </b-field>
        <b-field label="Kop Belakang" label-position="on-border" expanded>
          <b-input v-model="kop_belakang" placeholder="BKPSDM/2020"></b-input>
        </b-field>
      </b-field>
      <b-field label="Jenis Jafung">
        <JenisJafung v-model="jenisJafung" @input="getJenisJafung"
      /></b-field>
      <input v-model="id_jenis_jafung" type="hidden" />
      <b-field grouped label="Mengingat" label-position="on-border">
        <b-input v-model="newMengingatText" type="textarea" expanded></b-input>
        <p class="control">
          <b-button
            type="is-success"
            icon-right="plus"
            @click="addNewMengingat"
          ></b-button>
        </p>
      </b-field>
      <b-notification
        v-model="isNotification"
        type="is-danger is-light"
        aria-close-label="Close notification"
        role="alert"
      >
        Siliahkan isi terlebih dahulu
      </b-notification>

      <draggable
        :list="mengingat"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <ul v-for="(element, index) in mengingat" :key="element.id">
          <li class="box mb-1 has-background-white">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ index + 1 }}. {{ element.text }}
                </p>
                <span class="card-header-icon" aria-label="more options">
                  <b-button
                    size="is-small"
                    icon-right="delete"
                    type="is-danger"
                    @click="mengingat.splice(index, 1)"
                  ></b-button>
                </span>
              </header>
            </div>
          </li>
        </ul>
        <p class="has-text-weight-semibold has-text-danger">
          geser untuk merubah posisi
        </p>
      </draggable>

      <hr />
      <b-button
        label="Simpan"
        type="is-success"
        icon-left="content-save"
        @click="onClickButton"
      ></b-button>
    </form>
  </div>
</template>

<script>
import JenisJafung from '@/components/AutoComplete/JenisJafung'
// import HeroBar from '@/components/HeroBar'
import draggable from 'vuedraggable'

export default {
  name: 'TemplateSuratForm',
  components: {
    JenisJafung,
    draggable,
  },
  props: {
    form: {
      type: [Array, Object],
      default() {
        return []
      },
    },
    idJenisJafung: {
      type: Number,
      default: null,
    },
    jenisJafung: {
      type: String,
      default: null,
    },
    kopDpn: {
      type: String,
      default: null,
    },
    kopBlk: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      isLoading: false,
      isNotification: false,
      id_jenis_jafung: null,
      kop_depan: null,
      kop_belakang: null,
      newMengingatId: 1,
      newMengingatText: '',
      mengingat: [],
    }
  },
  watch: {
    kopDpn(newValue) {
      this.kop_depan = newValue
    },
    kopBlk(newValue) {
      this.kop_belakang = newValue
    },
    form(newValue) {
      this.mengingat = newValue
    },
    idJenisJafung(newValue) {
      this.id_jenis_jafung = newValue
    },
  },
  methods: {
    getJenisJafung(payload, payload2) {
      if (payload2) {
        this.id_jenis_jafung = payload2.id
      }
    },
    addNewMengingat() {
      if (this.newMengingatText === '') {
      } else {
        if (this.mengingat) {
          this.newMengingatId = this.mengingat.length
        } else {
          this.newMengingatId = 1
        }

        this.mengingat.push({
          id: this.newMengingatId++,
          nomor: this.newMengingatId++,
          text: this.newMengingatText,
        })
        this.newMengingatText = ''
      }
    },
    onClickButton(event) {
      this.$emit(
        'clicked',
        this.mengingat,
        this.id_jenis_jafung,
        this.kop_depan,
        this.kop_belakang
      )
    },
  },
}
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
p.one {
  border: 2px solid grey;
  border-radius: 5px;
}
</style>
