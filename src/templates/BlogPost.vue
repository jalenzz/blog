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

      <!-- <div class="admonition admonition-warning" v-if="publishedDays >= 180">
        <p style="margin-bottom: 0;">
          🌶 <strong>过期警告：</strong> 本页面距今已有
          {{ publishedDays }}
          天未更新，年久失修，内容可能有所偏颇，还请仔细甄别！
        </p>
      </div> -->

      <div class="post__content" v-html="$page.post.content" />

      <div class="post__footer">
        <PostTags :post="$page.post" />
      </div>

      <div class="post__navigation">
        <a
          class="navlink"
          v-if="$page.previous"
          :href="$page.previous.path"
          style="float: left;"
          ><span class="post__navigation__">&#9664;</span>
          {{ $page.previous.title }}</a
        >
        <a
          class="navlink"
          v-if="$page.next"
          :href="$page.next.path"
          style="float: right;"
          >{{ $page.next.title }}
          <span class="post__navigation__">&#9654;</span></a
        >
      </div>
    </div>

    <div class="artalk-cards">
      <details class="admonition admonition-note">
        <summary>Comment</summary>
        <p>
          评论如无特殊原因均不会被删除，提交前请三思。<br />
          你应该懂得如何发表适当的观点，请对自己的言论负责。
        </p>
      </details>
      <div id="Artalk" />
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
import "artalk/dist/Artalk.css";
import "katex/dist/katex.min.css";
import Author from "~/components/Author";
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";

export default {
  components: {
    Author,
    PostMeta,
    PostTags
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.description
        }
      ]
    };
  },
  data() {
    return {
      scrolledDist: 0
    };
  },
  methods: {
    handleScroll() {
      if (process.isClient) {
        this.scrolledDist = window.scrollY;
      }
    }
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
    // Add post outdated notification
    const today = new Date();
    const publishTime = new Date(this.$page.post.date);
    const publishedDays = Math.ceil(
      (today - publishTime) / (1000 * 60 * 60 * 24)
    );
    // console.log(publishedDays)
    if (publishedDays >= 180) {
      this.$notify({
        type: "info",
        text: `📢 本页面距今已有 ${publishedDays} 天未更新，年久失修，内容可能有所偏颇，还请仔细甄别！`,
        duration: 100000
      });
    }

    if (process.env.NODE_ENV === "production") {
      window.Artalk = require("artalk");
      const artalk = new Artalk({
        el: "#Artalk",
        placeholder: "说点什么 (づ￣ 3￣)づ",
        defaultAvatar: "mp",
        pageKey: "https://blog.jalenchuh.cn" + this.$page.post.path,
        serverUrl: "https://artalk.jalenchuh.cn",
        readMore: {
          pageSize: 15,
          autoLoad: true
        }
      });
    }
  }
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

  .footnote-backref
    display inline

.artalk-cards
  font-family var(--base-font-family)
  background var(--at-bg-main)
  max-width var(--content-width)
  margin 20px auto 100px
  box-shadow 1px 1px 5px 0 rgba(0, 0, 0, 0.02), 1px 1px 15px 0 rgba(0, 0, 0, 0.03)

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
</style>
