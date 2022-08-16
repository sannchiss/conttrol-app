<template>

<v-btn
@click="$store.commit('toggleSorting')"
class="button-done-sorting"
color="primary"
>
    Done sorting
</v-btn>
  
</template>

<script>
export default {

}
</script>

<style lang="sass">
    .button-done-sorting
        margin-top: 20px
        position: fixed
        bottom: 20px
        left: 50%
        transform: translateX(-50%)
     

</style>