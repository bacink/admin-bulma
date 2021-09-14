<template>
  <div class="content">
    <form @submit.prevent="addNewTodo">
      <b-field grouped>
        <b-field label="Kop Depan" label-position="on-border" expanded>
          <b-input v-model="kop_depan" placeholder="230/Kep."></b-input>
        </b-field>
        <b-field label="Kop Belakang" label-position="on-border" expanded>
          <b-input v-model="kop_belakang" placeholder="BKPSDM/2020"></b-input>
        </b-field>
      </b-field>
      <b-field label="Jenis Jafung">
        <JenisJafung v-model="AcJenisJafung" @input="getJenisJafung"
      /></b-field>
      <input id="" v-model="id_jenis_jafung" />
      <b-field label="Mengingat">
        <b-input
          id="new-todo"
          v-model="newTodoText"
          placeholder="Type here"
          expanded
        />
        <p class="control">
          <b-button
            type="is-success"
            icon-right="plus"
            @click="addNewTodo"
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
    </form>
    <ol type="1">
      <li v-for="(todo, index) in form" :key="index">
        {{ todo.text }}
        <b-button
          icon-left="minus"
          type="is-danger"
          size="is-small"
          @click="form.splice(index, 1)"
        ></b-button>
      </li>
    </ol>
    <hr />
    <b-button
      label="Simpan"
      type="is-success"
      icon-left="content-save"
      @click="onClickButton"
    ></b-button>
  </div>
</template>

<script>
import JenisJafung from '@/components/AutoComplete/JenisJafung'
// import HeroBar from '@/components/HeroBar'

export default {
  name: 'TemplateSuratForm',
  components: {
    JenisJafung,
  },
  props: {
    form: {
      type: [Array, Object],
      default: () => ({
        id: 0,
        text: 'test',
      }),
    },
  },
  data() {
    return {
      isLoading: false,
      isNotification: false,
      newTodoText: '',
      nextTodoId: 0,
      AcJenisJafung: null,
      id_jenis_jafung: null,
      kop_depan: null,
      kop_belakang: null,
    }
  },

  methods: {
    getJenisJafung(payload, payload2) {
      if (payload2) {
        this.id_jenis_jafung = payload2.id
      }
    },
    addNewTodo() {
      if (this.newTodoText === '') {
        this.isNotification = true
      } else {
        this.appendTodo()
      }
    },
    appendTodo() {
      if (this.form) {
        this.nextTodoId = this.form.length
      } else {
        this.nextTodoId = 0
      }

      this.form.push({
        id: this.nextTodoId++,
        text: this.newTodoText,
      })
      this.newTodoText = ''
    },
    onClickButton(event) {
      this.$emit(
        'clicked',
        this.form,
        this.id_jenis_jafung,
        this.kop_depan,
        this.kop_belakang
      )
    },
  },
}
</script>
