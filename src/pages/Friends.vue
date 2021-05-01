<template>
  <div>
    <h1 class="friends-title text-center space-bottom">Friends</h1>

    <div class="friends-container text-center space-bottom">
      <div class="friends-content">
        <a
          class="friends-card btn"
          v-for="friend in friends"
          :key="friend.id"
          :href="friend.link"
          target="_blank"
          :style="'color: #fff; background-color: ' + friend.background"
          ><div class="friends-left">
            <img
              class="avatar"
              :src="
                'https://u.jalenchuh.cn/links/' +
                friend.id +
                '.jpg!friends'
              "
            />
          </div>
          <div class="friends-right">
            <p class="friends-name">{{ friend.id }}</p>
          </div></a
        >
      </div>
      <!-- <p class="note">
        * 本站不再接受<strong>主动</strong>友链申请
      </p> -->
    </div>

    <div class="post-comments">
      <div id="disqus_thread" />
    </div>

    <Author class="post-author" />
  </div>
</template>

<script>
import Author from "~/components/Author";

export default {
  components: {
    Author,
  },
  metaInfo: {
    title: "Friends",
  },
  data() {
    return {
      friends: [
        {
          id: "Austen",
          link: "https://blogbyme.cn/",
          background: "#e1afa5",
        },
        {
          id: "Sanarous",
          link: "https://bestzuo.cn/",
          background: "#cea463",
        },
        {
          id: "Eren",
          link: "https://erenship.com/",
          background: "#d37597",
        },
        {
          id: "keith",
          link: "https://keithqwq.com/",
          background: "#565656",
        },
        {
          id: "ChrAlpha",
          link: "https://blog.ichr.me/",
          background: "#1d89a6",
        },
        {
          id: "奥秘 Sir",
          link: "https://blog.say521.cn/",
          background: "#38557e",
        },
        {
          id: "Vince",
          link: "https://i.vince.pub/",
          background: "#c97f76",
        },
        {
          id: "CYF",
          link: "https://blog.cyfan.top/",
          background: "#f6b352",
        },
        {
          id: "Uncle_drew",
          link: "https://cndrew.cn/",
          background: "#918b8b",
        },
        {
          id: "Linhk1606",
          link: "https://reqwey.vercel.app/",
          background: "#dfa07c",
        },
        {
          id: "JimmyQin",
          link: "https://jimmyqin.cn/",
          background: "#108269",
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
body
  --friends-card rgba(0, 0, 0, 0.2)
  --friends-card-hover rgba(0, 0, 0, 0.3)

body[data-theme="dark"]
  --friends-card rgba(255, 255, 255, 0.2)
  --friends-card-hover rgba(255, 255, 255, 0.3)

.friends-container
  margin 0 auto
  max-width 1080px

  .friends-content
    display flex
    flex-wrap wrap
    margin -8px
    border-radius 5px
    align-items flex-start
    line-height 1.3

    .friends-card
      display flex
      padding 8px
      margin 0 auto
      border-radius 3px
      box-shadow 1px 5px 15px 0 var(--friends-card)
      transition all 0.25s
      margin-top calc(2.25 * 16px + 32px)
      color #444
      background #fff
      justify-content flex-start
      align-content flex-start
      flex-direction column
      max-width 16rem
      width calc(100% / 4 - 16px)
      text-decoration none

      &:hover
        opacity 1
        box-shadow 1px 10px 30px 0 var(--friends-card-hover)

    .friends-left
      display flex
      align-self center

      .avatar
        width 64px
        height 64px
        margin 16px 8px 4px 8px
        margin-top calc(-1.25 * 16px - 32px)
        border-radius 100%
        border 2px solid #fff
        background #fff

    .friends-right
      margin 4px 8px
      display flex
      flex-direction column
      text-align center

      p
        text-align center
        margin 0

        &.friends-name
          padding-top 6px
          padding-bottom 4px
          font-weight bold

        &.tags
          display inline
          background none
          word-wrap break-word
          padding-right 4px

      .friends-tags-wrapper
        margin-left -2px
        word-break break-all

@media screen and (max-width 1280px)
  .friends-container .friends-content .friends-card
    width calc(100% / 3 - 16px)

@media screen and (max-width 1080px)
  .friends-container .friends-content .friends-card
    width calc(100% / 2 - 16px)

@media screen and (max-width 768px)
  .friends-container .friends-content .friends-card
    width calc(100% / 1 - 16px)

.note
  margin calc(var(--space) / 2) 0
  font-size 0.9em
  opacity 0.8
</style>
