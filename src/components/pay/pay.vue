<template>
    <div class="payContainer ">
        <mainTitle :mainTitle="mainTitle.title" :selfBack="true" @backPage="backPage" v-if="mainTitle.isShow"></mainTitle>
        <loading v-if="isLoading"></loading>
       <div class="pay-module1" v-if="!isLoading">
        <div class="commodityContainer flex flex-item flex-justify column">
            <p class="commodityName">{{commodityName}}</p>
            <p class="commodityPrice">{{commodityPrice}}</p>
        </div>
           <div class="discount-container" v-if="(payAdditional!=''||undefined||null)&&payAdditional.reduction_amount">
               <div class="discount flex flex-item flex-justify-between hairlines">
                   <span>折扣</span>
                   <span>已优惠￥ {{payAdditional.reduction_amount}}</span>
               </div>
           </div>

        <div class="PaymentContainer flex flex-item flex-justify column">
            <div class="paymentItem hairlines flex flex-item flex-justify" v-for="(item,index) in paymentInfo"
                 :key="item.id" @click="selectedPayment(index)">
                <img v-bind:src=item.paymenImg alt="" class="paymentItemImage">
                <span class="paymentName">{{item.paymentName}}</span>
                <img src="~image/pay/weixuanzhong@2x.png" alt="" class="commonSelectedImage" v-if="!item.isSelected">
                <img src="~image/pay/xuanzhong@2x.png" alt="" class="commonSelectedImage" v-if="item.isSelected">
            </div>
        </div>
        <div class="submitBtn" @click="submitMethod">
            确认支付
        </div>
       </div>
        <keyboard :isAnimationIn="keyboard.isAnimationIn" :isShowController="keyboard.isShowController" :isShowKeyboard="keyboard.isShowKeyboard" @onKeyboard="onKeyboard" @onKeyboardDown="keyboard.onKeyboardDown">
            <div class="pay-pop-box">
                <div class="close-btn" @click="onClosePop">
                    X
                </div>
                <p class="title1">请输入短信验证码</p>
                <p class="title2">已发送至{{userMobile}}</p>
                <div class="input-hint" v-if="password[0]==0||password[0]?false:true">
                   <div class="input-hint-container">
                       请输入验证码
                   </div>
                </div>
                <div class="input-box flex flex-item flex-justify" v-if="password[0]==0||password[0]?true:false">
                    <div class="input-text-item" v-if="password[0]==0||password[0]?true:false">{{password[0]==0||password[0]?password[0]:''}}</div>
                    <div class="input-text-item" v-if="password[1]==0||password[1]?true:false">{{password[1]==0||password[1]?password[1]:''}}</div>
                    <div class="input-text-item" v-if="password[2]==0||password[2]?true:false">{{password[2]==0||password[2]?password[2]:''}}</div>
                    <div class="input-text-item" v-if="password[3]==0||password[3]?true:false">{{password[3]==0||password[3]?password[3]:''}}</div>
                    <div class="input-text-item" v-if="password[4]==0||password[4]?true:false">{{password[4]==0||password[4]?password[4]:''}}</div>
                    <div class="input-text-item" v-if="password[5]==0||password[5]?true:false">{{password[5]==0||password[5]?password[5]:''}}</div>
                </div>

                <p class="title3" v-if="!isShowGetCodeBtn">{{countNumber}}s重新获取</p>
                <p class="title3" style="color: #0A81FB" @click="onGetCode" v-if="isShowGetCodeBtn">重新获取</p>
                <div class="sure-pay" v-if="!isClickButton" style="background-color: #0A81FB;opacity: 0.5">
                    确认支付
                </div>
                <div class="sure-pay" v-if="isClickButton" style="background-color: #0A81FB" @click="onConfirmPay2">
                    确认支付
                </div>
            </div>
        </keyboard>
    </div>
</template>

