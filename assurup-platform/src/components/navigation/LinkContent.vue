<template>
     <li class="flex items-center space-x-2.5 p-2">
          <span :class="{ 'bg-blue-600 dark:bg-blue-500 text-white': isCompleted }"
               class="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500  text-blue-600 dark:text-blue-500">
               {{ counter }}
          </span>
          <span :class="{ 'text-gray-600 dark:text-gray-500 text-xs': isCompleted }">
               <p class="text-sm">{{ subtitle }} {{ counter }}</p>
               <h3 class="font-medium leading-tight">
                    {{ title }}
               </h3>
          </span>
     </li>

</template>
<script>
export default {
     name: 'AppSidebar',
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
          counter: {
               type: Number,
               default: 0,
          },
          isCompleted: {
               type: Boolean,
               default: false,
          }
     },
};
</script>
