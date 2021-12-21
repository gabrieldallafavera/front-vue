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
                            <h4>REDEFINIR SENHA</h4>
                            <v-form>
                                <v-text-field
                                    v-model="form.email"
                                    label="E-mail"
                                    :rules="emailRules"
                                    :error-messages="errors.email"
                                    outlined
                                    required
                                    class="my-3"/>
                                <v-text-field
                                    v-model="form.password"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                    :rules="passwordRules"
                                    :error-messages="errors.password"
                                    label="Senha"
                                    min="8"
                                    counter
                                    outlined
                                    required
                                    @keyup="loginKeyUp"
                                    @click:append="showPassword = !showPassword"/>
                                <v-text-field
                                    v-model="form.password_confirmation"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                    :rules="passwordRules"
                                    :error-messages="errors.password"
                                    label="Confirmar Senha"
                                    min="8"
                                    counter
                                    outlined
                                    required
                                    @keyup="loginKeyUp"
                                    @click:append="showPassword = !showPassword"/>
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
                                <v-icon left> mdi-logout-variant </v-icon>
                                Logar
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
import { reset } from "@/services/AuthService"

export default {
    name: "Reset",
    data () {
        return {
            form: {
                email: "",
                password: "",
                password_confirmation: "",
            },
            token: this.$route.params.token,
            errors: {
                email: null,
                password: null,
                errors: null,
            },
            showPassword: false,
            passwordRules: [
                (v) => !!v || "Senha obrigatório",
                (v) => (v && v.length >= 6) || "Senha requer 6 caracteres",
            ],
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
                if (this.form.password == this.form.password_confirmation) {
                    await reset(this.token, this.form)
                    this.showMessage("Senha redefinida com sucesso!", "success")
                    this.$router.push({ name: "Login" })
                } else {
                    this.errors.password = "As senhas não batem"
                }
            } catch ({ response }) {
                if (response.data.errors) {
                    this.showMessage("Erro ao redefinir a senha!", "Error")
                } else {
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
