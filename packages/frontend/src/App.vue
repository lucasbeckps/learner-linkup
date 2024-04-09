<template>
  <v-app>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <RouterLink to="/" class="navlink">
          <v-list-item prepend-avatar="@/assets/logo-min.svg" title="Learner Linkup"></v-list-item>
        </RouterLink>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <RouterLink v-for="navlink in navigationItems" :to="navlink.to" class="navlink">
          <v-list-item
            :prepend-icon="navlink.icon"
            :title="navlink.title"
            :value="navlink.title"
            :active="$route.matched.some(({ name }) => name === navlink.title)"
          />
        </RouterLink>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div style="padding: 1rem 1.4rem">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { navigationItems } from '@frontend/plugins/router'
</script>

<style scoped>
.navlink {
  text-decoration: none;
  color: inherit;
}
</style>