<script>
    import api from 'api/api'; //导入api
    import axios from '@/common/utils/Axios';  //导入网络请求
    import getBankImageWithCode from '@/common/utils/bankImage'; //导入获取银行图标的方法
    import loading from '@/common/components/loading/index';   //加载loading页面
    import {Submit} from "@/common/utils/form";  //导入form表单的提交方式
    import keyboard from '@/common/components/keyboard/index'  //导入数字键盘
    import mainTitle from '@/common/components/mainTitle/index'  //导入公共的title
    import {popPage} from '@/common/native/index'    //导入native方法
    export default {
        name: "pay",
        inject:['reload'], //注入reload 方法
        data() {
            return {
                payToken: '', //初始化payToken 从地址栏获取
                payAdditional:'', //立减金额
                commodityPrice: '',//商品价格
                commodityName: '', //商品名称
                bankcards: {}, //银行卡名称
                paymentInfo: [],//支付方式列表详情
                paymentType: null,  //当前选择的支付方式
                confirmData: {},  //确认支付的接口参数
                isLoading:true, //loading是否出现 默认显示
                userMobile:'', //预留手机号
                smsUuid:'', //上一次发送短信返回的短信唯一码
                keyboard:{
                    isAnimationIn:true,
                    isShowController:false,
                    isShowKeyboard:false,
                    onKeyboardDown:()=>{
                        console.log('2342352')

                    },
                },
                mainTitle:{
                    title:'订单支付',
                    isShow:false
                },
                password:[],
                isClickButton:false,
                countNumber:10,
                isShowGetCodeBtn:false,
                timerId:null,
            }
        },
        components:{
            loading,
            keyboard,
            mainTitle
        },
        created() {
            this.isShowTitle();
            this.initPayToken();
            if (!this.payToken) {
                this.$toast('payToken is null');
                return;
            }
            //初始化选择付款的方式
            this.reqPayResult((oData)=>{
                if(oData.returnCode==0){
                    if(oData.returnUrl){
                        window.location=oData.returnUrl;
                        return;
                    };
                    this.$toast('接口异常');
                    return;
                };
                this.reqQueryAdvanceOrder();
            },(msg)=>{
                this.$toast(msg);
            })
        },
        destroyed(){
          this.cleanTimer();
        },
        methods: {
            backPage(){
                //掉native popPage 的方法
                try {
                    popPage();
                }catch (e) {
                    console.log('popPge is null')
                }
            },
            //是否展示title
            isShowTitle(){
              let showTitle=this.$route.query.showTitle;
              if(showTitle == 1){
                  this.mainTitle.isShow=true;
                  return;
              }
              this.mainTitle.isShow=false;
            },
            showKeyBoard(){
              this.keyboard.isShowKeyboard=true;
            },
            selectedPayment(index) {
                if (!this.paymentInfo) {
                    console.log('paymentInfo is null')
                    return;
                }
                ;
                //这里其实可以优化 记录上一个选中的下标的
                this.paymentInfo.forEach((item, index) => {
                    item.isSelected = false;
                });
                let selectedPayMentInfo = this.paymentInfo[index];
                selectedPayMentInfo.isSelected = true;
                this.paymentType = selectedPayMentInfo.payModelCode;
            },
            submitMethod() {
                if (!this.paymentType) {
                    this.$toast('paymentType is null');
                    return;
                }
                ;
                if (this.paymentInfo.length == 0) {
                    this.$toast('paymentInfo is null');
                    return;
                }
                ;
                this.$indicator.open({
                    text: '提交中...',
                    spinnerType: 'fading-circle'
                });
                this.reqConfirmPay(); //正在提交数据
            },
            //请求查询预付单接口
            reqQueryAdvanceOrder() {
                axios.post(api.QUERY_ADVANCE_ORDER,//path 路径
                    {
                        payToken: this.payToken
                    },
                    {
                        //成功回调
                        success: (oData) => {
                            this.isLoading=false;
                            this.commodityPrice = '￥' + oData.amount;
                            this.commodityName = oData.product;
                            this.payAdditional=oData.payAdditional?JSON.parse(oData.payAdditional):''; // xhq 2019/5/14 立减金额
                            let bankcards = oData.bankcards[0];
                            // xhq 2019/5/10 如果没有信用卡信息 直接默认给出支付宝支付方式
                            if(!bankcards){
                                this.paymentInfo = [{
                                    //     paymenImg:require('image/pay/weixinzhifu@2x.png'),
                                    //     paymentName:'微信支付',
                                    //     isSelected:false,
                                    //     payModelCode:'wechatpay',
                                    // },{
                                    paymenImg: require('image/pay/zhifubao@2x.png'),
                                    paymentName: '支付宝支付',
                                    isSelected: true,
                                    payModelCode: 'alipay',
                                }];
                                //更新默认选中
                                this.paymentType = this.paymentInfo[0].payModelCode;
                                return;
                            };
                            this.userMobile=(bankcards.userMobile).substr(0,3)+"****"+(bankcards.userMobile).substr(7);
                            this.bankcards = bankcards;
                            // //初始化确认支付的参数
                            this.confirmData = {
                                bankcardNo: bankcards.bankcardNo,
                                bankCode: bankcards.bankCode,
                                bankName: bankcards.bankName,
                                idNumber: bankcards.idNumber,
                                userMobile: bankcards.userMobile,
                                userName: bankcards.userName
                            };
                            let paymentName = bankcards.bankName + ' ( ' + (bankcards.bankcardNo).substr(bankcards.bankcardNo.length - 4) + ' )';
                            let bankObj = {
                                paymenImg: (bankcards.icon||getBankImageWithCode(bankcards.bankCode))?(bankcards.icon||getBankImageWithCode(bankcards.bankCode)):'',
                                paymentName: paymentName,
                                isSelected: true,
                                payModelCode: 'fastpay',
                            };
                            if(bankObj.paymenImg){
                                //更新paymentInfo信息
                                this.paymentInfo = [bankObj, {
                                    //     paymenImg:require('image/pay/weixinzhifu@2x.png'),
                                    //     paymentName:'微信支付',
                                    //     isSelected:false,
                                    //     payModelCode:'wechatpay',
                                    // },{
                                    paymenImg: require('image/pay/zhifubao@2x.png'),
                                    paymentName: '支付宝支付',
                                    isSelected: false,
                                    payModelCode: 'alipay',
                                }];
                                 //跟新默认选中方式
                                this.paymentType = this.paymentInfo[0].payModelCode;

                                return;
                            }
                            this.paymentInfo = [{
                                //     paymenImg:require('image/pay/weixinzhifu@2x.png'),
                                //     paymentName:'微信支付',
                                //     isSelected:false,
                                //     payModelCode:'wechatpay',
                                // },{
                                paymenImg: require('image/pay/zhifubao@2x.png'),
                                paymentName: '支付宝支付',
                                isSelected: true,
                                payModelCode: 'alipay',
                            }];
                            //更新默认选中
                            this.paymentType = this.paymentInfo[0].payModelCode;

                        },
                        //失败回调
                        error: (err) => {
                            console.log(err);
                            this.$toast(err || '系统出错');

                        }
                    }
                );

            },
            //请求确认支付接口
            reqConfirmPay() {
                let bankcard = this.confirmData;
                let reqParams = {};
                if (!bankcard.bankCode || this.paymentType != 'fastpay') {
                    reqParams = {
                        payModelCode: this.paymentType,
                        payToken: this.payToken,
                    }
                } else {
                    reqParams = {
                        bankcard,
                        payModelCode: this.paymentType,
                        payToken: this.payToken
                    }
                }
                ;
                axios.post(api.CONFIRM_PAY,//path 路径
                    reqParams,
                    {
                        //成功回调
                        success: (oData) => {
                            //这个是解决创建了弹窗 立即关闭 关不掉的bug
                            setTimeout(() => {
                                this.$indicator.close();
                            }, 0);
                            if(oData.smsFlag==1){
                                this.jumpWithUrlAndParams(oData.reqUrl,oData.params,oData.submitType);
                                return;
                            };
                            this.showPop();

                        },
                        //失败回调
                        error: (err) => {
                            this.$toast(err || '系统出错');
                            setTimeout(() => {
                                this.$indicator.close();
                            }, 0);
                        }
                    });
            },
            // xhq 2019/5/8 展示弹窗
            showPop(){
                this.reqAgainSendSms();
                this.showKeyBoard();
                this.startTimer(()=>{
                    if(this.countNumber==0){
                        this.cleanTimer();
                        this.isShowGetCodeBtn=true;
                        return;
                    };
                    this.countNumber-=1;
                })
            },
            // xhq 2019/5/8 请求再次发送短信接口
            reqAgainSendSms(){
                if(!this.smsUuid){
                    axios.post(api.SEND_SMS,{
                        payToken:this.payToken
                    },{
                        success:(oData)=>{
                            this.smsUuid=oData.smsUuid;
                        },
                        error:(msg)=>{
                            this.$toast(msg);
                        }
                    });
                    return;
                }
                axios.post(api.AGAIN_SEND_SMS,{
                    payToken:this.payToken,
                    smsUuid:this.smsUuid
                },{
                    success:(oData)=>{
                        this.smsUuid=oData.smsUuid;
                    },
                    error:(msg)=>{
                       this.$toast(msg);
                    }
                })
            },
            // xhq 2019/4/24 加上新接口
            reqPayResult(success,error){
                axios.post(api.PAY_RESULT,//path 路径
                    {
                        payToken:this.payToken
                    },
                    {
                        //成功回调
                        success: (oData) => {
                            success&&success(oData);
                        },
                        //失败回调
                        error: (msg) => {
                            error&&error(msg);
                        }
                    });
            },
            // xhq 2019/5/8 请求短信验证接口
            reqValidSendSms(){
                let smsCode=this.password.join('');
                axios.post(api.VALID_SEND_SMS,{
                    payToken:this.payToken,
                    smsCode:smsCode,
                    smsUuid:this.smsUuid
                },{
                    success:(oData)=>{
                        setTimeout(() => {
                            this.$indicator.close();
                        }, 0);
                        this.reload();
                    },
                    error:(msg)=>{
                        setTimeout(() => {
                            this.$indicator.close();
                        }, 0);
                       this.$toast(msg);
                    }
                })
            },
            //初始化payToken
            initPayToken() {
                let payToken = this.$route.query.payToken;
                this.payToken = payToken ? payToken : "";
            },
            // xhq 2019/5/7 已废弃
            splicingReqUrl(url, params) {
                if (!(url && params)) {
                    console.log('url or params is null');
                    return;
                }
                ;
                let splicingParams = "";
                params.forEach((param, index) => {
                    if (params.length - 1 == index) {
                        if (param['key'] == 'sign') {
                            splicingParams += param['key'] + '=' + encodeURIComponent(param['value'])
                        } else {
                            splicingParams += param['key'] + '=' + param['value']
                        }
                        ;

                    } else {
                        if (param['key'] == 'sign') {
                            splicingParams += param['key'] + '=' + encodeURIComponent(param['value']) + '&';
                        } else {
                            splicingParams += param['key'] + '=' + param['value'] + '&';
                        }
                        ;
                    }
                });
                console.log('xhq---', url + '?' + splicingParams);
                return url + '?' + splicingParams;
            },
            // xhq 2019/4/24 跳转到新的地址
            jumpWithUrlAndParams(url,params,submitType){
                if (!url) {
                    console.log('url  is null');
                    return;
                };
                var reqParams={};
                if(params){
                    params.forEach((param, index) => {
                        let key=param['key'];
                        let value=param['value'];
                        reqParams[key]=value;
                    });
                };
              submitType = submitType?(submitType.toLowerCase()):'post';
                console.log('submitType==>',submitType);
                if(submitType=='post'){
                    Submit(url,reqParams,submitType);
                    return;
                };
                //否则默认为url跳转
                window.location = url;

            },
            // xhq 2019/5/7 废弃
            onReqSrc(reqUrl) {
                //使用window.location 跳转 不使用a标签跳转 是为了解决 在微信中跳转不了的问题
                // let aElement=this.$refs.jumpTag;
                // aElement.attributes['href'].value=reqUrl;
                // console.info(aElement.attributes['href'].value);
                // aElement.click();
                window.location = reqUrl;
            },
            onKeyboard(value,event){
                if(event=='delete'){
                    if(this.password.length<=4){
                        this.isClickButton=false;
                    }
                    if(this.password.length==0){
                        return;
                    };
                    this.password.pop();
                    return;
                };
                if(this.password.length==6){
                    console.log('password is full')
                    return;
                }
                this.password=[...this.password,value]
                console.log('onKeyboard is run')
                if(this.password.length>=4){
                    this.isClickButton=true;
                    return;
                }
                this.isClickButton=false;
            },
            onClosePop(){
                this.cleanTimer();
                this.keyboard.isShowKeyboard=false;
                this.password=[];
                this.countNumber=10;
                this.isClickButton=false;
                this.isShowGetCodeBtn=false;
            },
            //开启定时器
            startTimer(cb){
                this.timerId=setInterval(()=>{
                    cb&&cb();
                },1000);
            },
            //清理定时器
            cleanTimer(){
                if(this.timerId == null){
                    return;
                };
                clearInterval(this.timerId);
                this.timerId==null;
            },
            onGetCode(){
                console.log('onGetCode is run');
                this.reqAgainSendSms();
                this.isShowGetCodeBtn=false;
                this.countNumber=60;
                this.startTimer(()=>{
                    if(this.countNumber==0){
                        this.cleanTimer();
                        this.isShowGetCodeBtn=true;
                        return;
                    };
                    this.countNumber-=1;

                })

            },
            //当收到点击提交
            onConfirmPay2(){
                this.$indicator.open({
                    text: '支付中...',
                    spinnerType: 'fading-circle'
                });
                this.reqValidSendSms();
            }

        }
    }
