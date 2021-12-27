<template>
  <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
    <aside-tools :is-main-menu="true">
      <span slot="label"> <b>Admin</b> SIUL JAFA</span>
    </aside-tools>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <p
          v-if="menuGroup.type === 'group' && allowed(menuGroup.role)"
          :key="index"
          class="menu-label"
        >
          {{ menuGroup.label }}
        </p>
        <aside-menu-list
          v-else
          :key="index"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import AsideTools from '@/components/AsideTools'
import AsideMenuList from '@/components/AsideMenuList'

export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: [Object, Array],
      default: null,
    },
  },
  computed: {
    ...mapState(['isAsideVisible', 'role']),
  },
  methods: {
    menuClick(item) {
      this.$emit('menu-click', item)
    },
    allowed(role) {
      if (role) {
        return role.split(',').includes(this.role.toLowerCase())
      }
      return true
    },
  },
}
</script>
