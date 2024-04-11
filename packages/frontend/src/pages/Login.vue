<template>
  <v-row class="login-wrapper">
    <v-card elevation="3" class="rounded-lg login-card ma-auto">
      <v-toolbar dark color="secondary">
        <template v-slot:image>
          <v-img gradient="to right, rgba(19,84,122,.8), rgba(0,160,166,.8)"></v-img>
        </template>
        <v-toolbar-title>{{ isRegister ? 'Criar uma conta' : 'Login' }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form
          v-model="isValid"
          ref="form"
          @submit.prevent="isValid && (isRegister ? register() : login())"
        >
          <v-text-field
            v-if="isRegister"
            v-model="name"
            name="name"
            label="Nome"
            type="text"
            required
            :rules="nameRules"
          ></v-text-field>

          <v-text-field
            v-model="email"
            name="email"
            label="E-mail"
            type="text"
            required
            :rules="emailRules"
          ></v-text-field>

          <v-text-field
            v-if="isRegister"
            v-model="password"
            name="password"
            label="Senha"
            type="password"
            required
            :rules="registerPasswordRules"
          ></v-text-field>

          <v-text-field
            v-else
            v-model="password"
            name="password"
            label="Senha"
            type="password"
            required
            :rules="passwordRules"
          ></v-text-field>

          <v-text-field
            v-if="isRegister"
            v-model="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirmação de senha"
            type="password"
            required
            :rules="passwordConfirmationRules"
          ></v-text-field>

          <v-row>
            <v-col>
              <v-btn
                class="pa-0 text-decoration-underline no-capitalize"
                flat
                @click="isRegister = !isRegister"
              >
                {{ isRegister ? 'Já possui uma conta?' : 'Não possui uma conta?' }}
              </v-btn>
            </v-col>
            <v-col cols="12" xs="12" sm="auto" md="auto">
              <v-btn class="w-100" type="submit" color="secondary" value="log in">{{
                isRegister ? 'Cadastrar' : 'Entrar'
              }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@frontend/services/api'
import { useToast } from 'vue-toast-notification'
import {
  fieldIsEmail,
  fieldIsStrongPassword,
  fieldMaxLength,
  fieldRequired
} from '@frontend/utils/formValidation'

const $toast = useToast()

const isRegister = ref(false)
const isValid = ref(false)

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const nameRules = [fieldRequired('Nome'), fieldMaxLength('Nome', 80)]
const emailRules = [fieldRequired('E-mail'), fieldMaxLength('E-mail', 80), fieldIsEmail('E-mail')]
const passwordRules = [fieldRequired('Senha'), fieldMaxLength('Senha', 50)]
const registerPasswordRules = [...passwordRules, fieldIsStrongPassword('Senha')]
const passwordConfirmationRules = [
  (value: string) => value === password.value || 'As senhas não coincidem'
]

async function loadAuthToken() {
  const { data } = await api.post('/auth/login', {
    email: email.value,
    password: password.value
  })

  localStorage.setItem('token', data.access_token)
}

async function login() {
  try {
    await loadAuthToken()
    location.href = '/'
  } catch (err) {
    if (err.response?.status === 401) {
      $toast.error('E-mail ou senha inválidos')
    } else {
      $toast.error('Erro ao fazer login')
    }
  }
}

async function register() {
  try {
    await api.post('/user/create', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    await loadAuthToken()
    location.href = '/'
  } catch (err) {
    if (Array.isArray(err?.response?.data?.message)) {
      err.response.data.message.forEach((message: string) => $toast.error(message))
    } else {
      $toast.error('Erro ao fazer cadastro')
    }
  }
}
</script>

<style>
.login-wrapper {
  height: calc(100vh - 8rem);
  padding-top: 3rem;
}
.login-card {
  width: 100%;
  max-width: 500px;
  height: fit-content;
}
.login-card button {
  min-width: 120px;
}
.no-capitalize {
  text-transform: none;
}
</style>
