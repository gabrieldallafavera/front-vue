<template>
    <v-app>
        <v-container
            v-show="!isLoadingPage"
            class="fill-height"
            fluid>
            <v-row
                align="center"
                justify="center">
                <v-col
                    cols="12"
                    sm="8"
                    md="6"
                    lg="4">
                    <v-card class="elevation-8">
                        <v-card-title class="elevation-4 pa-0 overflow-hidden">
                            <v-img :src="require('@/assets/')"/>
                        </v-card-title>
                        <v-card-text>
                            <h4>RECUPERAR SENHA</h4>
                            <v-form>
                                <v-text-field
                                    v-model="form.email"
                                    label="E-mail"
                                    :rules="emailRules"
                                    :error-messages="errors.email"
                                    outlined
                                    required
                                    class="my-3"/>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                type="button"
                                outlined
                                :loading="false"
                                color="primary"
                                :to="{ name: 'login' }">
                                <v-icon left> mdi-arrow-left </v-icon>
                                Voltar
                            </v-btn>
                            <v-spacer/>
                            <v-btn
                                class="d-flex justify-center"
                                type="submit"
                                outlined
                                :loading="isLoading"
                                color="primary"
                                @click="enviar">
                                <v-icon left> mdi-email-outline </v-icon>
                                Enviar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { mapActions } from "vuex"
import { forgot } from "@/services/AuthService"

export default {
    name: "Forgot",
    data () {
        return {
            form: {
                email: "",
            },
            errors: {
                email: null,
            },
            emailRules: [
                (v) => !!v || "E-mail obrigatório",
                (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
            ],
            isLoading: false,
        }
    },
    methods: {
        ...mapActions({ showAlert: "Alert/showAlert" }),
        showMessage(message, type) {
            this.showAlert({
                message,
                type,
            })
        },
        async enviar () {
            try {
                this.isLoading = true
                await forgot(this.form.email)
                this.showMessage("E-mail enviado com sucesso!", "success")
                this.$router.push({ name: "Login" })
            } catch ({ response }) {
                if (response.data.errors) {
                    this.showMessage("Erro ao enviar o e-mail!", "error")
                } else {
                    this.errors.name = response.data.message
                    this.errors.email = response.data.message
                    this.errors.password = response.data.message
                }
            } finally {
                this.isLoading = false
            }
        },
    },
}
</script>

<style scoped>

</style>