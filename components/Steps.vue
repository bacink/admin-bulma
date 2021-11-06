<template>
  <section>
    <b-steps
      :value="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
      :size="stepSize"
      :type="stepType"
    >
      <b-step-item
        v-for="(item, index) in stepItems"
        :key="index"
        :step="index + 1"
        :label="item.label"
        :icon="item.icon"
        :clickable="isStepsClickable"
        :type="item.type"
        :value="parseInt(item.value)"
      >
        <slot :content="item">
          <div v-for="content in contentItems" :key="content"></div>
        </slot>
      </b-step-item>
    </b-steps>
  </section>
</template>

<script>
export default {
  props: {
    isAnimated: {
      type: Boolean,
      default: true,
    },
    isRounded: {
      type: Boolean,
      default: true,
    },
    isStepsClickable: {
      type: Boolean,
      default: false,
    },
    hasNavigation: {
      type: Boolean,
      default: true,
    },
    stepSize: {
      type: String,
      default: 'is-medium',
    },
    stepType: {
      type: String,
      default: 'is-light',
    },
    stepItems: {
      type: Array,
      default: () => [],
    },
    activeStep: {
      type: Number,
      default: 0,
    },
    prevIcon: {
      type: String,
      default: 'chevron-left',
    },
    nextIcon: {
      type: String,
      default: 'chevron-right',
    },
    labelPosition: {
      type: String,
      default: 'bottom',
    },
    mobileMode: {
      type: String,
      default: 'minimalist',
    },
    contentItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>
