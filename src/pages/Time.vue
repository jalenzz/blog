<template>
  <div>
    <div class="time-title">
      <h1 class="time-title__text">
        时光机
      </h1>
    </div>

    <div class="time content-box">
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
import PostMeta from "~/components/PostMeta";

export default {
  components: {
    Author,
    PostMeta
  },
  metaInfo() {
    return {
      title: "时光机",
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
        placeholder: "Jalen 专属时光机",
        defaultAvatar: "mp",
        pageKey: "https://blog.jalenchuh.cn/time",
        serverUrl: "https://artalk.jalenchuh.cn",
        gravatar: {
          cdn: "https://dn-qiniu-avatar.qbox.me/avatar/"
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
.time-title
  padding var(--space) 0 var(--space)
  text-align center

.artalk-nick a
.artalk-avatar a
  &::after
    display none

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
