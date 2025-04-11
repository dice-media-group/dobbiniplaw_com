// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faCopyright, faGlobe, faEarthAmericas } from '@fortawesome/free-solid-svg-icons'

// Changed to true - we'll manage the CSS directly in the plugin
config.autoAddCss = true

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faGear, faCopyright, faGlobe, faEarthAmericas)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
