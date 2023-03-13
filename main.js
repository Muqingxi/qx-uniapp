import App from './App'
import { createSSRApp } from 'vue'
import { myRequest } from './util/api.js'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$request = myRequest
  return {
    app
  }
}