<template>
    <v-snackbar
        v-model="snackbar.show"
        top>
        <b class="text-uppercase">
            {{ snackbar.message }}
        </b>
        <template #action="{ attrs }">
            <v-btn
                text
                v-bind="attrs"
                color="pink"
                @click="closeSnackbar()">
                fechar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
    name: "AppSnackbar",
    computed: {
        ...mapState({ snackbar: "Snackbar" }),
    },
    methods: {
        ...mapMutations({ setSnackbar: "Snackbar" }),
        closeSnackbar() {
            this.setSnackbar({})
        },
    },
}
</script>

<style scoped>
</style>