<template>
  <div :show-logo="false">
    <h1 class="text-center space-bottom">Archives</h1>

    <div class="posts content-box">
      <p style="opacity: 0.6;">
        <strong
          >(｡･∀･)ﾉﾞ I have published a total of {{ totalPosts }} posts,
          {{ totalWords }} words since 2019.</strong
        >
      </p>

      <div v-for="year in backwardsTimeKey" :key="year">
        <h5>{{ year }}</h5>
        <p v-for="p in timeline[year]" :key="p.id">
          <span>{{
            new Date(p.date)
              .toLocaleString("en-US", {
                month: "short",
                day: "2-digit"
              })
              .replace(" ", ".")
          }}</span
          ><g-link :to="p.path" class="archives__item">{{ p.title }}</g-link>
        </p>
      </div>
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

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date
        cjkWordCount
        path
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author";

export default {
  components: {
    Author
  },
  metaInfo() {
    return {
      title: "Archives"
    };
  },
  data() {
    return {
      timeline: {},
      backwardsTimeKey: [],
      totalPosts: 0,
      totalWords: 0,
      scrolledDist: 0
    };
  },
  methods: {
    // Covert actual number to `xx.x k` expression, see: https://url.cn/JobLixKT
    kFormatter: num => {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    },
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
    this.totalPosts = this.$page.posts.edges.length;

    const timeline = {};
    this.$page.posts.edges.forEach(post => {
      this.totalWords += post.node.cjkWordCount;

      // Render timeline views
      const postYear = new Date(post.node.date).getFullYear();
      if (!(postYear in timeline)) {
        timeline[postYear] = [];
      }
      timeline[postYear].push(post.node);
    });
    this.timeline = timeline;
    this.backwardsTimeKey = Object.keys(timeline)
      .sort()
      .reverse();

    this.totalWords = this.kFormatter(this.totalWords);
  }
};
</script>

<style lang="stylus">
.posts
  p span
    font-size 0.85rem
    font-family var(--monospace-font-family)

    &::after
      content " "

  .archives__item
    color var(--body-color)
    box-shadow inset 0 -6px 0 rgba(26, 188, 156, 0.3)
    transition-duration 0.3s
    text-decoration none

    &:hover
      opacity 1
      box-shadow inset 0 -20px 0 rgba(26, 188, 156, 0.3)
</style>
