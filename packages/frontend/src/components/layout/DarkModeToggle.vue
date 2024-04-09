<template>
  <v-btn-toggle class="h-50 mr-5 rounded-lg" mandatory v-model="darkMode">
    <v-btn class="custom-toggle-button" icon>
      <v-icon>mdi-white-balance-sunny</v-icon>
    </v-btn>

    <v-btn class="custom-toggle-button custom-moon" icon>
      <v-icon>mdi-moon-waxing-crescent</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const darkMode = ref(localStorage.getItem('darkMode') === 'true' ? 1 : 0)

onMounted(() => {
  if (
    localStorage.getItem('darkMode') === null &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    darkMode.value = 1
    return
  }
  theme.global.name.value = localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'
})

watch(darkMode, (value) => {
  theme.global.name.value = value ? 'dark' : 'light'
  localStorage.setItem('darkMode', value ? 'true' : 'false')
})
</script>
