<template>
  <div>
    <!-- <span id="sitename"></span> -->
    <g-link class="logo" to="/">
      <span class="logo__text">
        &#9650; &nbsp; {{ $static.metadata.siteName }}
      </span>
    </g-link>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
#sitename {
  margin-right: 1.2em;
}

.logo {
  text-decoration: none;
  color: var(--body-color) !important;
  font-size: 0.9em;
  box-shadow: inset 0 -6px 0 rgba(26, 188, 156, 0.3);
  transition-duration: 0.3s;

  &:hover {
    box-shadow: inset 0 -20px 0 rgba(26, 188, 156, 0.3);
  }

  &__image {
    vertical-align: middle;
    border-radius: 99px;
    height: 40px;
    width: 40px;
    margin-right: 0.5em;
  }
}
</style>
