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
                        <v-card-title class="elevation-4">
                            <!-- <v-img :src="require('@/assets/')"/> -->
                        </v-card-title>
                        <v-card-text class="py-4">
                            <h4>REGISTRAR</h4>
                            <v-form>
                                <v-text-field
                                    v-model="form.name"
                                    label="Nome"
                                    outlined
                                    required
                                    class="my-3"/>
                                <v-text-field
                                    v-model="form.email"
                                    label="E-mail"
                                    :rules="emailRules"
                                    :error-messages="errors.email"
                                    outlined
                                    required/>
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
                                <v-icon left> mdi-content-save-outline </v-icon>
                                Gravar
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
import { register } from "@/services/AuthService"

export default {
    name: "Register",
    data () {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            errors: {
                name: null,
                email: null,
                password: null,
                errors: null,
            },
            showPassword: false,
            passwordRules: [
                (v) => !!v || "Senha obrigatória",
                (v) => (v && v.length >= 8) || "Senha requer 8 caracteres",
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
                    await register(this.form)
                    this.showMessage("Cadastro realizado com sucesso!", "success")
                    this.$router.push({ name: "login" })
                } else {
                    this.errors.password = "As senhas não batem"
                }
            } catch ({ response }) {
                if (response.data.errors) {
                    this.showMessage("Erro ao realizar o cadastro!", "error")
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
