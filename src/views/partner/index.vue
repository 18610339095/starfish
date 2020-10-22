<!-- 合伙人 -->
<template>
  <div class="partner">
    <div class="header"></div>
    <div class="main">
      <div class="main-cent">
        <div class="cent-l">
          <h2 class="cent-tit">超级合伙人</h2>
          <div class="cent-m">
            <p>1、推荐超级合伙人奖励10%USDT即800枚（仅限上线前）每推荐一名超级合伙人穿透释放1%即1000STS（上线前）上线后推荐穿透释放0.5%即500STS。 2、推荐上币可获得分配费用的50%分成，例如：上币费BTC*4，总拨出奖励为2个BTC，那么50%就获得1个BTC奖励。 3、直接推荐会员交易手续费12%等值的STS挖矿奖励，另按交易手续费的10%等值STS进行穿透释放。 4、注册会员解锁释放规则：注册会员实名认证后，首次交易即视为有效会员，解锁释放持币总量的0.02%。</p>
          </div>
        </div>
        <div class="cent-r">
           <h2 class="cent-tit">VIP至尊会员</h2>
            <div class="cent-m">
              <p>可在海星平台申请成为VIP至尊会员，选择抵押1000枚STS即可生效，享受抵押期间交易费手续费30%减免优惠，并享受推荐会员首日（24小时）成交手续费100%的奖励。</p>
              <div class="cent-but" :class="infoData.ApplyZZStatus != 1 ? 'disab-but':''" @click="applyFn">立即申请</div>
            </div>
        </div>
      </div>
      <div class="main-status">
        <div class="status-l">
          <p class="tab">我的身份</p>
          <p class="name">{{UserLevel[infoData.UserLevel || 0]}}</p>
        </div>
        <div class="status-r">
          <ul class="lists">
            <li>
              <p class="tab">STS总持仓</p>
              <p class="numbs">{{infoData.STS || 0}}</p>
            </li>
            <li>
              <p class="tab">STS当前锁仓</p>
              <p class="numbs">{{infoData.LockSTS || 0}}</p>
              <div v-if="infoData.UnlockSTSStatus != 1" @click="unlockFn" class="but">解锁</div>
            </li>
            <li>
              <p class="tab">STS累计解锁</p>
              <p class="numbs">{{infoData.TotalUnlockSTS || 0}}</p>
            </li>
            <li>
              <p class="tab">STS累计奖励</p>
              <p class="numbs">{{infoData.TotalSTS || 0}}</p>
            </li>
            <li>
              <p class="tab">USDT累计奖励</p>
              <p class="numbs">{{infoData.TotalUSDT || 0}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p class="main-tips" v-show="infoData.DegradeTip">* {{infoData.DegradeTip}}</p>
      </div>
      <div class="main-list">
        <ul class="list-tab">
          <li ><span>奖励记录</span></li>
        </ul>
        <ul v-if="priesList.length > 0" class="list-m">
          <li class="list-tit">
            <span>奖励时间</span>
            <span>奖励类型</span>
            <span>奖励金额</span>
          </li>
          <li v-for="(list,index) in priesList" :key="index">
            <span>{{list.PrizeDate || ''}}</span>
            <span>{{list.CoinType || ''}}</span>
            <span>{{list.PrizeAmount || ''}}</span>
          </li>

        </ul>
        <p v-else class="none-list">暂无奖励记录</p>
      </div>
       <div class="main-list main-list2">
        <ul class="list-tab">
          <li ><span>奖励规则</span></li>
        </ul>
        <div class="list-text">
          <p>
            1、根据邀请人数采取阶梯返佣比例，邀请0-50人返10%，邀请50-100人返15%，邀请100-500人返20%，邀请500人以上返25% 
          </p>
          <p>2、返佣币种与用户交易币种所以消耗的手续费类型相同 </p>
          <p>3、交易返佣将实时到账 </p>
          <p>4、三个月没有邀请新的用户，返佣比例降为0% 5、本活动最终解释权归海星网所有</p>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="mask-box" v-show="maskSta">
      <div class="mask">
        <div class="mask-header">
          <span class="title">{{mask.title}}</span>
          <span class="clone" @click="cloneMask"></span>
        </div>
        <img v-if="mask.status == 'success'" class="mask-img" src="../../images/innvite/open-suc.png" alt="成功">
        <img v-else class="mask-img" src="../../images/innvite/open-fail.png" alt="失败">
        <p class="centTit">{{mask.centTit}}</p>
        <div class="but">
          <span v-if="mask.failBut">{{mask.failBut}}</span>
          <span class="suc" v-if="mask.sucBut">{{mask.sucBut}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Qrcode from 'vue-qrcode';
import  {
    partnerMyInfo,
    partnerLevel,
    partnerMyPrizes,
    partnerUnlock,
    partnerList} from  'lib/Service';
export default {
  data () {
    return {
      typeId: 0,
      maskSta: false,
      UserLevel: ['普通会员', 'vip至尊会员', '超级合伙人', '创世合伙人', '联合创始人'], // 身份
      infoData:{},
      priesList: [], //奖励列表
      mask: {
        status: 'success', 
        title: '成功',
        centTit: '恭喜成为VIP至尊会员！1000 STS已锁仓 半年后可手动执行解锁',
        sucBut: '确定',
        failBut: '取消'
      }
    };
  },

  components: {},

  computed: {},

  mounted () {
    this.getInfoData();
  },

  methods: {
    getInfoData() { // 获取初始数据
      partnerMyInfo().then( res => {
       this.infoData = res.data;
       this.mask.centTit = this.infoData.ApplyZZTip;
      });
      partnerMyPrizes().then( prizeRes => {
        console.log(prizeRes,'prizeRes');
        this.priesList = prizeRes.data.list || [];
      })
    },
    unlockFn() { // 解锁
      partnerUnlock().then(res => {
        console.log(res, 'unlock');
      })
    },
    applyFn() {
      partnerLevel().then(res => {
        console.log(
          res ,'partnerLevel'
        );
      }, err => {
        console.log(err,'err');
      }).
      this.maskSta = true;
    },
    cloneMask() {
      this.maskSta = false
    }
  }
}

</script>
<style lang="less" scoped>
.partner {
  width: 100%;
  .mask-box {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 800;
  }
  .mask {
    width: 480px;
    padding: 27px 23px;
    background: #FFFFFF;
    border-radius: 5px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 900;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50% ,-50%);
    .mask-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: normal;
        color: #182148;
      }
      .clone {
        cursor: pointer;
        display: block;
        width: 15px;
        height: 15px;
        background: url("../../images/innvite/clone.png") center no-repeat;
        background-size:cover;
      }
    }
    .mask-img {
      display: block;
      width: 139px;
      height: 139px;
      margin: 8px auto 10px;
    }
    .centTit {
      width: 290px;
      text-align: center;
      margin: 0 auto 50px;
      color: #182148;
      font-size: 16px;
      line-height: 22px;
    }
    .but {
      display: flex;
      justify-content: flex-end;
      span {
        cursor: pointer;
        display: block;
        width: 60px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
        margin-left: 20px;
        color: #182148;
        font-size: 14px;
      }
      span.suc {
        background: #3188FF;
        color: #fff;
      }
    }
  }
  .header {
    width: 100%;
    height: 350px;
    background: url("~@/images/innvite/partner-banner.png") center no-repeat;
    background-size: cover;
  }
  .main {
    margin: 0 auto;
    width: 1137px;
    .main-cent {
      height: 420px;
      padding: 30px 25px 50px;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      margin: -90px auto 0;
      display: flex;
      justify-content: space-between;
      .cent-tit {
        font-size: 29px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #182148;
        margin-bottom: 29px;
        text-align: center;
      }
      .cent-m {
        width: 100%;
        height: 284px;
        padding: 28px 25px 40px;
        font-size: 14px;
        color: #182148;
        border: 1px solid #EEEEEE;
        border-radius: 20px;
        line-height: 20px;
      display: flex;
        flex-wrap: wrap;
        align-content: space-between;
      }
      .cent-but {
        cursor: pointer;
        width: 230px;
        height: 44px;
        background: #3188FF;
        border-radius: 5px;
        text-align: center;
        line-height: 44px;
        font-size: 18px;
        color: #fff;
        margin: 0 auto;
      }
      .cent-but.disab-but {
          color: #C0C4CC;
           pointer-events: none;
          cursor: not-allowed;
          background-image: none;
          opacity: 0.6;
          border-color: #EBEEF5;
      }
      .cent-l,
      .cent-r {
        width: 518px;       
      }
    }
    .main-status {
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      padding: 20px 27px;
      margin-top: 20px;
      margin-bottom: 11px;
      display: flex;
      .tab {
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: normal;
        color: #182148;
        text-align: center;
        margin-top: 40px;
      }
      .but {
        width: 80px;
        height: 30px;
        background: #3188FF;
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        margin-top: 18px;
      }
      .numbs {
        margin-top: 29px;
        font-size: 24px;
        font-family: Helvetica;
        font-weight: 400;
        color: #182148;
      }
      .status-l {
        padding-right: 56px;
        border-right: 1px solid #eee;
        .name {
          font-size: 29px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #3188FF;
          margin-top: 16px;
        }
      }
      .status-r {
        flex: 1;
        .lists {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
        }
      }
    }
    .main-tips {
      margin: 11px 0 19px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #D65366;
    }
    .main-list {
      margin: 20px auto;
      width: 1137px;
      height: 330px;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      .none-list {
        margin-top: 40px;
        text-align: center;
        color: #ccc;
      }
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

    .main-list2 {
      background: #F7F7FB;
      color: #8698B0;
      height: auto;
      .list-tab li {
        padding: 22px 0;
        span {
          color: #8698B0;
        }
      }
      .list-text {
        padding: 25px 38px 10px;
        p {
          font-size: 14px;
          color: #8698B0;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>