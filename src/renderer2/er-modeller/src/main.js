import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueKonva from 'vue-konva'
import './assets/css/Global.scss'
import './assets/css/OpenSans.scss'
import './assets/css/Panel.scss'
import konvaHelper from './mixins/konvaHelper'
import konvaStyles from './mixins/konvaStyles'
import arranger from './mixins/arranger';
import Konva from 'konva'
import Arranger from './Utils/Arranger/Arranger';

Vue.use(VueKonva)
Vue.config.productionTip = false

Vue.mixin(konvaStyles)
Vue.mixin(konvaHelper)
Vue.mixin(arranger)

Konva

let anim = new Konva.Animation(() => {
  Arranger.tick()
})

anim.start()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
