<template>

  <v-text-field v-model="newTaskTile" 
  @keyup.enter="addTask" 
  class="field-add-task pa-3" 
  outlined
  label="Add Task" hide-details clearable>

    <template v-slot:append>
      <v-icon
        @click="addTask"
        :disabled="newTaskTileInvalid"
        >
        mdi-plus
        </v-icon>
    </template>


  </v-text-field>


</template>

<script>
export default {

  data() {
    return {
      newTaskTile: "",
    };
  },
  computed:{

    newTaskTileInvalid() {
      return !this.newTaskTile;
    },

  },
  methods: {
    
    addTask() {
      if(!this.newTaskTileInvalid){

      this.$store.dispatch("addTask", this.newTaskTile)
      this.newTaskTile = "";

    }
      
    },

  },

}
</script>

<style lang="sass">

.field-add-task.v-input--is-focused
  .v-input__slot
    background: black !important
</style>