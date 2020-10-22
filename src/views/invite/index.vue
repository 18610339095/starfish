<!-- 邀请好友 -->
<template>
  <div class="invite">
    <div class="header"></div>
    <div class="main">
      <div class="main-cent">
        <h2>立即邀请</h2>
        <ul class="cent-list">
          <li>
            <span class="icon"><img src="../../images/innvite/share-icon.png"
                   width="100%"
                   alt=""></span>
            <span class="text">发送邀请给好友</span>
            <span class="border"></span>
          </li>
          <li>
            <span class="icon"><img src="../../images/innvite/friend-icon.png"
                   width="100%"
                   alt=""></span>
            <span class="text">好友注册并交易</span>
            <span class="border"></span>
          </li>
          <li>
            <span class="icon"><img src="../../images/innvite/money-icon.png"
                   width="100%"
                   alt=""></span>
            <span class="text">获得相应比例奖励</span>
          </li>
        </ul>
        <div class="cent-code">
          <h2>我的邀请码</h2>
          <div class="my-code"
               id="copys"
               ref="copy"
               data-clipboard-action="copy"
               data-clipboard-target="#copys"
               @click="copyLink">{{listDatas1.InviteCode || ''}}</div>
        </div>
        <div class="cent-nums">
          <div class="num-m">
            <p>邀请人数</p>
            <p class="num">{{listDatas1.InviteCnt || 0}}</p>
          </div>
          <div class="num-m">
            <p>当前返佣比例：</p>
            <p class="num">{{listDatas1.InviteRatio || 0}}</p>
          </div>
        </div>
      </div>
      <div class="main-list">
        <ul class="list-tab">
          <li @click="typeTab(0)"
              :class="typeId ==0 ? 'on':''"><span>邀请记录</span></li>
          <li @click="typeTab(1)"
              :class="typeId ==1 ? 'on':''"><span>返佣记录</span></li>
        </ul>
        <div v-if="typeId == 0 && listDatas1.data">
          <ul class="list-m">
            <li class="list-tit">
              <span>被邀请人</span>
              <span>邀请时间</span>
            </li>
            <li  v-for="item in listDatas1.data.list">
              <span>{{item.PhoneCode || ''}}</span>
              <span>{{item.InviteDate || ''}}</span>
            </li>
          </ul>
        </div>
        <div v-if="typeId == 1 && listDatas2.length>0">
          <ul class="list-m">
            <li class="list-tit">
              <span>被邀请人</span>
              <span>返佣时间</span>
              <span>返佣奖励</span>
            </li>
            <li v-for="list in listDatas2">
              <span>{{list.PhoneCode || ''}}</span>
              <span>{{list.PrizeDate || ''}}</span>
              <span>{{list.PrizeAmount || 0}} {{list.CoinType || ''}}</span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Qrcode from 'vue-qrcode';
import  {myInviteList, myInvitePrizeList} from  'lib/Service';
export default {
  data () {
    return {
      typeId: 0,
      copyBtn: null,
      listDatas1:{},
      listDatas2: [],
    };
  },

  components: {},

  computed: {},

  mounted () {
    this.copyBtn = new this.clipboard(this.$refs.copy);
    this.gitInfoList();
  },

  methods: {
    gitInfoList() {
      myInviteList().then(res => {
        this.listDatas1 = res
        console.log(res.data,'list');
      }),
      myInvitePrizeList().then(res => {
         console.log(res.data,'list2');
        this.listDatas2 = res.data.list || [];
        
      })
    },
    typeTab (id) {
      this.typeId = id;
    },
    copyLink () {
      let _this = this;
      let clipboard = _this.copyBtn;
      clipboard.on('success', function () {
        _this.$message({
          message: _this.$t('succeeded'),
          type: 'success'
        });
      });
      clipboard.on('error', function () {
        _this.$message({
          message: _this.$t('copy failed'),
          type: 'error'
        });
      });
    },
  }
}

</script>
<style lang="less" scoped>
.invite {
  width: 100%;
  .header {
    width: 100%;
    height: 350px;
    background: url("~@/images/innvite/invire-banner.png") center no-repeat;
    background-size: cover;
  }
  .main {
    margin: 0 auto;
    .main-cent {
      width: 1137px;
      padding: 49px 0 40px 40px;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      margin: -90px auto 0;
      h2 {
        font-size: 28px;
        font-weight: bold;
        font-family: PingFang SC;
        color: #172147;
        margin-bottom: 32px;
      }
      .cent-list {
        display: flex;
        li {
          display: flex;
          align-items: center;
          margin-right: 30px;
          span {
            display: inline-block;
          }
          .icon {
            width: 50px;
            height: 50px;
          }
          .text {
            font-size: 14px;
            color: #8597af;
            margin-left: 20px;
            margin-right: 28px;
          }
          .border {
            width: 50px;
            border: 1px dashed #8597af;
          }
        }
        li:nth-child(2) {
          .border {
            width: 131px;
            border: 1px dashed #8597af;
          }
        }
      }
      .cent-code {
        margin-top: 60px;
        margin-bottom: 30px;
        .my-code {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: normal;
          color: #172147;
        }
        .my-code::after {
          content: "";
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../../images/innvite/copy-icon.png") no-repeat;
          background-size: cover;
          margin-left: 15px;
        }
      }
      .cent-nums {
        width: 660px;
        height: 100px;
        background: #f7f7fb;
        border-radius: 10px;
        margin-top: 77px;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        .num-m {
          flex: 1;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999;
          .num {
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333;
            margin-top: 20px;
          }
        }
        .num-m:first-child {
          border-right: 1px solid #c3cdd3;
          margin-right: 20px;
        }
      }
    }
    .main-list {
      margin: 20px auto;
      width: 1137px;
      height: 330px;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      .list-tab {
        height: 60px;
        width: 100%;
        border-bottom: 1px solid #ededed;
        display: flex;
        padding-left: 40px;
        li {
          padding: 29px 49px 14px 0px;
          cursor: pointer;
          span {
            padding-bottom: 7px;
            color: #172147;
            font-size: 16px;
          }
        }
        li.on span {
          border-bottom: 2px solid #3187ff;
          color: #3187ff;
        }
      }
      .list-m {
        padding: 12px 40px;
        height: 270px;
        overflow-y: scroll;
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 16px;
          color: #172147;
        }
        .list-tit {
          color: #45638b;
        }
      }
    }
  }
}
</style>