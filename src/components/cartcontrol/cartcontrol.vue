<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
          console.log('this.food.count.init=' + this.food.count);
        } else {
          this.food.count++;
          // Vue.set(this.food, 'count', this.food.count++);
          console.log('this.food.count=' + this.food.count);
        }
        // 调用父组件的属性中add所对应的方法，后面为参数
        this.$emit('add', event.target);
      },
      decreaseCart() {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol {
    font-size 0
    .cart-decrease, .cart-add {
      display inline-block
      padding 6px
      transition all 0.4s linear
      &.move-transition {
        opacity 1
        transform translate3d(0, 0, 0)
      }
      .inner {
        display inline-block
        transition all 0.4s linear
        transform rotate(0)
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
      }
      &.move-enter, &.move-leave {
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner {
          transform rotate(180deg)
        }
      }
    }
    .cart-count {
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)

    }
    .cart-add {
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
    }
  }
</style>
