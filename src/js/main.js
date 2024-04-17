import '../style/main.css'

import { createApp } from 'vue'
import App from '../App.vue'

createApp(App).mount('#app')

// sessionStorage.setItem('actif', 'home')

export function getCover(book_cover) {
  return 'https://covers.openlibrary.org/b/id/'+ book_cover +'-L.jpg'; 
}