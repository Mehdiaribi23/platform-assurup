import axiosInstance from "@/utils/axiosInstance";

const dataModule = {
  namespaced: true,
  state: () => ({
    assurances: [],
    companies: [],
  }),
  mutations: {
    setAssurancesData(state, payload) {
      state.assurances = payload;
    },
    setCompaniesData(state, payload) {
      state.companies = payload;
    },
  },
  actions: {
    async fetchAssurances({ commit }) {
      try {
        const response = await axiosInstance.get("/data/assurances");
        commit("setAssurancesData", response.data);
      } catch (error) {
        console.error("Error fetching assurances:", error);
      }
    },
    async fetchCompanies({ commit }) {
      try {
        const response = await axiosInstance.get("/data/companies");
        commit("setCompaniesData", response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    saveInformation(information) {
      return new Promise((resolve, reject) => {
        axiosInstance
          .post("/data/save", information)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.error("Error saving information:", error);
            reject();
          });
      });
    },
  },
  getters: {
    assurances(state) {
      return state.assurances;
    },
  },
};

export default dataModule;
