基本用法

```vue
<template>
  <div>
    <div class="selects">
      <button class="selects-item" @click="changUrl(1)">changUrl1</button>
      <button class="selects-item" @click="changUrl(2)">changUrl2</button>
    </div>
    
    <div class="demo-scroll">
      <v-scroll :url="url">
        <div slot-scope="scope">
          <div class="data-item" :key="i" v-for="(item,i) in scope.list">{{i}}</div>
        </div>
      </v-scroll>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'demoScroll',
    data() {
      return {
        url: 'http://39.98.50.163:3000/mock/885/ly-cdp-wy-activity-center/api/v1/memberActivities/mine_1560251455498',
        url1: 'http://39.98.50.163:3000/mock/885/ly-cdp-wy-activity-center/api/v1/memberActivities/mine_1560251455498',
        url2: 'http://39.98.50.163:3000/mock/885/ly-cdp-wy-activity-center/api/v1/memberActivities/mine'
      }
    },
    mounted() {
    },
    methods: {
      changUrl(i){
        this.url = i == 1 ? this.url1 : this.url2
      }
    }
  }
</script>

<style>
  .selects {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .selects-item {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .demo-scroll{
    position: relative;
    height: 500px;
    background-color: #f5f5f5;
  }
  .data-item {
    height: 80px;
    border-bottom: 1px solid cornflowerblue;
  }
</style>
```