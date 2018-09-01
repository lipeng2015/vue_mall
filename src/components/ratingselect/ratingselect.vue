<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="count">{{positive.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="count">{{negative.length}}</span></span>
    </div>
    <div @click="toggleContent(onlyContent)" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    name: 'ratingselect',
    methods: {
      select(type) {
        // 注释掉 是因为通过父组件来改变属性值，然后相应的改变子组件的属性，就可以避免直接子组件修改父组件的属性问题
        // this.selectType = type;
        this.$emit('changeType', type);
      },
      toggleContent(onlyContent) {
        // 通知父组件去改变属性，而不是子组件直接修改
        this.$emit('toggleContent', onlyContent);
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratingselect {
    .rating-type {
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block {
        display inline-block
        padding 8px 12px
        border-radius 1px
        margin-right 8px
        font-size 12px
        line-height 16px
        color rgb(77, 85, 93)
        &.active {
          color #fff
        }
        .count {
          margin-left 2px
          font-size 8px
        }
        &.positive {
          background rgba(0, 160, 220, 0.2)
          &.active {
            background rgb(0, 160, 220)
          }
        }
        &.negative {
          background rgba(77, 85, 93, 0.2)
          &.active {
            background rgb(77, 85, 93)
          }
        }
      }
    }
    .switch {
      padding 12px 18px
      line-height 24px
      font-size 24px
      font-size 24px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 159)
      font-size 0
      &.on {
        .icon-check_circle {
          color #00c850
        }
      }
      .icon-check_circle {
        font-size 20px
      }
      .text {
        display inline-block
        vertical-align top
        font-size 12px
        margin-left 2px
        margin-top -1px
      }
    }
  }

</style>
