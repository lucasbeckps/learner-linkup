<template>
  <v-app-bar color="teal-darken-4">
    <template v-slot:image>
      <v-img gradient="to right, rgba(19,84,122,.8), rgba(0,160,166,.8)"></v-img>
    </template>

    <RouterLink to="/" class="header-logo navlink">
      <v-list-item class="custom-logo" prepend-avatar="@/assets/logo-min.svg" />
      <p class="custom-title d-none d-sm-flex">Learner Linkup</p>
    </RouterLink>

    <v-spacer></v-spacer>

    <v-menu v-if="isAuthenticated && user">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="pr-2 pl-2 mr-2 rounded-lg">
          <span class="pr-3">{{ user.name }}</span>
          <v-icon style="font-size: 2rem">mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-btn class="w-100" prepend-icon="mdi-logout" flat @click="logout">Logout</v-btn>
      </v-list>
    </v-menu>

    <dark-mode-toggle />
  </v-app-bar>

  <template v-if="isAuthenticated">
    <v-navigation-drawer
      class="custom-navigation-drawer"
      @mouseenter="isDrawerOpen = true"
      @mouseleave="isDrawerOpen = false"
      expand-on-hover
      rail
    >
      <v-list density="compact" nav>
        <v-list-item class="text-grey" style="height: 10px; min-height: 20px">
          <span v-if="isDrawerOpen" class="text-no-wrap" style="font-size: 0.8rem"
            >Módulo Acadêmico</span
          >
          <v-icon v-else size="24" class="d-block">mdi-minus</v-icon>
        </v-list-item>
        <RouterLink v-for="navlink in navigationItems" :to="navlink.to" class="navlink">
          <v-list-item
            :prepend-icon="navlink.icon"
            :title="navlink.title"
            :value="navlink.title"
            :active="$route.matched.some(({ path }) => path === navlink.to)"
          />
        </RouterLink>
      </v-list>
    </v-navigation-drawer>

    <v-bottom-navigation class="d-lg-none">
      <RouterLink
        v-for="navlink in navigationItems"
        :to="navlink.to"
        :class="`navlink bottom-navlink ${$route.matched.some(({ path }) => path === navlink.to) ? 'active' : ''}`"
      >
        <v-icon>{{ navlink.icon }}</v-icon>
        <span>{{ navlink.title }}</span>
      </RouterLink>
    </v-bottom-navigation>
  </template>
</template>

<script setup lang="ts">
import { navigationItems } from '@frontend/plugins/router'
import DarkModeToggle from '@frontend/components/layout/DarkModeToggle.vue'
import useDebouncedRef from '@frontend/utils/debounceRef'
import { computed } from 'vue'
import { isAuthTokenValid } from '@frontend/utils/auth'

const isDrawerOpen = useDebouncedRef(false, 50)

const isAuthenticated = computed(() => {
  return isAuthTokenValid()
})

async function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  location.href = '/'
}

const user = computed(() => {
  return JSON.parse(localStorage.getItem('user'))
})
</script>

<style lang="scss">
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

  i {
    font-size: 1.5rem;
  }
  span {
    margin-top: 2px;
  }
  &.active {
    background-color: rgba(var(--v-theme-on-surface), 0.1);
  }
}

.header-logo {
  display: flex;

  .custom-logo {
    padding: 0 0 0 0.5rem;
  }
  .custom-title {
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 3rem;
  }
}

.custom-toggle-button {
  font-size: 0.7rem;
  color: #777777;
  width: 34px !important;

  i {
    transition: all ease-in-out 0.2s;
    transform: rotate(140deg);
  }
  span {
    margin-top: -2px;
    height: calc(100% + 2px);
  }
  &.v-btn--active {
    color: inherit;
  }
  &.v-btn--active i {
    transform: rotate(45deg) translateX(1px) translateY(1px);
  }
}

.custom-moon.v-btn--active i {
  transform: rotate(45deg) translateX(-2px) translateY(2px);
}
</style>
