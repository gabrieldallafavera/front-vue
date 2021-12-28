<template>
    <div
        v-if="loading.show"
        class="centralizado">
        <v-progress-circular
            :size="70"
            indeterminate
            color="indigo darken-2"/>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "AppLoading",
  computed: {
    ...mapState({ loading: "Loading" }),
  },
}
</script>

<style scoped>
.centralizado {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
</style>