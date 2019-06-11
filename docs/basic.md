基本用法

```vue
<template>
  <div class="demo-scroll">
    <v-scroll :url="url">
      <div slot-scope="scope">
        <div class="data-item" :key="i" v-for="(item,i) in scope.list">{{i}}</div>
      </div>
    </v-scroll>
  </div>
</template>

<script>
  export default {
    name: 'demoScroll',
    data() {
      return {
        url: 'http://39.98.50.163:3000/mock/885/ly-cdp-wy-activity-center/api/v1/memberActivities/mine'
      }
    },
    mounted() {
    },
    methods: {
      // 模拟数据请求
      getData() {
        return new Promise(resolve => {
          setTimeout(() => {
            const arr = []
            for (let i = 0; i < 10; i++) {
              arr.push(count++)
            }
            resolve(arr)
          }, 1000)
        })
      }
    }
  }
</script>

<style>
  .demo-scroll{
    position: relative;
    height: 500px;
  }
  .data-item {
    height: 80px;
    border-bottom: 1px solid cornflowerblue;
  }
</style>
```