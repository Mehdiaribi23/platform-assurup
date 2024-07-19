<template>
  <aside class="w-64 p-8 space-y-4">
    <ol class="w-full space-y-4 gap-2">
      <button
        class="bg-gray-200 text-black rounded-full px-4 py-3 flex items-center w-32"
        @click="clickBack"
      >
        <i class="material-icons text-lg mr-2">arrow_back</i>
        Retour
      </button>

      <LinkContent
        v-for="(link, index) in links"
        :key="index"
        :title="link.name"
        :counter="link.order"
        :isCompleted="link.completed"
      />
    </ol>
  </aside>
</template>

<script>
import LinkContent from "./LinkContent.vue";

export default {
  name: "AppSidebar",
  components: {
    LinkContent,
  },
  computed: {
    links() {
      console.log(
        "this.$store.state.navigation.pageState",
        this.$store.state.navigation.pageState
      );
      return this.$store.state.navigation.pageState;
    },
  },
  methods: {
    clickBack() {
      this.$router.go(-1);
    },
  },
};
</script>
