import { createStore } from "vuex";
import navigationModule from "./navigation";
import subscriptionModule from "./subscription";
import dataModule from "./data";

export default createStore({
  modules: {
    navigation: navigationModule,
    subscription: subscriptionModule,
    data: dataModule,
  },
});