</script>

<style scoped lang="scss">
    @import '~@/themes/pay/pay';
    .payContainer {
        background-color: $bg-color;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .pay-module1{
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    /* commodity-ui*/
    .commodityContainer {
        margin-top: 10px;
        width: 100vw;
        height: 230px;
        background-color: $white;

        .commodityPrice {
            padding-top: 25px;
            color: $color-3;
            font-weight: bold;
            font-size: 70px;
        }

        .commodityName {
            color: $color-6;
            font-size: 30px;

        }
    }

    .discount-container{
        width: 100%;
        box-sizing: border-box;
        height: 80px;
        background-color: $white;
        .discount{
            height: 100%;
            margin-left: 40px;
            span:first-of-type{
                font-size: 24px;
            }
            span:last-of-type{
                font-size: 24px;
                margin-right: 40px ;
                color: #E42E2EFF;
            }
        }
        .hairlines{
            border-top: 1px solid #F5F5F5;
        }

    }


    /*付款方式*/
    .PaymentContainer {
        margin-top: 20px;
        background-color: $white;

        .paymentItem {
            justify-content: flex-start;
            margin-left: 40px;
            height: 128px;
            width: 600px;
            position: relative;

            &:active {
                background-color: $bg-color;
            }

            .paymentItemImage {
                width: 56px;
                height: 56px;
            }

            .paymentName {
                font-size: 26px;
                color: $color-6;
                padding-left: 20px;
            }

            .commonSelectedImage {
                width: 40px;
                height: 40px;
                position: absolute;
                top: 44px;
                right: 40px;

            }
        }

        .hairlines {
            border-bottom: 1px solid $bg-color;
        }

        .paymentItem:last-child {
            border-bottom: none;
        }
    }

    .submitBtn {
        width: 474px;
        height: 80px;
        margin: 154px auto 0 auto;
        background-color: $pay-btn-clolor;
        border-radius: 40px;
        text-align: center;
        line-height: 80px;
        font-size: 32px;
        font-weight: bold;
        color: #FFFFFF;
    }

    .submitBtn:active {
        background-color: #074CF7;
    }



    .pay-pop-box{
        position: relative;
        width: 520px;
        height: 382px;
        background-color: $white;
        border-radius:10px;
        margin: 200px auto;
        border: 1px solid $white;
        .close-btn{
            width: 36px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            border: 1px solid $white;
            border-radius: 50%;
            color: $white;
            position: absolute;
            top: -50px;
            right: 0;
        }
        .title1{
            text-align: center;
            font-size: 30px;
            margin-top: 40px;
        }
        .title2{
            text-align: center;
            font-size: 24px;
            color: $color-9;
            margin-top: 16px;
        }
        .input-hint{
            height: 80px;
            width: 100%;
            margin-top: 20px;
          .input-hint-container{
              margin: 8px auto;
              width: 440px;
              height: 64px;
              line-height: 64px;
              text-indent: 20px;
              border-radius: 10px;
              font-size: 30px;
              opacity: 0.7;
              color: #cccccc;
              border: 1px solid rgba(204,204,204,1);
          }
        }
        .input-box{
            height: 80px;
            width: 100%;
            margin-top: 20px;
            .input-text-item{
                width: 48px;
                height: 48px;
                border-bottom: 1px solid #e5e5e5;
                line-height: 48px;
                text-align: center;
                margin-left: 20px;
                font-size: 40px;
            }
            .input-text-item:first-of-type{
                margin-left: 0;
            }
        }
        .title3{
            font-size: 22px;
            color: $color-9;
            text-align: center;
            margin-top: 10px;
        }
        .sure-pay{
            width: 440px;
            height: 78px;
            line-height: 78px;
            text-align: center;
            color: $white;
            font-size: 30px;
            border-radius: 10px;
            margin: 30px auto 0 auto;
        }
    }

</style>
