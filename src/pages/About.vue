<template>
  <div>
    <div class="post-title">
      <h1 class="post-title__text">
        About
      </h1>
      <!-- <PostMeta :post="$page.post" /> -->
    </div>

    <div class="post content-box">
      <div class="post__content">
        <div class="md-content">
          <h3 style="margin-top: 0" id="关于我">
            <a href="#关于我"></a>关于我
          </h3>
          <p>
            <a
              href="https://JalenChuh.cn"
              target="_blank"
              style="text-decoration: none;"
              ><font-awesome :icon="['fas', 'id-badge']" /> Student</a
            >
            /
            <a
              href="https://github.com/jalenchuh"
              target="_blank"
              style="text-decoration: none; color: var(--title-color)"
              ><font-awesome :icon="['fab', 'github']" /> Developer</a
            >
            /
            <a
              href="https://sspai.com/u/Jalen"
              target="_blank"
              style="text-decoration: none; color: #ca2c2a"
              ><font-awesome :icon="['fas', 'pen-square']" /> Writer</a
            >
          </p>

          <p>
            欢迎来到小破站，我是 Jalen，00 后，性别男爱好女。<br />
            爱折腾的少年，信奉「好看就是生产力」（大雾），对大部分未知事物感兴趣。<br />
            喜欢 🏓 🏐 🏊‍♂️ 💻 and Emoji 😆<br />
            <s>坚定的</s>括号不换行党！只要你也不换行，我们就是好朋友
          </p>

          <p>
            如果你想联系我，可以直接在评论里留言或者通过邮件（推荐）
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
            >(样式参考
            <a href="https://spencerwoo.com/" target="_blank">Spencer</a>)
            主题搭建。如有疑问请查看源码：
            <a href="https://github.com/jalenchuh/blog" target="_blank"
              >@jalenchuh/blog</a
            >。
          </p>
          <p>
            本博客题图均为自制，大部分素材来自
            <a href="https://icons8.con/" target="_blank">icons8</a> 和
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
    </div>

    <div class="post-comments">
      <div id="disqus_thread" />
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
import PostMeta from "~/components/PostMeta";
import Author from "~/components/Author.vue";
import DisqusJS from "disqusjs";

export default {
  components: {
    Author,
    PostMeta
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
    // Initialize post comment by DisqusJS
    if (process.env.NODE_ENV === "production") {
      const disqusjs = new DisqusJS({
        shortname: "jalenchuh",
        siteName: "Jalen's Blog",
        identifier: "jalen-blog-guestbook",
        apikey:
          "yMnV34hMagksc3XdQ0O9kgC87uI0genlKI7uFs07Ak8H07jPgh6rWyYeOLvahS6j",
        admin: "JalenChuh",
        adminLabel: "Admin"
      });
    }
  }
};
</script>

<style lang="scss">
.post-title {
  padding: var(--space) 0 var(--space);
  text-align: center;

  &__publish-icon {
    vertical-align: top;
    background-color: #f7b955;
    display: inline-block;
    font-size: 14px;
    height: 18px;
    line-height: 18px;
    border-radius: 3px;
    padding: 0 6px;
    color: #fff;
  }
}

.post-meta {
  font-family: var(--base-font-family);
}

.post {
  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    // p:first-of-type {
    //   // font-size: 1.2em;
    //   color: var(--title-color);
    // }

    p {
      line-height: 1.8;
    }

    img {
      // width: calc(100% + var(--space) * 2);
      // margin-left: calc(var(--space) * -1);
      display: block;
      max-width: 100%;
      margin: 0 auto;
    }
  }

  &__navigation {
    border-top: 1px solid var(--border-color);
    margin-top: calc(var(--space) / 2);
    padding: calc(var(--space) / 2) 0 0 0;
    overflow: auto;

    .navlink {
      border: none;
      text-decoration: none;

      &:first-of-type {
        margin-bottom: calc(var(--space) / 4);
      }
    }
  }
}

.footnotes {
  p {
    display: inline;
  }
  hr {
    padding: calc(var(--space) / 2) 0 0 0;
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 0 0;
  }
  .footnote-backref {
    display: inline;
  }
}

.post-comments {
  font-family: var(--base-font-family);
  padding: calc(var(--space) / 2);
  max-width: var(--content-width);
  margin: 0 auto;
}

.post-author {
  margin-top: calc(var(--space) / 2);
}

#back-to-top {
  position: fixed;
  bottom: 40px;
  right: 30px;
  z-index: 100;
  cursor: pointer;
}

#back-to-top-icon {
  font-size: 1.1em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
