<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" @menu-click="menuClick" />
    <title-bar :title-stack="titleStack" />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import menu from '@/components/DataSet/menu'
import TitleBar from '@/components/TitleBar'
export default {
  name: 'App',
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
    TitleBar,
  },
  computed: {
    menu() {
      return menu
    },
    titleStack() {
      const text = this.$route.name.split('-').join(' ')
      return ['Admin', text]
    },
  },
  created() {
    this.$store.commit('user', this.user)
  },
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
  methods: {
    menuClick(item) {
      if (item.action && item.action === 'dark-mode-toggle') {
        this.$store.commit('darkModeToggle')
      }
    },
  },
}
</script>
