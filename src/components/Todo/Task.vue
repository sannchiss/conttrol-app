<template>
  <div>
    <v-list-item 
    @click="$store.dispatch('doneTask', task.id)" 
    :class="{ 'blue lighten-5': task.done }" 
    class="white"
    :ripple="false"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
            {{ task.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ task.subtitle }}
          </v-list-item-subtitle>
        </v-list-item-content>  

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon>mdi-calendar</v-icon>
            {{ task.dueDate | formatDate }}
          </v-list-item-action-text>
        </v-list-item-action> 

        <v-list-item-action>
          <task-menu :task="task" />
        </v-list-item-action>


        <v-list-item-action
        v-if="$store.state.sorting"
        >
          <v-btn 
          color="primary" 
          icon           
          class="handle"
          
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>



      </template>
    </v-list-item>

    <v-divider></v-divider>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  filters: {
    formatDate(value) {
      console.log(value);
      //add day to date
      let date = new Date(value);
      date.setDate(date.getDate() + 1);
      return format(date, "dd/MM/yyyy");

    },
  },
  components: {
    "task-menu": require("@/components/Todo/TaskMenu.vue").default,
  },
};
</script>

<style lang="sass">
  .sortable-ghost 
      opacity: 0
  .sortable-drag
      cursor: move
      box-shadow: 0 0 10px rgba(0,0,0,0.3)
  
</style>