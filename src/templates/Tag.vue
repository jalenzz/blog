<template>
  <div>
    <h1 class="tag-title text-center space-bottom">
      <font-awesome :icon="['fas', 'angle-right']" /> {{ $page.tag.title }}
    </h1>

    <div class="posts">
      <div
        class="post-card content-box"
        v-for="edge in $page.tag.belongsTo.edges"
        :key="edge.node.id"
        :post="edge.node"
        :class="{ 'post-card--has-poster': edge.node.poster }"
      >
        <div class="post-card__header">
          <g-image
            alt="Cover image"
            v-if="edge.node.cover_image"
            class="post-card__image"
            :src="edge.node.cover_image"
          />
        </div>
        <div class="post-card__content">
          <h2 class="post-card__title" v-html="edge.node.title" />
          <p class="post-card__description" v-html="edge.node.description" />

          <PostMeta class="post-card__meta" :post="edge.node" />

          <g-link class="post-card__link" :to="edge.node.path">Link</g-link>
        </div>
      </div>
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
  </div>
</template>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            title
            path
            cover_image (width: 1280, blur: 10)
            date (format: "MMMM D. YYYY")
            timeToRead
            cjkWordCount
            cjkReadTime
            description
            content
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Author from "~/components/Author";
import PostMeta from "~/components/PostMeta";

export default {
  components: {
    Author,
    PostMeta,
  },
  metaInfo: {
    title: "Tag",
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
.post-card {
  margin-bottom: var(--space);
  position: relative;
  &__header {
    margin-left: calc(var(--space) * -1);
    margin-right: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    margin-top: calc(var(--space) * -1);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;
    &:empty {
      display: none;
    }
  }
  &__image {
    min-width: 100%;
  }
  &__title {
    margin-top: 0;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 1px 10px 30px 0 rgba(0, 0, 0, 0.1);
  }
  &__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }
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
