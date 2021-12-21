<template>
    <v-app id="app">
        <img src="./assets/logo.png">

        <div v-if="isAuthenticated">
            <v-app-bar
                app
                flat
                class="white--text elevation-8">
                <v-spacer />
                <BarHeaderRight />
            </v-app-bar>
        </div>

        <router-view/>
    </v-app>
</template>

<script>
import BarHeaderRight from "@/components/System/Bar/BarHeaderRight"

export default {
    name: "App",
    components: {
        BarHeaderRight,
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>