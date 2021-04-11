<template>
  <div id="app">
    <div id="nprogress-container">
      <header class="header">
        <div class="header__left">
          <Logo v-if="showLogo" />
        </div>

        <div class="header__right">
          <ToggleTheme />
        </div>
      </header>
    </div>

    <main class="main">
      <!-- <slot /> -->
      <!-- Re-render components on each route to force route path change.
           See: https://github.com/gridsome/gridsome/issues/835 -->
      <router-view :key="$route.path" />
    </main>

    <footer class="footer">
      <div class="footer__copyright">
        Jalen Chuh © 2019 - {{ new Date().getFullYear() }}.
        <a
          href="http://beian.miit.gov.cn/"
          target="_blank"
          style="text-decoration: none"
          >闽ICP备20005437号-2</a
        >
      </div>
      <div class="footer__links">
        Powered by <font-awesome :icon="['fas', 'rocket']" />
        <a href="//gridsome.org" style="text-decoration: none" target="_blank"
          >Gridsome</a
        >
        and <font-awesome :icon="['fas', 'heart']" />Love.
      </div>
      <a
        href="//www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
        target="_blank"
      >
        <g-image src="~/assets/images/upyun.svg" />
      </a>
    </footer>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";

export default {
  props: {
    showLogo: { default: true },
  },
  components: {
    Logo,
    ToggleTheme,
  },
};
</script>

<style lang="stylus">
#app
  scroll-behavior smooth

#nprogress-container
  display flex
  align-items center
  min-height var(--header-height)
  padding 0 calc((var(--space) / 2))
  top 0
  z-index 10
  backdrop-filter blur(32px)

  @media screen and (min-width: 1300px)
    // Make header sticky for large screens
    position sticky
    width 100%

.header
  display flex
  justify-content space-between
  align-items center
  width 100%

  &__left, &__right
    display flex
    align-items center
    font-family var(--base-font-family)

.main
  margin 0 auto
  padding 1.5vw 15px 0

.footer
  // max-width: var(--content-width);
  // margin: 0 auto;
  display flex
  flex-direction column
  align-items center
  justify-content center
  padding var(--space) 15px var(--space)
  text-align center
  line-height 1.8
  font-size 0.9em
  font-family var(--base-font-family)

  > span
    margin 0 0.35em

  a
    color currentColor

  svg
    margin-right 0.2rem

  #rss-stats
    padding-top 0.35rem

    a
      margin-right 0.35rem
</style>
