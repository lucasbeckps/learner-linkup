<template>
  <v-app>
    <v-app-bar color="teal-darken-4">
      <template v-slot:image>
        <v-img gradient="to right, rgba(19,84,122,.8), rgba(0,160,166,.8)"></v-img>
      </template>

      <RouterLink to="/" class="navlink">
        <v-list-item
          class="custom-logo-list-item"
          prepend-avatar="@/assets/logo-min.svg"
          title="Learner Linkup"
        ></v-list-item>
      </RouterLink>

      <v-spacer></v-spacer>

      <v-btn>
        <span class="pr-3">Lucas Beck</span>
        <v-icon style="font-size: 2rem">mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer class="custom-navigation-drawer" expand-on-hover rail>
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

    <v-bottom-navigation class="d-lg-none">
      <RouterLink
        v-for="navlink in navigationItems"
        :to="navlink.to"
        :class="`navlink bottom-navlink ${$route.matched.some(({ name }) => name === navlink.title) ? 'active' : ''}`"
      >
        <v-icon>{{ navlink.icon }}</v-icon>
        <span>{{ navlink.title }}</span>
      </RouterLink>
    </v-bottom-navigation>

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

<style>
.navlink {
  text-decoration: none;
  color: inherit;
}
.bottom-navlink {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.2rem;
  font-size: 0.8rem;
  //color: var(--v-theme-surface);
}
.bottom-navlink i {
  font-size: 1.5rem;
}
.bottom-navlink span {
  margin-top: 2px;
}
.bottom-navlink.active {
  background-color: #ffffff0f;
}
.custom-logo-list-item {
  padding: 0 0.5rem !important;
}
.custom-logo-list-item .v-list-item-title {
  font-weight: 300;
  font-size: 1.5rem;
}
</style>
