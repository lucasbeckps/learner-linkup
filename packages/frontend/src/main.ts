/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { registerPlugins } from '@frontend/plugins'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
