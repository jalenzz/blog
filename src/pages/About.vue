<template>
  <div>
    <div class="about-title">
      <h1 class="about-title__text">
        About
      </h1>
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
          爱折腾的少年，信奉「好看就是生产力」（大雾），对大部分未知事物感兴趣。<br />
          喜欢 🏓 🏐 🏊‍♂️ 💻 and Emoji 😆<br />
          <s>坚定的</s>括号不换行党！只要你也不换行，我们就是好朋友
        </p>

        <p>我 ENFJ-A 主人公 / 平等 · 人权 · 劳动。</p>

        <p>
          如果你想联系我，可以直接在评论里留言或者通过邮件
          <a
            href="javascript:location='mailto:\u006a\u0061\u006c\u0065\u006e\u0063\u0068\u0075\u0068\u0040\u0067\u006d\u0061\u0069\u006c\u002e\u0063\u006f\u006d';void 0"
            >jalenchuh[AT]gmail.com</a
          >
        </p>

        <h3 id="关于博客"><a href="#关于博客"></a>关于博客</h3>
        <p>
          本站使用
          <a href="http://gridsome.org/" target="_blank">Gridsome</a> 和
          <a
            href="https://github.com/gridsome/gridsome-starter-blog"
            target="_blank"
            >gridsome-starter-blog</a
          >
          主题搭建，参考
          <a href="https://spencerwoo.com/" target="_blank">Spencer</a> &
          <a href="https://blog.monsterx.cn/" target="_blank">Monstx</a>
          进行了修改。 如有疑问请查看源码：
          <a href="https://github.com/jalenchuh/blog" target="_blank"
            >@jalenchuh/blog</a
          >。
        </p>
        <p>
          本博客题图均为自制，大部分素材来自
          <a href="https://icons8.com/" target="_blank">icons8</a> 和
          <a href="https://stories.freepik.com/" target="_blank">freepik</a>。
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
              署名
            </h5>
          </div>
          <div class="admonition-content">
            除特殊说明，文章均采用
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
              target="_blank"
              >CC BY-NC-SA 4.0 协议</a
            >
          </div>
        </div>
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
        v-if="scrolledDist > 400"
      >
        <font-awesome id="back-to-top-icon" :icon="['fas', 'arrow-up']" />
      </div>
    </transition>

    <Author class="post-author" />
  </div>
</template>

<script>
import "artalk/dist/Artalk.css";
import Author from "~/components/Author";

export default {
  components: {
    Author
  },
  metaInfo() {
    return {
      title: "About",
      meta: [
        {
          name: "description"
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
    if (process.env.NODE_ENV === "production") {
      window.Artalk = require("artalk");
      const artalk = new Artalk({
        el: "#Artalk",
        placeholder: "说点什么 (づ￣ 3￣)づ",
        defaultAvatar: "mp",
        pageKey: "https://blog.jalenchuh.cn/about",
        serverUrl: "https://artalk.jalenchuh.cn",
        gravatar: {
          cdn: "https://cdn.staticdn.net/avatar/"
        },
        readMore: {
          pageSize: 5,
          autoLoad: true
        }
      });
    }
  }
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
      display none !important //TODO: Remove this!

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
  margin-top calc(var(--space) / 2)

#back-to-top
  position fixed
  bottom 40px
  right 30px
  z-index 100
  cursor pointer

#back-to-top-icon
  font-size 1.1em

.fade-enter-active
.fade-leave-active
  transition opacity 0.3s ease-in-out

.fade-enter
.fade-leave-to
  opacity 0
</style>
