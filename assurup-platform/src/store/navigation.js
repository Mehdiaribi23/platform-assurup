const navigationModule = {
  namespaced: true,
  state: () => ({
    currentPage: "home",
    pageOrder: ["home", "activity", "information", "summary"],
    pageState: {
      home: {
        completed: false,
        name: "Assurances",
        order: 1,
      },
      activity: {
        completed: false,
        name: "Activité",
        order: 2,
      },
      information: {
        completed: false,
        name: "Informations",
        order: 3,
      },
      summary: {
        completed: false,
        name: "Récapitulatif",
        order: 4,
      },
    },
  }),
  mutations: {
    markPageComplete(state, page) {
      if (state.pageState[page]) {
        state.pageState[page].completed = true;
      }
    },
    setCurrentPage(state, page) {
      if (state.pageOrder.includes(page)) {
        state.currentPage = page;
      }
    },
  },
  actions: {
    completePage({ commit }, page) {
      console.log("completing page", page);
      commit("markPageComplete", page);
    },
    setCurrentPage({ commit }, page) {
      commit("setCurrentPage", page);
    },
  },
  getters: {
    currentPage(state) {
      return state.currentPage;
    },
    pageState(state) {
      return state.pageState;
    },
    isPageCompleted: (state) => (page) => {
      return state.pageState[page]?.completed;
    },
  },
};

export default navigationModule;
