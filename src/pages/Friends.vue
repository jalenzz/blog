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
          :style="friend.style"
          ><div class="friends-left">
            <img class="avatar" :src="friend.avatar" />
          </div>
          <div class="friends-right">
            <p class="friends-name">{{ friend.id }}</p>
          </div></a
        >
      </div>
      <p class="note">
        * 本站不再接受<strong>主动</strong>友链申请
      </p>
    </div>

    <div class="post-comments">
      <div id="disqus_thread" />
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Friends"
  },
  data() {
    return {
      friends: [
        {
          id: "Neworld2002",
          link: "https://neworld2002.github.io/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/Neworld2002.jpg?w=100",
          style: "color: #fff; background-color: #024265"
        },
        {
          id: "维他入我心",
          link: "https://wtrwx.top/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/维他入我心.jpg?w=100",
          style: "color: #fff; background-color: #583066"
        },
        {
          id: "Linhk1606",
          link: "https://blog.lhkstudio.me/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/Linhk1606.jpg?w=100",
          style: "color: #fff; background-color: #b59672"
        },
        {
          id: "小K同學",
          link: "https://kksan.top/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/小K同學.jpg?w=100",
          style: "color: #fff; background-color: #e5a5bc"
        },
        {
          id: "吃白饭的休伯利安号",
          link: "https://eatrice.top/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/吃白饭的休伯利安号.jpg?w=100",
          style: "color: #fff; background-color: #253d9d"
        },
        {
          id: "JimmyQin",
          link: "https://apde.xyz/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/JimmyQin.jpg?w=100",
          style: "color: #fff; background-color: #005240"
        },
        {
          id: "Sanarous",
          link: "https://bestzuo.cn/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/Sanarous.jpg?w=100",
          style: "color: #fff; background-color: #bb9c64"
        },
        {
          id: "keith",
          link: "https://keithqwq.com/",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/keith.jpg?w=100",
          style: "color: #fff; background-color: #565656"
        },
        {
          id: "Vince",
          link: "https://i.vince.pub",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/Vince.jpg?w=100",
          style: "color: #fff; background-color: #747273"
        },
        {
          id: "Hcode",
          link: "https://www.hcode.top",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/Hcode.jpg?w=100",
          style: "color: #fff; background-color: #117cb7"
        },
        {
          id: "饭庄",
          link: "https://fanfan.im",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/饭庄.jpg?w=100",
          style: "color: #fff; background-color: #a3110f"
        },
        {
          id: "泫",
          link: "https://blog.cugxuan.cn",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/泫.jpg?w=100",
          style: "color: #fff; background-color: #5aa979"
        },
        {
          id: "Flexiston",
          link: "https://www.flexiston.com",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/Flexiston.jpg?w=100",
          style: "color: #fff; background-color: #4b413f"
        },
        {
          id: "ChrAlpha",
          link: "https://ichr.me",
          avatar:
            "https://rmt.dogedoge.com/fetch/royce/storage/links/ChrAlpha.jpg?w=100",
          style: "color: #fff; background-color: #084267"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.friends-container {
  margin: 0 auto;
  max-width: 1080px;
  .friends-content {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
    border-radius: 5px;
    align-items: flex-start;
    line-height: 1.3;
    .friends-card {
      display: flex;
      padding: 8px;
      margin: 0 auto;
      margin-top: calc(2.25 * 16px + 32px);
      color: #444;
      background: #fff;
      justify-content: flex-start;
      align-content: flex-start;
      flex-direction: column;
      max-width: 16rem;
      width: calc(100% / 4 - 16px);
      text-decoration: none;
    }
    .friends-left {
      display: flex;
      align-self: center;
      .avatar {
        width: 64px;
        height: 64px;
        margin: 16px 8px 4px 8px;
        margin-top: calc(-1.25 * 16px - 32px);
        border-radius: 100%;
        border: 2px solid #fff;
        background: #fff;
      }
    }
    .friends-right {
      margin: 4px 8px;
      display: flex;
      flex-direction: column;
      text-align: center;
      p {
        text-align: center;
        margin: 0;
        &.friends-name {
          padding-top: 6px;
          padding-bottom: 4px;
          font-weight: bold;
        }
        &.tags {
          display: inline;
          background: none;
          word-wrap: break-word;
          padding-right: 4px;
        }
      }
      .friends-tags-wrapper {
        margin-left: -2px;
        word-break: break-all;
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .friends-container .friends-content .friends-card {
    width: calc(100% / 3 - 16px);
  }
}
@media screen and (max-width: 1080px) {
  .friends-container .friends-content .friends-card {
    width: calc(100% / 2 - 16px);
  }
}
@media screen and (max-width: 768px) {
  .friends-container .friends-content .friends-card {
    width: calc(100% / 1 - 16px);
  }
}
.note {
  margin: calc(var(--space) / 2) 0;
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
