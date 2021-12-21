<template>
    <v-alert
        :value="alert.message"
        type="alert.type"
        :append-icon="
            alert.type == 'success'
                ? 'mdi-check-circle-outline'
                : alert.type == 'error'
                    ? 'mdi-close-circle'
                    : alert.type == 'warning'
                        ? 'mdi-alert-octagon-outline'
                        : 'mdi-alert-circle-outline'
        "
        transition="expand-x-transition"
        dismissible
        @input="closeAlert"
    >
        {{ alert.message }}
    </v-alert>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  computed: {
    ...mapState({ alert: "Alert" }),
  },
  methods: {
    ...mapMutations({ setAlert: "Alert" }),
    closeAlert() {
        this.setAlert({})
    },
  },
}
</script>

<style scoped>
</style>
