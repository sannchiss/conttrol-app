<template>

    <div class="text-subtitle-1 ml-12 mt-4">
       {{ date }}
    </div>

</template>

<script>

import { format } from "date-fns";

export default {

    data() {
        return {
            date: '',
        };
    
    },
    methods: {
        getDate() {
            // get date and time format
            let date = new Date();
            this.date = format(date, "EEEE dd 'de' MMMM 'de' yyyy 'a las' HH:mm:ss a")
            setTimeout(() => {
                this.getDate();
            }, 1000);

        }
    },
    mounted() {
        this.getDate();
    }  

}
</script>

<style>
</style>