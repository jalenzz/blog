<template>
  <div class="author">
    <g-link to="/">
      <g-image
        alt="Author image"
        class="author__image"
        src="~/assets/images/author.webp"
        width="180"
        height="180"
        blur="5"
      />
    </g-link>

    <h1 v-if="showTitle" class="author__site-title" id="author-title">
      <!-- {{ $static.metadata.siteName }} -->
    </h1>

    <p class="author__intro">你终于来啦👻</p>

    <p class="author__links">
      <g-link
        href="https://jalenz.cn/"
        target="_blank"
        style="color: #5c6977"
        v-tooltip="{ content: '🙋‍♂️ Portfolio' }"
        ><font-awesome :icon="['fa', 'home']"
      /></g-link>
      <g-link
        href="https://travellings.link/"
        target="_blank"
        v-tooltip="{ content: '🚇 Travelling' }"
        ><font-awesome :icon="['fas', 'subway']"
      /></g-link>
      <g-link
        href="//jalenz.cn/atom.xml"
        target="_blank"
        style="color: #f5a623"
        v-tooltip="{ content: '📫 RSS' }"
        ><font-awesome :icon="['fas', 'rss']" /></g-link
      ><g-link
        to="/friends"
        title="友链"
        style="color: #06a878"
        v-tooltip="{ content: '🍻 Friends' }"
        ><font-awesome :icon="['fas', 'user-friends']" /></g-link
      ><g-link
        to="/about"
        title="关于"
        style="color: #117cb7"
        v-tooltip="{ content: '🙇‍♂️ About' }"
        ><font-awesome :icon="['fas', 'id-badge']"
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
  props: ["showTitle"],
  methods: {
    initializeVara(selector, text, yPosition, duration) {
      const fontSize =
        window.screen.width < 700 ? 32 : window.screen.width < 1200 ? 56 : 72;
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const color = isDarkMode ? "#ced8de" : "#000000";
      new this.$vara(
        selector,
        "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json",
        [
          {
            text: text,
            y: yPosition,
            fromCurrentPosition: { y: false },
            duration: duration,
            id: "blog",
          },
        ],
        {
          strokeWidth: 2,
          color: color,
          fontSize: fontSize,
          textAlign: "center",
        }
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 查找 id 为 author-title 的元素
      if (document.getElementById("author-title")) {
        this.initializeVara("#author-title", "Hi, I'm Jalen", 10, 3000);
      }
    });
  },
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

.tooltip
  display block !important
  z-index 10000

  .tooltip-inner
    background var(--bg-content-color)
    border-radius var(--radius)
    padding 0.2em 0.8em 0.2em
    box-shadow 1px 1px 5px 0 rgba(0, 0, 0, 0.02), 1px 1px 15px 0 rgba(0, 0, 0, 0.03)

  .tooltip-arrow
    width 0
    height 0
    border-style solid
    position absolute
    margin 2em
    border-color var(--bg-content-color)
    z-index 1

  &[x-placement^='top']
    margin-bottom 5px

    .tooltip-arrow
      border-width 5px 5px 0 5px
      border-left-color transparent !important
      border-right-color transparent !important
      border-bottom-color transparent !important
      bottom -5px
      left calc(50% - 5px)
      margin-top 0
      margin-bottom 0

  &[x-placement^='bottom']
    margin-top 5px

    .tooltip-arrow
      border-width 0 5px 5px 5px
      border-left-color transparent !important
      border-right-color transparent !important
      border-top-color transparent !important
      top -5px
      left calc(50% - 5px)
      margin-top 0
      margin-bottom 0

  &[x-placement^='right']
    margin-left 5px

    .tooltip-arrow
      border-width 5px 5px 5px 0
      border-left-color transparent !important
      border-top-color transparent !important
      border-bottom-color transparent !important
      left -5px
      top calc(50% - 5px)
      margin-left 0
      margin-right 0

  &[x-placement^='left']
    margin-right 5px

    .tooltip-arrow
      border-width 5px 0 5px 5px
      border-top-color transparent !important
      border-right-color transparent !important
      border-bottom-color transparent !important
      right -5px
      top calc(50% - 5px)
      margin-left 0
      margin-right 0

  &.popover
    .popover-inner
      background #f9f9f9
      color black
      padding 24px
      border-radius 5px
      box-shadow 0 5px 30px rgba(black, 0.1)

    .popover-arrow
      border-color #f9f9f9

  &[aria-hidden='true']
    visibility hidden
    opacity 0
    transition opacity 0.15s, visibility 0.15s

  &[aria-hidden='false']
    visibility visible
    opacity 1
    transition opacity 0.15s
</style>
