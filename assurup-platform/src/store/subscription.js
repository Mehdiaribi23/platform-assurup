const subscriptionModule = {
  namespaced: true,
  state: () => ({
    selectedAssurances: "",
    activity: "",
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      revenue: "",
      address: "",
    },
  }),
  mutations: {
    updateSubscription(state, payload) {
      Object.assign(state, payload);
    },
    setSelectedAssurances(state, payload) {
      state.selectedAssurances = payload;
    },
    setActivity(state, payload) {
      state.activity = payload;
    },
    setPersonInfo(state, payload) {
      state.personalInfo.name = payload.name;
      state.personalInfo.email = payload.email;
      state.personalInfo.phone = payload.phone;
    },
    setRevenue(state, payload) {
      state.personalInfo.revenue = payload;
    },
    setAddress(state, payload) {
      state.personalInfo.address = payload;
    },
  },
  actions: {
    saveSubscription({ commit }, subscriptionData) {
      commit("updateSubscription", subscriptionData);
    },
    updateSelectedAssurances({ commit }, assurances) {
      commit("setSelectedAssurances", assurances);
    },
    updateActivity({ commit }, activity) {
      console.log("UPDATING :", activity);
      commit("setActivity", activity);
    },
    updatePersonalInfo({ commit }, personalInfo) {
      commit("setPersonalInfo", personalInfo);
    },
    updatePersonInfo({ commit }, { name, email, phone }) {
      commit("setPersonInfo", { name, email, phone });
    },

    updateCompanyInformation({ commit }, { revenue, address = false }) {
      commit("setRevenue", revenue);
      if (address) commit("setAddress", address);
    },
  },
  getters: {
    subscription(state) {
      return state;
    },
  },
};

export default subscriptionModule;
