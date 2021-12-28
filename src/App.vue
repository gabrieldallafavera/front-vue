<template>
    <v-app>
        <AppAlert />
        <AppLoading />

        <v-app-bar
            v-if="isAuthenticated"
            app
            flat
            class="white--text elevation-8">
            <v-spacer />
            <BarHeaderRight />
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import AppAlert from "@/components/AppAlert"
import AppLoading from "@/components/AppLoading"

import BarHeaderRight from "@/components/System/Bar/BarHeaderRight"

export default {
  name: "App",
  components: {
      AppAlert,
      AppLoading,
      BarHeaderRight,
  },
}
</script>
