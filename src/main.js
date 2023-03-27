import { createApp } from "vue";
import router from "./router/router";
import store from "./store/";
import { routerMode } from "./config/env";
import "./config/rem";
import App from "./App.vue";

const app = createApp(App).use(store).use(router).mount("#app");
