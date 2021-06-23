<template class="app">
  <greeting></greeting>
</template>

<script>
import greeting from './components/greeting.vue';
export default {
  components: { greeting }
};
</script>

<style scope>
* {
  margin: 0;
  padding: 0;
}
.app {
  width: 100%;
  position: relative;
}
</style>
