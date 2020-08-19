<template>
  <div>
    <div class="time-title">
      <h1 class="time-title__text">
        时光机
      </h1>
    </div>

    <div class="time content-box">
      <div id="artitalk_main"></div>
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
  mounted() {
    function addScript(url) {
      var s = document.createElement("script");
      s.id = "at";
      url.indexOf("appID") == -1 ? (s.src = url) : (s.innerHTML = url);
      document.getElementsByTagName("head")[0].appendChild(s);
    }
    addScript(
      "\
      var appID = 'Ikn1WpEQq7e9N6H3EhY9k43J-9Nh9j0Va';\
      var appKEY = '3SnOsnvmkYXBAT0WFNoLdEuR';\
      var severurl = 'https://lc.jalenchuh.cn';\
      var username = 'JalenChuh';\
    "
    );
    addScript("https://cdn.jsdelivr.net/npm/jquery");
    addScript("https://cdn.jsdelivr.net/npm/artitalk");
  },
  destroyed() {
    if (process.isClient) {
      window.removeEventListener("scroll", this.handleScroll);
    }
    document
      .querySelectorAll("#at")
      .forEach(element => element.parentNode.removeChild(element));
    delete window.AV;
  }
};
</script>

<style lang="scss">
.time-title {
  padding: var(--space) 0 var(--space);
  text-align: center;
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

.shuoshuoimg:hover {
  transform: scale(1) !important;
}
</style>
