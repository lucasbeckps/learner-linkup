/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastPlugin from 'vue-toast-notification'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(VueQueryPlugin)
  app.use(ToastPlugin)
  app.use(vuetify)
  app.use(router)
}
