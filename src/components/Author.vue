<template>
  <div class="author">
    <g-image
      alt="Author image"
      class="author__image"
      src="~/assets/images/author.jpg"
      width="180"
      height="180"
      blur="5"
    />

    <h1 v-if="showTitle" class="author__site-title">
      {{ $static.metadata.siteName }}
    </h1>

    <p class="author__intro">
      哟，你终于来啦 (≧∇≦)ﾉ
    </p>

    <p class="author__links">
      <g-link href="https://travellings.now.sh/" target="_blank"
        ><font-awesome :icon="['fas', 'plane']"
      /></g-link>
      <g-link
        href="//blog.jalenchuh.cn/atom.xml"
        target="_blank"
        style="color: #F5A623;"
        ><font-awesome :icon="['fas', 'rss']"/></g-link
      ><g-link to="/archives" style="color: var(--title-color);"
        ><font-awesome :icon="['fas', 'archive']"/></g-link
      ><g-link to="/friends" style="color: #06a878;"
        ><font-awesome :icon="['fas', 'user-friends']"/></g-link
      ><g-link to="/about" style="color: #117cb7"
        ><font-awesome :icon="['fas', 'id-badge']"/></g-link
      ><g-link to="/time" style="color: #FF7790"
        ><font-awesome :icon="['fas', 'rocket']"
      /></g-link>
    </p>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  props: ["showTitle"]
};
</script>

<style lang="stylus">
.author
  margin 0 auto
  max-width 500px
  text-align center
  padding calc(var(--space) / 2) 0

  &__image
    border-radius 100%
    width 90px
    height 90px
    margin-bottom 1em

  &__intro
    opacity 0.8

  &__site-title
    font-size 1.5em

  &__links
    margin-top -0.5em
    font-size 1em

    a
      color var(--main-color)
      margin 0 0.5em

      &::after
        display none //TODO: Remove this!
</style>
