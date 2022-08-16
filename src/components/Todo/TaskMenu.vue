<template>
    <div>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="handlerClick(index)">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <dialog-delete v-if="dialogs.delete" :task="task" @close="dialogs.delete = false" />
        <dialog-due-date v-if="dialogs.dueDate" :task="task" @close="dialogs.dueDate = false" />
        <dialog-edit v-if="dialogs.edit" :task="task" @close="dialogs.edit = false" />



    </div>

</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        dialogs: {
            delete: false,
            dueDate: false,
            edit: false,
        },
        items: [{
            title: "Edit",
            icon: "mdi-pencil",
            click() {
                console.log("Edit");
                this.dialogs.edit = true;
            }
        },
        {
            title: "Due date",
            icon: "mdi-calendar-clock",
            click() {
                console.log("Due date");
                this.dialogs.dueDate = true;
            }
        },
        {
            title: "Delete",
            icon: "mdi-delete",
            click() {
                this.dialogs.delete = true
            }
        },
        {
            title: "Sort",
            icon: "mdi-drag-horizontal-variant",
            click() {

            if(!this.$store.state.search){
                this.$store.commit("toggleSorting");
            }
            else{

                this.$store.commit("showSnackbar", 
                    "You can't sort while searching"
                    
                )

            }

            }
        },
        ],
    }),

    methods: {
        handlerClick(index) {
            this.items[index].click.call(this)
        },


    },

    components: {
        'dialog-delete': require('@/components/Todo/Dialogs/DialogDelete.vue').default,
        'dialog-due-date': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
        'dialog-edit': require('@/components/Todo/Dialogs/DialogEdit.vue').default,

    },
};
</script>

<style>
</style>
