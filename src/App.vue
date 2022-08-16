<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">

      <v-img src="fedex-logo.png" max-height="50" max-width="200">
      </v-img>

      <v-container>
        <v-row>

          <v-col cols="4" sm="4" md="1">

            <v-avatar class="ml-0" size="48">
              <img src="https://i.pravatar.cc/300" alt="Sannchiss">
            </v-avatar>

          </v-col>

          <v-col>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="ml-5 text-subtitle-2 text-decoration-underline font-weight-bold">Nombre Avatar</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>


        </v-row>
      </v-container>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
    app 
    color="indigo darken-2" 
    prominent 
    :height="$route.path === '/list' ? '230' : '200'" 
    dark>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title class="text-h4">
            {{ $store.state.appTitle }}
          </v-app-bar-title>
          <v-spacer></v-spacer>
          <search />
        </v-row>

        <v-row>

          <live-date-time />

        </v-row>

        <v-row v-if="$route.path === '/list'" >

          <field-add-task />

        </v-row>

      </v-container>

    </v-app-bar>



    <v-main>
      <!--  -->

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
        <snackbar />
      </v-container>



    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      { title: 'Company GTS', icon: 'mdi-view-dashboard', to: '/company' },
      { title: 'Users', icon: 'mdi-account-group', to: '' },
      { title: 'Roles', icon: 'mdi-account-star', to: '' },
      { title: 'Permissions', icon: 'mdi-account-star-outline', to: '' },
      { title: 'Logout', icon: 'mdi-logout', to: '' },
      { title: 'List', icon: 'mdi-information', to: '/list' }

    ],
    right: null,
  }),
  mounted() {
    console.log(this.$route)
    this.$store.dispatch('getTasks')

  },
  computed: {

      appTitle() {
        return process.env.VUE_APP_TITLE;
      }

  },
  components: {
    'search': require('@/components/Tools/Search.vue').default,
    'live-date-time': require('@/components/Todo/LiveDate.vue').default,
    'field-add-task': require("@/components/Todo/FieldAddTask.vue").default,
    'snackbar': require('@/components/Shared/Snackbar.vue').default

  }
}
</script>

<style lang="sass">
.header-container 
  max-width: none !important

</style>