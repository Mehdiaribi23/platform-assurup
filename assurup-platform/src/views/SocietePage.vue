<template>
     <div class="flex flex-col md:flex-row h-full p-4">
          <div class="flex flex-col flex-1">
               <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-semibold">
                         Quel est le nom de votre
                         <span class="after_outlined">entreprise</span> ?
                    </h1>
               </div>
               <div class="flex flex-start items-start">
                    <v-autocomplete v-model="selectedCompany" :items="companies"
                         :item-title="item => item.nom_raison_sociale" :item-value="item => item.siret" class="w-full"
                         density="comfortable" placeholder="Search for a company" theme="light"
                         variant="solo"></v-autocomplete>
               </div>
          </div>
          <div class="mt-4 md:mt-0 md:ml-4 w-full md:w-24 lg:w-36 flex justify-end items-start">
               <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-auto flex justify-center items-center"
               @click="clickContinue" v-if="selectedCompany">
                    Continuer
               <i class="material-icons text-lg ml-2">arrow_forward</i>
     
               </button>
          </div>
     </div>
</template>

<script>

export default {
     name: 'SocietePage',
     data() {
          return {
               selectedCompany: null,
          };
     },
     watch: {
          $route() {
               this.selectedCompany = this.selectedCompanyStore
          }
     },
     computed: {
          selectedAssurances() {
               return this.$store.state.subscription.selectedAssurances;
          },
          selectedCompanyStore() {
               return this.$store.state.subscription.activity;
          },

          navigationInfo() {
               return this.$store.state.navigation
          },
          companies() {
               console.log('this.$store.state.data.companies', this.$store.state.data.companies);
               return this.$store.state.data.companies;
          }


     },
     methods: {

          clickContinue() {
               this.$store.dispatch('subscription/updateActivity', this.selectedCompany);
               this.$store.dispatch('navigation/completePage', 'activity');
               this.$router.push("/activity");
          },
     },
};
</script>
