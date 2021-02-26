<template>
  <div :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <PostCard
        v-for="edge in $page.posts.edges"
        :key="edge.node.id"
        :post="edge.node"
      />
    </div>

    <!-- Pagination -->
    <Pager :info="$page.posts.pageInfo" />

    <transition name="fade">
      <div
        id="back-to-top"
        v-scroll-to="{ el: '#app' }"
        v-if="scrolledDist > 400"
      >
        <font-awesome id="back-to-top-icon" :icon="['fas', 'arrow-up']" />
      </div>
    </transition>
  </div>
</template>

<page-query>
query ($page: Int) {
  posts: allPost(filter: { published: { eq: true }}, perPage: 6, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMMM D. YYYY")
        timeToRead
        cjkWordCount
        cjkReadTime
        description
        cover_image (width: 1280, height: 400, blur: 10)
        path
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
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author";
import PostCard from "~/components/PostCard";

export default {
  components: {
    Author,
    PostCard,
  },
  metaInfo: {
    title: "Jalen Chuh",
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
};
</script>

<style lang="stylus">
nav
  max-width var(--content-width)
  margin 0 auto
  text-align center

  a
    margin 0 10px
    padding 3px 10px
    border 2px var(--main-color)
    border-style dashed

.posts
  margin-top 2.5em

#back-to-top
  position fixed
  bottom 40px
  right 30px
  z-index 100
  cursor pointer

#back-to-top-icon
  font-size 1.1em
</style>
