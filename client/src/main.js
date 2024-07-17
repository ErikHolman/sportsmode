import { createApp } from 'vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  HiSolidPlusCircle,
  HiSolidMinusCircle,
  HiSolidXCircle,
} from 'oh-vue-icons/icons';
import './style.css';
import App from './App.vue';

addIcons(HiSolidMinusCircle, HiSolidPlusCircle, HiSolidXCircle);

const app = createApp(App);
app.component('v-icon', OhVueIcon);
app.mount('#app');
