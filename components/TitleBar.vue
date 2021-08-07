<template>
  <section class="section is-title-bar">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <ul>
            <li
              v-for="(title, index) in titleStack"
              :key="index"
              class="is-capitalized"
            >
              {{ title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons is-right">
            <b-button to="/" tag="nuxt-link" class="button is-dark">
              <b-icon icon="desktop-mac" custom-size="default" />
              <span>Dashboard</span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    titleStack: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
