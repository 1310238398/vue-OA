import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@vant/touch-emulator';

import {
  Button,
  Toast,
  List,
  Cell,
  NavBar,
  Grid,
  GridItem,
  Search,
  Panel,
  Icon,
  Field,
  Picker,
  Popup,
  CellGroup,
  Dialog,
  NumberKeyboard,
  RadioGroup,
  Radio
} from 'vant';

Vue.use(Button)
  .use(Toast)
  .use(List)
  .use(Cell)
  .use(NavBar)
  .use(Grid)
  .use(GridItem)
  .use(Search)
  .use(Panel)
  .use(Icon)
  .use(Field)
  .use(Picker)
  .use(Popup)
  .use(CellGroup)
  .use(Dialog)
  .use(NumberKeyboard)
  .use(RadioGroup)
  .use(Radio);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
