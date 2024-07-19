<template>
  <div class="flex flex-col md:flex-row h-full p-4">
    <div class="flex flex-col flex-1">
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6"
      >
        <h1 class="text-3xl font-semibold mb-4 md:mb-0">
          Plus d'informations sur votre
          <span class="after_outlined">{{
            currentPage === "activite" ? "activité" : "identité"
          }}</span>
          ?
        </h1>
      </div>
      <div class="flex flex-wrap gap-4">
        <template v-if="currentPage === 'activite'">
          <div class="relative w-full">
            <input
              type="text"
              v-model="formattedRevenue"
              @input="updateRevenue"
              placeholder="Chiffre d'affaires annuel"
              class="pl-10 pr-5 py-5 border border-blue-300 w-full"
              style="border-radius: 25px"
            />
            <span class="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
               <i v-if="formattedRevenue" class="material-icons text-green">check_circle</i> 
               <i class="material-icons text-black">euro_symbol</i> 
            </span>
          </div>

          <div
            class="w-full flex flex-col md:flex-row gap-4"
            v-if="selectedAssurances === 'bureau_local'"
          >
            <input
              type="text"
              v-model="codePostal"
              @input="validatePostalCode"
              placeholder="Code Postal"
              class="px-5 py-5 border border-blue-300 rounded-xl flex-1"
            />
            <input
              type="text"
              v-model="adresse"
              placeholder="Adresse"
              class="px-5 py-5 border border-blue-300 rounded-xl flex-1"
            />
          </div>
        </template>
        <template v-else>
          <div class="w-full flex flex-col md:flex-row gap-4">
            <input
              type="text"
              v-model="personalInformation.name"
              placeholder="Nom"
              class="px-5 py-5 border border-blue-300 rounded-xl flex-1"
            />
            <input
              type="text"
              v-model="personalInformation.firstName"
              placeholder="Prénom"
              class="px-5 py-5 border border-blue-300 rounded-xl flex-1"
            />
          </div>
          <div class="w-full flex flex-col md:flex-row gap-4">
            <input
              type="email"
              v-model="personalInformation.email"
              placeholder="Email"
              class="px-5 py-5 border border-blue-300 rounded-xl flex-1"
            />
            <input
              type="tel"
              v-model="personalInformation.phone"
              placeholder="Téléphone"
              class="px-5 py-5 border border-blue-300 rounded-xl flex-1"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="mt-4 md:mt-0 md:ml-4 w-full md:w-24 lg:w-36 flex justify-end items-start">

     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-auto flex justify-center items-center"
        @click="clickContinue"
        v-if="canGoNextStep"
      >
        Continuer
        <i class="material-icons text-lg ml-2">arrow_forward</i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "ActivitePage",
  data() {
    return {
      selectedCompany: null,
      items: [],
      loading: false,
      revenue: "", // Raw revenue value
      codePostal: "",
      adresse: "",
      currentPage: "activite", // societe, personnel
      personalInformation: {
        name: "",
        firstName: "",
        email: "",
        phone: "",
      },
    };
  },
  watch: {
    $route() {
      this.currentPage = "activite";
      this.revenue = this.selectedRevenu;
      this.codePostal = this.selectedAddress.split(",")[1];
      this.adresse = this.selectedAddress.split(",")[0];
      this.personalInformation.name = this.selectedName;
      this.personalInformation.firstName = this.selectedFirstName;
      this.personalInformation.email = this.selectedEmail;
    },
  },
  computed: {
    ...mapState("subscription", ["selectedAssurances"]),
    formattedRevenue: {
      get() {
        return this.formatNumber(this.revenue);
      },
      set(value) {
        this.revenue = value.replace(/\s/g, "");
      },
    },
    companies() {
      console.log(
        "this.$store.state.data.companies",
        this.$store.state.data.companies
      );
      return this.$store.state.data.companies;
    },
    canGoNextStep() {
      if (this.currentPage === "activite") {
        if (this.selectedAssurances === "bureau_local") {
          return this.revenue && this.codePostal && this.adresse;
        }
        return this.revenue;
      } else {
        const { name, firstName, email, phone } = this.personalInformation;
        return name && firstName && email && phone;
      }
    },
    selectedRevenu() {
      return this.$store.state.subscription.personalInfo.revenue;
    },
    selectedAddress() {
      return this.$store.state.subscription.personalInfo.address;
    },
    selectedName() {
      return this.$store.state.subscription.personalInfo?.name.split(" ")[0];
    },
    selectedFirstName() {
      return this.$store.state.subscription.personalInfo?.name.split(" ")[1];
    },
    selectedEmail() {
      return this.$store.state.subscription.personalInfo?.email;
    },
  },
  methods: {
    formatNumber(value) {
      if (!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    updateRevenue(event) {
      let value = event.target.value;
      value = value.replace(/[^\d\s]/g, ""); // Allow only digits and spaces
      this.revenue = value.replace(/\s/g, ""); // Remove spaces for internal state
    },
    validatePostalCode(event) {
      let value = event.target.value;
      value = value.replace(/[^\d]/g, ""); // Allow only digits
      this.codePostal = value;
    },
    async fetchCompanies(search) {
      if (search) {
        this.loading = true;
        try {
          const response = await axios.get(
            `https://annuaire-entreprises.data.gouv.fr/donnees/api-entreprises?q=${search}`
          );
          this.items = response.data.etablissement;
        } catch (error) {
          console.error("Error fetching companies:", error);
        } finally {
          this.loading = false;
        }
      } else {
        this.items = [];
      }
    },
    clickContinue() {
      if (this.currentPage === "activite") {
        this.$store.dispatch("subscription/updateCompanyInformation", {
          revenue: this.revenue,
          address: `${this.adresse}, ${this.codePostal}`,
        });
        this.$store.dispatch("navigation/completePage", "activity");
        this.currentPage = "personnel";
      } else {
        console.log("HIT");
        this.$store.dispatch("subscription/updatePersonInfo", {
          name:
            this.personalInformation.name +
            " " +
            this.personalInformation.firstName,
          email: this.personalInformation.email,
          phone: this.personalInformation.phone,
        });
        this.$store.dispatch("navigation/completePage", "information");
        this.$router.push("/summary");
      }
    },
  },
};
</script>
