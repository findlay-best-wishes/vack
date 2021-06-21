import App from './App.vue';
import {createApp} from 'vue';

document.title = require("../package.json")["name"];
createApp(App).mount('#app')