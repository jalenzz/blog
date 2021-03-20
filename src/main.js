// Import main css
import "~/assets/style/index.styl";

// × Import default layout so we don't need to import it to every page
// ! Use default App.vue to force reload each component on new blog page, or else $route.path
// ! will not reflect correctly. See: https://github.com/gridsome/gridsome/issues/835
// import DefaultLayout from '~/layouts/Default.vue'

// Pagination
import { Pager } from "gridsome";

// Icons by font awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faRss,
  faDog,
  faHome,
  faHeart,
  faSubway,
  faRocket,
  faIdBadge,
  faArchive,
  faArrowUp,
  faPenSquare,
  faAngleRight,
  faUserFriends,
  faCaretSquareUp,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(
  faRss,
  faDog,
  faHome,
  faHeart,
  faSubway,
  faRocket,
  faGithub,
  faIdBadge,
  faArchive,
  faArrowUp,
  faPenSquare,
  faAngleRight,
  faUserFriends,
  faCaretSquareUp,
  faAngleDoubleRight
);

// back to top
import VueScrollTo from "vue-scrollto";

// Tooltip popovers
import VTooltip from "v-tooltip";

// HTTP API
import axios from "axios";

// NProgress
import NProgress from "nprogress";

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: "zh-Hans" };
  NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

  // Set default layout as a global component
  // Vue.component('Layout', DefaultLayout)
  Vue.component("Pager", Pager);
  Vue.component("font-awesome", FontAwesomeIcon);

  Vue.prototype.$http = axios;

  // back to top
  Vue.use(VueScrollTo, {
    container: "body",
    duration: 1000,
    easing: "ease-in-out",
    offset: 0,
    force: true,
    cancelable: true,
    x: false,
    y: true,
  });

  // Popover tooltips
  Vue.use(VTooltip);

  router.beforeEach((to, from, next) => {
    if (from.name !== null) {
      NProgress.start();
    }
    next();
  });
  router.afterEach((to, from) => {
    NProgress.done();
  });
}
