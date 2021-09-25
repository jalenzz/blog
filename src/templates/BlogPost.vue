<template>
  <div>
    <notifications
      class="notify-style"
      position="bottom right"
      width="var(--toast-width)"
    />

    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
        <span class="post-title__publish-icon" v-if="!$page.post.published"
          >DRAFT</span
        >
      </h1>

      <PostMeta :post="$page.post" />
    </div>

    <div class="post content-box">
      <div class="post__header">
        <g-image
          alt="Cover image"
          v-if="$page.post.cover_image"
          :src="$page.post.cover_image"
        />
      </div>

      <div class="admonition admonition-warning" v-if="publishedDays >= 180">
        <p style="margin-bottom: 0">
          🌶 <strong>过期警告：</strong> 本页面距今已有
          {{ publishedDays }}
          天未更新，年久失修，内容可能有所偏颇，还请仔细甄别！
        </p>
      </div>

      <div class="post__content" v-html="$page.post.content" />

      <div v-if="$page.post.license" class="license">
        <div class="license-title">{{ $page.post.title }}</div>
        <div class="license-link">
          <a :href="$page.post.path">
            https://blog.jalenchuh.cn{{ $page.post.path }}
          </a>
        </div>
        <div class="license-meta">
          <div class="license-meta-item">
            <div class="license-meta-title">本文作者</div>
            <div class="license-meta-text">Jalen</div>
          </div>
          <div class="license-meta-item">
            <div class="license-meta-title">发布于</div>
            <div class="license-meta-text">{{ $page.post.date }}</div>
          </div>
          <div class="license-meta-item">
            <div class="license-meta-title">许可协议</div>
            <div class="license-meta-text">
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                CC BY-NC-SA 4.0</a
              >
            </div>
          </div>
        </div>
        <div>转载或引用本文时请遵守许可协议，注明出处、不得用于商业用途！</div>
      </div>

      <div class="post__footer">
        <PostTags :post="$page.post" />
      </div>

      <div class="post__navigation">
        <a
          class="navlink"
          v-if="$page.previous"
          :href="$page.previous.path"
          style="float: left"
          ><span class="post__navigation__">&#9664;</span>
          {{ $page.previous.title }}</a
        >
        <a
          class="navlink"
          v-if="$page.next"
          :href="$page.next.path"
          style="float: right"
          >{{ $page.next.title }}
          <span class="post__navigation__">&#9654;</span></a
        >
      </div>
    </div>

    <div class="waline-cards">
      <details class="admonition admonition-note">
        <summary>Comment</summary>
        <p>
          评论如无特殊原因均不会被删除，提交前请三思。<br />
          你应该懂得如何发表适当的观点，请对自己的言论负责。
        </p>
      </details>
      <div id="waline"></div>
    </div>

    <transition name="fade">
      <div
        id="back-to-top"
        v-scroll-to="{ el: '#app' }"
        v-if="scrolledDist > 800"
      >
        <font-awesome id="back-to-top-icon" :icon="['fas', 'arrow-up']" />
      </div>
    </transition>

    <Author class="post-author" />
  </div>
</template>

<script>
import "katex/dist/katex.min.css";
import Author from "~/components/Author";
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";

export default {
  components: {
    Author,
    PostMeta,
    PostTags,
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.description,
        },
      ],
    };
  },
  data() {
    return {
      scrolledDist: 0,
    };
  },
  methods: {
    handleScroll() {
      if (process.isClient) {
        this.scrolledDist = window.scrollY;
      }
    },
  },
  created() {
    if (process.isClient) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    if (process.isClient) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  mounted() {
    // Add post outdated notification banner
    const today = new Date();
    const publishTime = new Date(this.$page.post.date);
    const publishedDays = Math.ceil(
      (today - publishTime) / (1000 * 60 * 60 * 24)
    );
    this.publishedDays = publishedDays;

    const Waline = require("@waline/client");
    new Waline({
      el: "#waline",
      login: "disable",
      dark: 'body[data-theme="dark"]',
      serverURL: "https://api.jalenchuh.cn",
      // other config
    });
  },
};
</script>

<page-query>
query Post ($id: ID!, $previousElement: ID!, $nextElement: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "MMMM D. YYYY")
    timeToRead
    cjkWordCount
    cjkReadTime
    tags {
      id
      title
      path
    }
    cate {
      id
      title
      path
    }
    description
    published
    content
    license
    cover_image (width: 1280, blur: 10)
  }

  previous: post (id: $previousElement) {
    title
    path
  }

  next: post(id: $nextElement) {
    title
    path
  }
}
</page-query>

<style lang="stylus">
.post-title
  padding var(--space) 0 var(--space)
  text-align center

  &__publish-icon
    vertical-align top
    background-color #f7b955
    display inline-block
    font-size 14px
    height 18px
    line-height 18px
    border-radius 3px
    padding 0 6px
    color #fff

.post-meta
  font-family var(--base-font-family)

