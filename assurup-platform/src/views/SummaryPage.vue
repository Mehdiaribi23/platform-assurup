<template>
     <div class="flex flex-col md:flex-row h-full p-4">
          <div class="flex flex-col flex-1">
               <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-semibold">
                         Votre <span class="after_outlined">recapitulatif</span> custom ?
                    </h1>
               </div>
               <div class="flex flex-col items-start space-y-4">
                    <div class="w-full p-4 border rounded-lg shadow-md">
                         <h2 class="text-xl font-semibold">Assurances Sélectionnées</h2>
                         <p>{{ subscription.selectedAssurances == 'rc_pro' ? 'RC Pro' : 'Bureau Local' }}</p>
                    </div>
                    <div class="w-full p-4 border rounded-lg shadow-md">
                         <h2 class="text-xl font-semibold">Activité Principale</h2>
                         <p>Siret : {{ subscription.activity || "Non spécifié" }}</p>
                    </div>
                    <div class="w-full p-4 border rounded-lg shadow-md">
                         <h2 class="text-xl font-semibold">Informations Personnelles</h2>
                         <p><strong>Nom:</strong> {{ subscription.personalInfo.name || "Non spécifié" }}</p>
                         <p><strong>Email:</strong> {{ subscription.personalInfo.email || "Non spécifié" }}</p>
                         <p><strong>Téléphone:</strong> {{ subscription.personalInfo.phone || "Non spécifié" }}</p>
                         <p><strong>Revenue:</strong> {{ subscription.personalInfo.revenue || "Non spécifié" }}</p>
                         <p v-if="subscription.selectedAssurances == 'bureau_local'"><strong>Adresse:</strong> {{
                              subscription.personalInfo.address || "Non spécifié" }}</p>
                    </div>
               </div>
          </div>
          <div class="mt-4 md:mt-0 md:ml-4 w-full md:w-24 lg:w-36 flex justify-end items-start">
               <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-auto flex justify-center items-center"
               @click="clickContinue">
                    Continuer
               <i class="material-icons text-lg ml-2">arrow_forward</i>
     
               </button>
          </div>
     </div>
</template>

<script>
import axios from 'axios';

export default {
     name: 'SummaryPage',
     data() {
          return {
               selectedCompany: null,
               items: [],
               loading: false,
          };
     },
     computed: {
          subscription() {
               return this.$store.state.subscription;
          },
     },
     mounted () {
        this.$store.dispatch('navigation/completePage', 'summary');
     },
     methods: {
          async fetchCompanies(search) {
               if (search) {
                    this.loading = true;
                    try {
                         const response = await axios.get(
                              `https://annuaire-entreprises.data.gouv.fr/donnees/api-entreprises?q=${search}`
                         );
                         this.items = response.data.etablissement;
                    } catch (error) {
                         console.error('Error fetching companies:', error);
                    } finally {
                         this.loading = false;
                    }
               } else {
                    this.items = [];
               }
          },
          async clickContinue() {
               await this.$store.dispatch('data/saveInformation', this.subscription);
               this.$router.push("/");
          }
     },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
