<template>
  <div class="pl-10 pr-10">
    <v-img style="height: 200px; margin: 3rem 0 1rem 0" src="@frontend/assets/scene.svg" />
    <p class="text-h4 text-center">Ninguém por aqui!</p>
    <template v-if="!lastLoadedSearch.length">
      <p class="mt-2 mb-4 text-center">
        Parece que ainda não há alunos cadastrados. Que tal adicionar um?
      </p>
      <v-col class="d-flex justify-center mb-16">
        <v-btn @click="openRegisterModal('new')" color="secondary" border elevation="0">
          Adicionar aluno
        </v-btn>
      </v-col>
    </template>
    <p v-else class="mt-2 mb-4 text-center mb-16">
      Não encontramos nenhum aluno pesquisando pelo termo "{{ lastLoadedSearch }}".
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps(['openRegisterModal', 'lastLoadedSearch'])
</script>
