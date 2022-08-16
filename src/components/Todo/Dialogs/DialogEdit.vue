<template>

    <v-dialog :value="true" persistent max-width="290">
        <v-card>
            <v-card-title class="text-h5">
                Edit Task
            </v-card-title>
            <v-card-text>Edit the title of this task
                <v-text-field v-model="newTask.title" label="Title" required clearable outlined dense class="mt-2">
                </v-text-field>

                <v-text-field v-model="newTask.subtitle" label="Subtitle" required clearable outlined dense
                    class="mt-2"></v-text-field>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="$emit('close')">
                    No
                </v-btn>
                <v-btn color="red darken-1" text @click="saveTask" :disabled="taskTitleInvalid">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
export default {
    props: [
        'task',
    ],
    data() {
        return {
            newTask: {
                title: "",
                subtitle: "",
                done: false,
                id: 0,
            },
        }
    },

    computed: {

        taskTitleInvalid() {

            return (!this.newTask.title || this.newTask.title === this.task.title)
                && (!this.newTask.subtitle || this.newTask.subtitle === this.task.subtitle);
        },

    },
    methods: {

        saveTask() {

            if (!this.taskTitleInvalid) {
                let payload = {
                    id: this.task.id,
                    title: this.newTask.title,
                    subtitle: this.newTask.subtitle,
                }

                this.$store.dispatch("updateTask", payload);
                this.$emit('close');

                this.$vuetify.goTo(0, { duration: 0 })


            }


        },
    },

    mounted() {
        this.newTask.title = this.task.title;
        this.newTask.subtitle = this.task.subtitle;
    },

}
</script>

<style>
</style>