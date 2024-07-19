<template>
  <div id="app">
    <NavigationContainer>
      <router-view></router-view>
    </NavigationContainer>
  </div>
</template>

<script>
import NavigationContainer from './components/navigation/NavigationContainer.vue';

export default {
  name: 'App',
  components: {
    NavigationContainer,
  },
  mounted() {
    this.$store.dispatch('data/fetchAssurances');
    this.$store.dispatch('data/fetchCompanies');
  },
};
</script>

<style></style>