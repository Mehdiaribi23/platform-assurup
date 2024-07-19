<template>
     <div class="flex flex-col shadow rounded-lg p-6 flex-wrap assurance_card hover:bg-blue-100 hover:border-blue-500 transition cursor-pointer"
          :class="isSelected ? 'border-2 border-blue-500 bg-blue-100 rounded-xl ' : ''" @click="cardClick">
          <h3 class="text-xl font-semibold min-h-10">{{ title }}</h3>
          <span class="text-sm h-10">
               <strong>{{ subtitle }}</strong>
          </span>
          <p class="text-sm h-24">{{ text }}</p>
          <div class="flex flex-row justify-end mt-auto">
               <button class="w-12 h-12 flex justify-center items-center rounded-full text-white bg-blue-500"
                    v-if="isSelected">
                    <i class="material-icons text-lg">check</i>
               </button>
               <button class="w-12 h-12 flex justify-center items-center rounded-full text-blue-500 bg-gray-100" v-else>
                    <i class="material-icons text-lg">add</i>
               </button>
          </div>
     </div>
</template>

<script>
export default {
     name: 'AssuranceCard',
     props: {
          title: {
               type: String,
               default: 'Assurances',
               required: true,
          },
          subtitle: {
               type: String,
               default: 'Étape',
          },
          text: {
               type: String,
               default: 'Quelles sont les assurances qui vous intéressent ?',
          },
          selectedCards: {
               type: Array,
               default: () => [],
          },
          value: {
               type: String,
               default: 'Assurance',
          },
          click: {
               type: Function,
               default: () => { },
          }
     },
     computed: {
          isSelected() {
               return this.selectedCards === this.value;
          }
     },
     methods: {
          cardClick() {
               this.click(this.value);
          }
     }
};
</script>