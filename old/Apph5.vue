<template>
  <div id="apph5" class="wrapper">
    <router-view/>
  </div>
</template>

<script>

import {IS_HOME} from 'store/types';
import store from 'store/index'
import {commRequest} from 'lib/Service'

export default {
  name: 'Apph5',
  data (){
      return {
        isHome:true
      }
  },
  components:{

  },
    methods:{

    },
  mounted(){
        let that = this;


  },

}
</script>

<style scoped>

body {
    background-color: #f7f7f7;
    font-family: Microsoft YaHei;
    overflow-x: hidden
}

</style>
