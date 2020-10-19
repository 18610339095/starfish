<template>
    <div>
        <div class="ySelect" >
            <h3 class="yselectInput" @click="hasListTab()"><img :src="imgSrc" width="20" height="20"><span>{{type?type:$t('select withdrawal coin')}}</span></h3>
            <ul class="yselectBottn" v-show="hasList">

                <li class="yselectInput" v-for="(key,index) in getCoinList" :key="index" @click="bottnType(key.coin_name,key.icon,key.recharge_status,key.withdraw_status)">
                    <img :src="key.icon" width="20" height="20"><span>{{key.coin_name}}</span>
                    <span v-show="routeName == 'advance'? key.withdraw_status == '2':key.recharge_status == 2"  class="fr" style="padding-right: 15px;">{{$t('Suspended')}}</span>
                </li>
            </ul>
        </div>
        <ul class="yYEList">
            <li>{{ $t("balance") }}： <span style="font-family: Helvetica;">{{Number(balance[type] || '0').toFixed(9).slice(0,-1)}} </span></li>
            <li>{{ $t("in order") }}：<span style="font-family: Helvetica;">{{Number(freezeBalance[type] || '0').toFixed(8)}} </span></li>
            <li>{{ $t("total") }}：<span style="font-family: Helvetica;">{{Number(totalAmout || '0').toFixed(8)}}</span></li>
        </ul>
    </div>

</template>

<script>
    //资产管理bb列表
    import {setCookie,getCookie,removeCookie} from 'lib/SessionStoreageUtil';
    import {getCoinList,responseResult,getUserCoinAddr,orderMarketBalance} from 'lib/Service'

    export default {
        name: "",
        data:function () {
            return {
                myAssets:{},
                getCoinList:{},
                hasList:false,
                ABCadd:'',
                bType:[],
                coin_pic:'',
                getMyAssets:'',
                balance:{},
                freezeBalance:{},
                type: '',
                imgSrc:"../../static/images/novice/index/i-1.jpg"
            }
        },
        props:{
            routeName:{
                type:String
            },
        },
        methods:{
            marketList:function (callback) {
                let that = this;
                that.$emit('getCoinLists','');
                getCoinList({}).then((data)=>{
                    responseResult(data,(successData)=>{
                        let info =successData.data
                        if(callback){
                            callback(info)
                        }
                        that.getCoinList = successData.data;
                        that.$emit('CoinList',info);
                        setCookie('CoinList',that.getCoinList)
                    },(failData)=>{
                        // that.$toast.show({
                        //     text:that.$t(failData.msg),
                        // });
                          that.$message({
                            message: that.$t(failData.msg),
                           
                            });
                    });
                })
            },
            hasListTab:function () {
                let that =this;
                if(that.hasList == true){
                    that.hasList = false;
                }else{
                    that.hasList = true;

                }
            },

            bottnType:function (val,key,re_status,ad_Status) {
               let dates={"type":val,"re_status":re_status,"ad_Status":ad_Status};

                let that = this;
                that.type = val;
                that.imgSrc=key
                this.ABCadd = '';
                that.$emit('bType',dates);
                that.hasList = false;
                that.$emit('addclass','');
                if(that.routeName == 'advance'){
                    return false;
                }else{
                    getUserCoinAddr({"coin":val}).then((data)=>{
                        responseResult(data,(successData)=>{
                            try {

                                let info = successData.data;
                                that.ABCadd = info.address;
                                that.$emit('addclass',info.address);
                                //console.log(info)
                            }
                            catch(res){
                               // console.log(res)
                            }

                        },(failData)=>{
                            // that.$toast.show({
                            //     text:that.$t(failData.msg),
                            // });
                              that.$message({
                                message: that.$t(failData.msg),
                              
                            });
                        });
                    })

                }

            },



            getMyAssetsfn:function () {
                let that = this;
                orderMarketBalance({}).then((data)=>{
                    responseResult(data,(successData)=>{
                        try {
                            let info = successData.data;
                            console.log(info,'ceshi')
                            that.getMyAssets = info;

                            this.getMyAssets = info || {};

                            let getTypes = info;
                            this.balance = getTypes.balance;
                            that.$emit('getMyAssetsAll', info);
                            that.$emit('coinBal', getTypes.balance);
                            this.freezeBalance = getTypes.freezeBalance;

                            let bTypeAll = [];
                            let balanceD = [];
                            let n = []; // 存放已遍历的满足条件的元素
                            for(var item in  getTypes.balance){
                                bTypeAll.push(item);
                            };

                            for(var item in  getTypes.freezeBalance){
                                bTypeAll.push(item);
                            };

                            for (var i = 0; i < bTypeAll.length; i++) {
                                // indexOf()判断当前元素是否已存在
                                if (n.indexOf(bTypeAll[i]) == -1) n.push(bTypeAll[i]);
                            };

                            this.bType = n;
                        }
                        catch (res){

                        }
                    },(failData)=>{
                    })
                })


            }
        },
        computed:{
            totalAmout:function () {
                let balance = Number(this.balance[this.type]) || 0;
                let freezeBalance = Number(this.freezeBalance[this.type]) || 0;
                return balance+freezeBalance;
            },

        },
        mounted(){
            let that =this;
            if(this.$route.params.orderyStatus){
                this.type = this.$route.params.orderyStatus;
                this.bottnType(this.type)

                this.marketList(function (val) {

                    val.forEach(function (item) {
                        if(item.coin_name == that.type)
                        that.imgSrc = item.icon
                    })
                });


            }
            this.marketList();
            this.getMyAssetsfn();

        }
    }
</script>

<style scoped>
    .yYEList{
        font-size: 12px;
        color: #666;
        line-height: 1;
        padding-left: 34px;
        margin-bottom: 26px;
        display: flex;
        margin-top: 10px;
        justify-content: flex-end;
    }
    .yCZCon .yYEList li:not(:last-child) {
        margin-bottom: 12px;
    }
    .yCZCon .yYEList span {
        color: #4168F3;
        margin-right: 12px;
    }
    .ySelect {
        position: relative;
        height: 30px;
        line-height: 30px;
        border: 1px solid #d4d4d4
    }

    .ySelect .yselectInput {
        font-size: 14px;
        color: #333;
        padding-left: 8px;
        position: relative;
        cursor: pointer;
        line-height: 25px;
    }

    .ySelect .yselectInput:after {
        content: "";
        position: absolute;
        width: 8px;
        height: 4px;
        top: 50%;
        right: 7px;
        margin-top: -2px;
        background: url(../images/assetmanagement/i-2.png) no-repeat
    }

    .ySelect .yselectInput img {
        vertical-align: middle
    }

    .ySelect .yselectInput span {
        vertical-align: middle;
        margin-left: 8px
    }

    .ySelect .yselectBottn {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 20;
        top: 30px;
        background: #fff;
        border: 1px solid #e9eaec
    }

    .ySelect .yselectBottn .yselectInput:after {
        display: none
    }

    .ySelect .yselectBottn li {
        height: 29px;line-height: 29px;
        color: #70757b
    }

    .ySelect .yselectBottn li:hover {
        background: #f7f7f7;
        color: #333
    }

</style>