<template>
  <div class="post-tags">
    <g-link class="post-tags__link category" :to="post.cate.path">
      <font-awesome :icon="['fas', 'angle-double-right']" />
      {{ post.cate.title }}
    </g-link>
    <g-link
      class="post-tags__link"
      v-for="tag in post.tags"
      :key="tag.id"
      :to="tag.path"
    >
      <font-awesome :icon="['fas', 'angle-right']" />
      {{ tag.title }}
    </g-link>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="stylus">
.post-tags
  margin 1em 0 0
  font-weight: 400;
  &__link
    margin 0.3em 0.6em 0.3em 0
    font-size 0.8em
    color currentColor
    text-decoration none
    background-color var(--bg-color)
    color currentColor !important
    //TODO: remove important;
    padding 0.5em
    border-radius var(--radius)
    display inline-block
    &.category
      color #000 !important
      background-color #c2c2c2
</style>
