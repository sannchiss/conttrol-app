<template>
  <v-text-field
  :value="$store.state.search"
  @input="$store.commit('setSearch', $event)"
  @focus="searchClose = false"
  @blur="searchClose = true"
  :disabled="$store.state.sorting"
  class="expanding-search mt-2"
  :class="{ 'closed': searchClose && !$store.state.search }"
  placeholder="Search" 
  filled 
  clearable
  prepend-inner-icon="mdi-magnify">
  </v-text-field>
</template>

<script>
export default {

data() {
  return {
    searchClose: true,
  }
},


};
</script>

<style lang="sass">
.expanding-search
  transition: all 0.3s ease-in-out
  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
  &.closed
    max-width: 45px
    .v-input__slot
      background: transparent !important
   
</style>



