<template>
  <button
    role="button"
    aria-label="Toggle dark/light"
    @click.prevent="toggleTheme"
    class="toggle-theme"
  >
    <div v-if="darkTheme" class="feather feather-sun"></div>
    <div v-else class="feather feather-moon"></div>
  </button>
</template>

<script>
export default {
  data() {
    return {
      darkTheme: false
    };
  },
  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;

      // This is using a script that is added in index.html
      window.__setPreferredTheme(this.darkTheme ? "dark" : "light");
    }
  },
  mounted() {
    if (window.__theme == "dark") this.darkTheme = true;
  }
};
</script>

<style lang="stylus">
.toggle-theme
  opacity 0.65
  position relative
  border-radius 5px
  width 40px
  height 25px
  display flex
  -webkit-box-align center
  align-items center
  -webkit-box-pack center
  justify-content center
  transition opacity 0.3s ease 0s
  border none
  outline none
  background none
  cursor pointer
  padding 0px
  appearance none

.feather
  position relative
  width 24px
  height 24px
  border-radius 50%
  transition all 0.45s ease 0s

  &::before
    content ''
    position absolute
    right -9px
    top -9px
    height 24px
    width 24px
    border-radius 50%
    transition transform 0.45s ease 0s

  &::after
    content ''
    width 8px
    height 8px
    border-radius 50%
    margin -4px 0px 0px -4px
    position absolute
    top 50%
    left 50%
    box-shadow 0 -23px 0 var(--body-color), 0 23px 0 var(--body-color), 23px 0 0 var(--body-color), -23px 0 0 var(--body-color), 15px 15px 0 var(--body-color), -15px 15px 0 var(--body-color), 15px -15px 0 var(--body-color), -15px -15px 0 var(--body-color)
    transition all 0.35s ease 0s

  &-sun
    border 4px solid var(--body-color)
    background-color var(--body-color)
    transform scale(0.55)
    overflow visible
    box-shadow none

    &::before
      border 2px solid var(--body-color)
      transform translate(14px, -14px)
      opacity 0

    &::after
      transform scale(1)

  &-moon
    border none
    background-color transparent
    transform scale(1)
    overflow hidden
    box-shadow inset 8px -8px 0px 0px var(--body-color)

    &::before
      border none
      transform translate(0px, 0px)
      opacity 1

    &::after
      transform scale(0)
</style>
