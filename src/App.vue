<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--能在组件切换过程中将状态保留在内存中，防止重复渲染DOM-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import header from './components/header/header';
  import {urlParse} from './common/js/utils';

  export default {
    name: 'App',
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {
          // 自执行的方法
          id: (() => {
            // 去中间的参数
            let queryParam = urlParse();
            console.log(queryParam);
            return queryParam.id;
          })()
        }
      }
        ;
    },
    created() {
      console.log('router==' + this.$route.query.id);
      this.$http.get('/h5Api/seller').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          // 对seller对象进行扩展，此seller就包含id属性
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    /*border-bottom: 1px solid rgba(7,17,27,0.1);*/
    border-1px(rgba(7, 17, 27, 0.1))
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
  }

  /*router-link指向a标签*/
  .tab .tab-item a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  /*.tab .tab-item a .active{*/
  /*color: rgb(240,20,20);*/
  /*}*/
  .tab .tab-item a.active {
    color: rgb(240, 20, 20);
  }
</style>
