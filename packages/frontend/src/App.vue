<template>
  <v-app>
    <System />
    <v-main>
      <div style="padding: 1rem 1.4rem">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import 'vue-toast-notification/dist/theme-sugar.css'
import './global.css'
import System from '@frontend/components/layout/System.vue'
</script>
