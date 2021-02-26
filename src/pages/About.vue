<template>
  <div>
    <div class="about-title">
      <h1 class="about-title__text">About</h1>
    </div>

    <div class="about content-box">
      <div class="about_content">
        <h3 style="margin-top: 0" id="关于我"><a href="#关于我"></a>关于我</h3>
        <p>
          <a
            href="https://jalenchuh.cn"
            target="_blank"
            class="about-me"
            style="color: #0070f3"
            ><font-awesome :icon="['fas', 'id-badge']" /> Student</a
          >
          /
          <a
            href="https://github.com/jalenchuh"
            target="_blank"
            class="about-me"
            style="color: var(--title-color)"
            ><font-awesome :icon="['fab', 'github']" /> Developer</a
          >
          /
          <a
            href="https://sspai.com/u/Jalen/posts"
            target="_blank"
            class="about-me"
            style="color: #ca2c2a"
            ><font-awesome :icon="['fas', 'pen-square']" /> Writer</a
          >
        </p>

        <p>
          欢迎来到小破站，我是 Jalen，00 后，性别男爱好女。<br />
          爱折腾的少年，信奉「好看就是生产力」（大雾），对大部分未知事物感兴趣<br />
          喜欢 🏓 🏐 🏊‍♂️ 💻 and Emoji 😆<br />
          <s>坚定的</s>括号不换行党！只要你也不换行，我们就是好朋友
        </p>

        <p>如果你想联系我，可以直接在评论里留言或者通过邮件</p>

        <h3 id="关于博客"><a href="#关于博客"></a>关于博客</h3>
        <p>
          本站使用 Gridsome 搭建，参考
          <a href="https://github.com/spencerwooo/blog" target="_blank"
            >@spencerwooo/blog</a
          >
          和
          <a href="https://github.com/monsterxcn/myBlog" target="_blank"
            >@monsterxcn/myBlog</a
          >
          进行了修改，开源于
          <a href="https://github.com/jalenchuh/blog" target="_blank"
            >@jalenchuh/blog</a
          >
        </p>
        <div class="admonition admonition-important">
          <div class="admonition-heading">
            <h5>
              <div class="admonition-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
                  ></path>
                </svg>
              </div>
              版权
            </h5>
          </div>
          <div class="admonition-content">
            除特殊说明，文章均采用
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
              target="_blank"
              >CC BY-NC-SA 4.0 协议</a
            >
            <br />
            博客题图均为自制，部分素材来自
            <a href="https://freepik.com/" target="_blank">freepik</a>
          </div>
        </div>
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
        v-if="scrolledDist > 400"
      >
        <font-awesome id="back-to-top-icon" :icon="['fas', 'arrow-up']" />
      </div>
    </transition>

    <Author class="post-author" />
  </div>
</template>

<script>
import Author from "~/components/Author";

export default {
  components: {
    Author,
  },
  metaInfo() {
    return {
      title: "About",
      meta: [
        {
          name: "description",
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
    const Waline = require("@waline/client");
    new Waline({
      el: "#waline",
      serverURL: "https://api.jalenchuh.cn",
      // other config
    });
  },
};
</script>

<style lang="stylus">
.about-title
  padding var(--space) 0 var(--space)
  text-align center

.about
  a:not(.about-me)
    color var(--body-color)
    box-shadow inset 0 -6px 0 rgba(26, 188, 156, 0.3)
    transition-duration 0.3s
    text-decoration none

    &:hover
      opacity 1
      box-shadow inset 0 -20px 0 rgba(26, 188, 156, 0.3)

  .about-me
    text-decoration none

    &::after
      display none !important // TODO: Remove this!

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
</style>
