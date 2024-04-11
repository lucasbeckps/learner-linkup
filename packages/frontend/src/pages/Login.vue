<template>
  <v-row class="login-wrapper">
    <v-card elevation="3" class="rounded-lg login-card ma-auto">
      <v-toolbar dark color="secondary">
        <template v-slot:image>
          <v-img gradient="to right, rgba(19,84,122,.8), rgba(0,160,166,.8)"></v-img>
        </template>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <form ref="form" @submit.prevent="login()">
          <v-text-field
            v-model="email"
            name="email"
            label="E-mail"
            type="text"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            name="password"
            label="Senha"
            type="password"
            required
          ></v-text-field>
          <v-row>
            <v-spacer cols="12" />
            <v-col cols="12" xs="12" sm="auto" md="auto">
              <v-btn class="w-100" type="submit" color="secondary" value="log in">Login</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@frontend/services/api'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const email = ref('')
const password = ref('')

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
    if (Array.isArray(err?.response?.data?.message)) {
      err.response.data.message.forEach((message: string) => $toast.error(message))
    } else {
      $toast.error('Erro ao fazer login')
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
</style>
