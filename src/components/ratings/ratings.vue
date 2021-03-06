<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"
                    @changeType="changeType" @toggleContent="toggleContent"></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="ratings && ratings.length">
          <li v-for="rating in ratings" :key="rating.id" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recomment" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" :key="item.id" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll';
  export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    filters: {
      formDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star, split, ratingselect
    },
    data() {
      return {
        ratings: [],
        selectType: 2,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('/h5Api/ratings').then((response) => {
        response = response.body;

        if (response.errno === 0) {
          this.ratings = response.data;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
    },
    methods: {
      changeType(type) {
        this.selectType = type;
      },
      toggleContent(isContent) {
        // 直接取反
        this.onlyContent = !isContent;
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === 2) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .ratings {
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .ratings-content {
      .overview {
        display flex
        padding 18px 0
        .overview-left {
          flex 0 0 137px
          width 137px
          border-right 1px solid rgba(7, 17, 27, 0.1)
          text-align center
          padding-bottom 6px
          .score {
            line-height 28px
            font-size 24px
            color rgb(255, 153, 0)
            margin-bottom 6px
          }
          .title {
            line-height 12px
            font-size 12px
            color rgb(7, 17, 27)
            margin-bottom 8px
          }
          .rank {
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          }
          @media only screen and (max-width 320px) {
            flex 0 0 120px
            width 120px
          }
        }
        .overview-right {
          flex 1
          padding 0px 0 6px 24px
          @media only screen and (max-width 320px) {
            padding-left 6px
          }
          .score-wrapper {
            line-height 18px
            margin-bottom 8px
            font-size 0
            .title {
              font-size 12px
              color rgb(7, 17, 27)
              display inline-block
              line-height 18px
            }
            .star {
              display inline-block
              margin 0 12px
              vertical-align top
            }
            .score {
              display inline-block
              vertical-align top
              font-size 12px
              color rgb(255, 153, 0)
              line-height 18px
            }
          }
          .delivery-wrapper {
            line-height 18px
            margin-bottom 6px
            font-size 0
            .title {
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            }
            .delivery {
              margin-left 12px
              font-size 12px
              color rgb(147, 153, 159)
            }
          }
        }
      }
      .rating-wrapper{
        padding 0 18px
        .rating-item{
          display flex
          padding 18px 0
          border-1px(rgba(7,17,27,0.1))
          .avatar{
            flex 0 0 28px
            width 28px
            margin-right 12px
            img{
              border-radius 50%
            }
          }
          .content{
            position relative
            flex 1
            .name{
              line-height 12px
              font-size 10px
              color rgb(7,17,27)
              margin-bottom 4px
            }
            .star-wrapper{
              margin-bottom 6px
              font-size 0
              .star{
                display inline-block
                margin-right 6px
                vertical-align top
              }
              .delivery{
                display inline-block
                vertical-align top
                color rgb(147,153,159)
                line-height 12px
                font-size 10px
              }
            }
            .text{
              line-height 18px
              color rgb(7,17,27)
              font-size 12px
              margin-bottom 8px

            }
            .recomment{
              font-size 0
              line-height 16px
              font-size 9px
              .icon-thumb_up,.item{
                display inline-block
                margin 0 8px 4px 0
                font-size 9px
              }
              .icon-thumb_up{
                color rgb(0,160,220)
              }
              .item{
                padding 0px 6px
                border 1px solid rgba(7,17,27,0.1)
                border-radius 1px
                color rgb(147,153,159)
                background #fff
              }
            }
            .time{
              position absolute
              top 0
              right 0
              line-height 12px
              font-size 10px
              color rgb(147,153,159)
            }
          }
        }
      }
    }
  }

</style>
