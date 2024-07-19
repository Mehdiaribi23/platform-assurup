<template>
     <div class="flex flex-col h-full">
          <Topbar />
          <div class="flex-1 flex flex-col md:flex-row overflow-auto">
               <Sidebar class="hidden md:block w-full md:w-1/4 lg:w-1/5" />
               <div class="p-4 flex-1 overflow-auto">
                    <slot></slot>
               </div>
          </div>
     </div>
</template>

<script>
import Sidebar from './AppSidebar.vue';
import Topbar from './AppTopbar.vue';

export default {
     name: 'NavigationContainer',
     components: {
          Topbar,
          Sidebar,
     },
     computed: {
          subscriptionInfo() {
               return this.$store.state.subscription
          }
     }
};
</script>