.post
  &__header
    width calc(100% + var(--space) * 2)
    margin-left calc(var(--space) * -1)
    margin-top calc(var(--space) * -1)
    margin-bottom calc((var(--space) / 2))
    overflow hidden
    border-radius var(--radius) var(--radius) 0 0

    img
      width 100%

    &:empty
      display none

  &__content
    h2:first-child
      margin-top 0

    // p:first-of-type {
    // // font-size: 1.2em;
    // color: var(--title-color);
    // }
    p
      line-height 1.8

    img
      // width: calc(100% + var(--space) * 2);
      // margin-left: calc(var(--space) * -1);
      display block
      max-width 100%
      margin 0 auto

    a:not(.footnote-ref):not(.footnote-backref)
      color var(--body-color)
      box-shadow inset 0 -6px 0 rgba(26, 188, 156, 0.3)
      transition-duration 0.3s
      text-decoration none

      &:hover
        opacity 1
        box-shadow inset 0 -20px 0 rgba(26, 188, 156, 0.3)

  &__navigation
    border-top 1px solid var(--border-color)
    margin-top calc((var(--space) / 2))
    padding calc((var(--space) / 2)) 0 0 0
    overflow auto

    .navlink
      border none
      text-decoration none

      &:first-of-type
        margin-bottom calc((var(--space) / 4))

.footnotes
  p
    display inline

  hr
    padding calc((var(--space) / 2)) 0 0 0
    border none
    border-top 1px solid var(--border-color)
    margin 0 0

    &::before
      display none

  .footnote-backref
    display inline

.waline-cards
  font-family var(--base-font-family)
  background var(--at-bg-main)
  max-width var(--content-width)
  margin 20px auto 100px

  details
    margin 0 auto
    text-align center
    font-weight 600
    outline none

    summary
      list-style none
      margin 4px auto !important
      color var(--cb-admonition-icon-color) !important
      margin 2.75rem 0 1rem
      font-family var(--title-font-family)
      line-height 1.5
      outline none

    summary::-webkit-details-marker
      display none

    p
      color var(--at-font-color)
      margin-bottom 0

  @media screen and (max-width 767.5px)
    details > p
      text-align left

.post-author
  margin-top calc((var(--space) / 2))

#back-to-top
  position fixed
  bottom 40px
  right 30px
  z-index 100
  cursor pointer

#back-to-top-icon
  font-size 1.1em

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s ease-in-out

.fade-enter, .fade-leave-to
  opacity 0

.post__navigation__
  font-family "Roboto Slab", -apple-system, BlinkMacSystemFont, Segoe UI,
    Helvetica, Arial, pingfang sc, source han sans sc, noto sans cjk sc,
    sarasa gothic sc, microsoft yahei, sans-serif, Apple Color Emoji,
    Segoe UI Emoji

.license
  position relative
  line-height 1.2
  font-size 1rem
  background #f5f5f5
  color #4a4a4a
  margin 1em calc(0em - var(--space))
  overflow hidden
  display block
  padding calc((var(--space) / 3)) var(--space)

  &:after
    position absolute
    background url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'%3E%3Cpath fill='%234a4a4a' d='M245.8 214.9l-33.2 17.3c-9.4-19.6-25.2-20-27.4-20-22.2 0-33.3 14.6-33.3 43.9 0 23.5 9.2 43.8 33.3 43.8 14.4 0 24.6-7 30.5-21.3l30.6 15.5a73.2 73.2 0 01-65.1 39c-22.6 0-74-10.3-74-77 0-58.7 43-77 72.6-77 30.8-.1 52.7 11.9 66 35.8zm143 0l-32.7 17.3c-9.5-19.8-25.7-20-27.9-20-22.1 0-33.2 14.6-33.2 43.9 0 23.5 9.2 43.8 33.2 43.8 14.5 0 24.7-7 30.5-21.3l31 15.5c-2 3.8-21.3 39-65 39-22.7 0-74-9.9-74-77 0-58.7 43-77 72.6-77C354 179 376 191 389 214.8zM247.7 8C104.7 8 0 123 0 256c0 138.4 113.6 248 247.6 248C377.5 504 496 403 496 256 496 118 389.4 8 247.6 8zm.8 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.5 85.5-203.3 203.8-203.3A201.7 201.7 0 01451.3 256c0 121.7-99.7 202.9-202.9 202.9z'/%3E%3C/svg%3E")
    content ' '
    height 200px
    width 200px
    right -40px
    top -45px
    opacity 0.1

  a
    text-decoration underline
    color currentColor

  &-link
    color #7a7a7a

  &-meta-text
    margin 0

  &-meta-title, &-title
    margin 0 0 0.25rem

  &-link, &-meta-title
    font-size 0.8rem

  &-meta
    margin-top 1rem
    display flex
    align-items center
    justify-content flex-start
    flex-wrap wrap

    &-item
      margin 0 2rem 1em 0

.v[data-class=v] .vaction
  display none !important
</style>
