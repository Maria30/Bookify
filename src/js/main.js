import '../style/main.css'

import { createApp } from 'vue'
import App from '../App.vue'
import { switchPage } from './switchPage'
import { checkPage } from './checkPage';

if (checkPage("")) {
  switchPage('home');
}

createApp(App).mount('#app')