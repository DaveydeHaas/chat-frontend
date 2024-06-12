<template>
    <div>
      <b-table
        :items="items"
        :fields="fields"
        v-model:sort-by="sortBy"
        v-model:sort-desc="sortDesc"
        responsive="sm"
      ></b-table>
  
      <div>
        Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define reactive data properties
  const sortBy = ref('title');
  const sortDesc = ref(false);
  
  // Define fields and items
  const fields = [
    { key: 'title', sortable: true },
    { key: 'members', sortable: true },
  ];
  
  const items = ref([
    { isActive: true, members: 40, title: 'DickersonMacdonald' },
    { isActive: false, members: 21, title: 'LarsenShaw' },
    { isActive: false, members: 89, title: 'GenevaWilson' },
    { isActive: true, members: 38, title: 'JamiCarney' }
  ]);
  </script>