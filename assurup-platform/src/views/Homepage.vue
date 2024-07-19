<template>
     <div class="flex flex-col md:flex-row h-full p-4">
          <div class="flex flex-col flex-1">
               <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-semibold">Quelles sont les
                         <span class="after_outlined">assurances</span> qui vous intéressent ?
                    </h1>
               </div>
               <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <AssuranceCard v-for="card in cards" :key="card.value" :title="card.title" :subtitle="card.subtitle"
                         :text="card.text" :value="card.value" :selectedCards="selectedCards"
                         @click="selectCard(card.value)" />
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
import AssuranceCard from "@/components/cards/AssuranceCard.vue";

export default {
     name: 'HomePage',
     components: {
          AssuranceCard,
     },
     mounted() {
          this.selectedCards = this.selectedAssurances;
     },
     watch: {
          $route() {
               this.selectedCards = this.selectedAssurances;
          }

     },

     data() {
          return {
               selectedCards: "",
          };
     },
     computed: {
          cards() {
               return this.$store.state.data.assurances
          },
          selectedAssurances() {
               return this.$store.state.subscription.selectedAssurances;
          },

     },
     methods: {
          selectCard(value) {
               this.selectedCards = value;
          },
          clickContinue() {
               this.$store.dispatch('subscription/updateSelectedAssurances', this.selectedCards);
               this.$store.dispatch('navigation/completePage', 'home');
               this.$router.push("/company");
          }


     },
};
</script>
