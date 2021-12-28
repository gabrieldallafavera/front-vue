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
                            <h4>LOGAR</h4>
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
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                type="button"
                                outlined
                                :loading="false"
                                color="primary"
                                :to="{ name: 'register' }">
                                Registrar
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
                            <v-btn
                                :loading="false"
                                plain
                                type="button"
                                color="primary"
                                class="text-decoration-none pa-1"
                                :to="{ name: 'forgot' }">
                                Esqueceu a senha
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

export default {
    name: "Login",
    data () {
        return {
            form: {
                email: "",
                password: "",
            },
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
        ...mapActions({
            login: "Auth/login",
            showAlert: "Alert/showAlert",
        }),
        showMessage(message, type) {
            this.showAlert({
                message,
                type,
            })
        },
        async enviar () {
            try {
                this.isLoading = true
                await this.login(this.form.email, this.form.password)
                this.$router.push({ name: "", params: {} })
            } catch ({ response }) {
                if (response.data.errors) {
                    this.showMessage("Erro ao realizar o login!", "error")
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
