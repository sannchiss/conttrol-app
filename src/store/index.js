import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

let db = new Localbase("db");

// desahabilitar resgistros en consola
db.config.debug = false

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: null,
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [
      /*  {
        id: 1,
        title: "Task 1",
        subtitle: "Allow notifications for task 1",
        done: false,
        dueDate: "2020-10-17",
      },
      {
        id: 2,
        title: "Task 2",
        subtitle: "Allow notifications for task 2",
        done: false,
        dueDate:"2020-10-18",
      },
      {
        id: 3,
        title: "Task 3",
        subtitle: "Allow notifications for task 3",
        done: false,
        dueDate: null
      }, */
    ],
    snackbar: {
      show: false,
      text: "",
      color: "",
    },

    sorting: false,
  },
  getters: {},
  mutations: {
    setSearch(state, search) {
      console.log("setSearch", search);
      state.search = search;
    },

    addTask(state, newTask) {
      state.tasks.push(newTask);
      this.newTaskTile = "";
    },
    // funcion para cambiar el estado de un registro cambiando el estado de "done"
    doneTask(state, id) {
      console.log("id: ", id);
      /* state.tasks.find((task) => task.id === id).done = !state.tasks.find(
        (task) => task.id === id
      ).done; */

      let task = state.tasks.filter((task) => task.id === id)[0]
      task.done = !task.done;
      

    },
    // funcion para eliminar registro
    deleteTask(state, id) {
      console.log("id delete: ", id);
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    // funcion para editar el registro
    updateTask(state, payload) {
      console.log("updateTask", payload);
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
      task.subtitle = payload.subtitle;
    },
    // funcion para cambiar fecha
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    // funcion mostrar lista
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    // funcion para mostrar snackbar con tiempo de duracion y texto
    showSnackbar(state, text, color) {
      let timeout = 0;

      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 100;
      }

      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
        state.snackbar.color = color;
      }, timeout);
    },
    // funcion para ocultar snackbar
    hideSnarkbar(state) {
      state.snackbar.show = false;
    },
    // funcion para ordenar lista solo cambia estado para mostrar el icono de ordenar
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
  },
  actions: {

    // funcion para añadir registro
    addTask({ commit }, newTaskTile) {
      let newTask = {
        id: Date.now(),
        title: newTaskTile,
        subtitle: "Allow notifications for task " + this.state.tasks.length + 1,
        done: false,
        dueDate: null,
      };
      //insert registro DB local
      db.collection("tasks")
        .add(newTask)
        .then(function () {
          console.log("Document successfully written!")

          commit("addTask", newTask)
          commit("showSnackbar", "Task added", "success")
        });
    },
    // Funcion que seleccionando el checkbox cambia el estado "done" por true o false
    doneTask({ state,commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0]
      db.collection("tasks").doc({id:id}).update({
        done: !task.done
      }).then(function () {
        console.log("Document successfully updated!")

      commit("doneTask", id);
      })

     
    },
    // Funcion para eliminar registro
    deleteTask({ commit }, id) {

      db.collection('tasks').doc({ id: id }).delete().then(function () {
        console.log("Document successfully deleted!")
        commit("deleteTask", id)
        commit("showSnackbar", "Task deleted")
      }).catch(function (error) {
        console.error("Error removing document: ", error)
      })

    },
    // funcion para editar registro y guardar en DB local
    updateTask({ commit }, payload) {
      console.log("updateTask", payload);
      db.collection("tasks").doc({id:payload.id}).update({
        title: payload.title,
        subtitle: payload.subtitle
      }).then(function () {
        console.log("Document successfully updated!")

      commit("updateTask", payload)
      commit("showSnackbar", "Task updated")
      })
    },
    // funcion para cambiar fecha y guardar en DB local
    updateTaskDueDate({ commit }, payload) {

      db.collection("tasks").doc({id:payload.id}).update({
        dueDate: payload.dueDate
      }).then(function () {
        console.log("Document successfully updated!")
      commit("updateTaskDueDate", payload)
      commit("showSnackbar", "Due Date updated")
      })
    },

    setTasks({ commit }, tasks) {
      db.collection('tasks')
        .set(tasks).then(function () {
          console.log("Document successfully written!")
          commit("setTasks", tasks)
      })
    },
    
    getTasks({ commit }) {
      db.collection("tasks")
        .get()
        .then((tasks) => {
          commit("setTasks", tasks)
        });
    }

    

  },
  getters: {
    taskFiltered(state) {
      if (state.search === null) {
        return state.tasks;
      } else {
        return state.tasks.filter((task) => {
          return task.title.toLowerCase().includes(state.search.toLowerCase());
        });
      }
    },
  },
  modules: {},
});
