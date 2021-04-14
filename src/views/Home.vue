<template>
    <HelloWorld/>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  beforeCreate: function(){
    fetch(this.$store.state.apiUrl + '/user', {
      method:'GET'
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.error(error))
  }
}
</script>
