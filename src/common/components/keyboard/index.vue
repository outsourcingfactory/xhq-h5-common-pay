<template>
    <div class="keyboard-container" v-if="isShowKeyboard">
        <div class="modal-box"></div>
        <div class="solt-container">
            <slot/>
        </div>
        <div class="keyboard-number-container">
            <div class="keyboard-inline-container" :class="isAnimationIn?'a-bounceinB':'a-bounceoutB'">
            <div class="down-controll" :class="isShowController?'controller-show':'controller-hide'"><img src="~image/xiangxia@2x.png" alt="" @click="onKeyboardDown"></div>
            <div class="keyboard-number flex flex-item flex-justify column">
                <div class="keyboard-number-item flex flex-item flex-justify flex-grow" style="border-bottom: 1px solid #ececec">
                    <div class="flex-grow keyboard-item" @click="onKeyboard(1)" style="border-right: 1px solid #ececec">1</div>
                    <div class="flex-grow keyboard-item" @click="onKeyboard(2)" style="border-right: 1px solid #ececec">2</div>
                    <div class="flex-grow keyboard-item" @click="onKeyboard(3)">3</div>
                </div>
                <div class="keyboard-number-item flex flex-item flex-justify flex-grow" style="border-bottom: 1px solid #ececec">
                    <div class="flex-grow  keyboard-item" @click="onKeyboard(4)" style="border-right: 1px solid #ececec">4</div>
                    <div class="flex-grow keyboard-item" @click="onKeyboard(5)" style="border-right: 1px solid #ececec">5</div>
                    <div class="flex-grow  keyboard-item" @click="onKeyboard(6)">6</div>
                </div>
                <div class="keyboard-number-item flex flex-item flex-justify flex-grow" style="border-bottom: 1px solid #ececec">
                    <div class="flex-grow keyboard-item" @click="onKeyboard(7)" style="border-right: 1px solid #ececec">7</div>
                    <div class="flex-grow keyboard-item" @click="onKeyboard(8)" style="border-right: 1px solid #ececec">8</div>
                    <div class="flex-grow keyboard-item" @click="onKeyboard(9)">9</div>
                </div>
                <div class="keyboard-number-item flex flex-item flex-justify flex-grow">
                    <div class="flex-grow keyboard-item" @click="onKeyboard('.')" style="background-color: #ececec">.</div>
                    <div class="flex-grow keyboard-item" @click="onKeyboard(0)">0</div>
                    <div class="flex-grow keyboard-item" @click="onKeyboard('','delete')" style="background-color: #ececec"><img src="~image/qingchu@2x.png" alt=""></div>
                </div>
            </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "keyboard",
        props:{
            isAnimationIn:{
                default:true,
                type:Boolean
            },   //控制动画
            isShowKeyboard:{
                default: true,
                type:Boolean
            },  //控制组件的显影
            isShowController:{
                default:true,
                type:Boolean
            }  //控制器的显示
        },
        data() {
            return {
            }
        },
        watch:{
            isAnimationIn(value){
               console.log('isAnimationIn==>',value)
            },
            isShowKeyboard:(isShowKeyboard)=>{
                if(!isShowKeyboard){
                    //检测到弹窗关闭
                    console.log('弹窗关闭');
                    console.log(this);
                    // this.isAnimationIn=false;
                    return;
                };
                if(isShowKeyboard){
                    //检测到弹窗打开
                    console.log('弹窗打开');
                    // this.isAnimationIn=true;
                    return;
                };
            }
        },
//组件
        components: {},
//初始化数据
        created() {
        },
//一些自定义方法
        methods: {
            onKeyboard(value,event){
               console.log(value,event);
               //发送鼠标点击事件
                this.$emit('onKeyboard',value,event);
            },
            //键盘向下事件
            onKeyboardDown(){
                //父节点将 isAnimation 置为false
                this.$emit('onKeyboardDown')
            },
            //键盘向上事件
            onKeyboardUp(){
                //父节点将 isAnimationIn 置为true
                this.$emit('onKeyboardUp');
            }

        }
    }
</script>

<style scoped lang="scss">
    .controller-show{
        visibility: visible;
    }
    .controller-hide{
        visibility: hidden;
    }
    .keyboard-container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*z-index: 100;*/
        .modal-box{
            background:rgba(0,0,0,0.5) ;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .solt-container{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .keyboard-number-container{
            overflow: hidden;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 380px;
        }
        .keyboard-inline-container{
            overflow: hidden;
            background-color: #ececec;
            transform:translateY(380px)
        }
        .down-controll{
            width: 100%;
            height: 40px;
            overflow: hidden;
            img{
                display: block;
                width: 24px;
                height: 14px;
                margin: 13px auto;
            }
        }
        .keyboard-number{
            background-color: $white;
            height: 340px;
            width: 100%;
            font-size: 40px;
            .keyboard-number-item{
                text-align: center;
                width: 100%;
            }
            .keyboard-item{
                height: 100%;
                line-height: 85px;
                &:active{
                    background-color: #ececec;
                }
                img{
                    width: 28px;
                    height: 22px;
                }

            }



        }
    }
    .a-bounceinB{-webkit-animation:0.5s ease;-moz-animation:0.5s ease;-ms-animation:0.5s ease;animation:0.5s ease;animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards;}
    .a-bounceinB{-webkit-animation-name:bounceinB;-moz-animation-name:bounceinB;-ms-animation-name:bounceinB;animation-name:bounceinB;}
    .a-bounceoutB{
        -webkit-animation:0.3s ease;-moz-animation:0.3s ease;-ms-animation:0.3s ease;animation:0.3s ease;animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards;
    }
    .a-bounceoutB{
        -webkit-animation-name:bounceoutB;-moz-animation-name:bounceoutB;-ms-animation-name:bounceoutB;animation-name:bounceoutB;
    }

    /* 弹入-从下 */
    @-webkit-keyframes bounceinB{
        0%{opacity:0;-webkit-transform:translateY(380px);}
        /*60%{opacity:1;-webkit-transform:translateY(100px);}*/
        /*80%{-webkit-transform:translateY(50px);}*/
        100%{-webkit-transform:translateY(0);}
    }
    @-moz-keyframes bounceinB{
        0%{opacity:0;-moz-transform:translateY(380px);}
        /*60%{opacity:1;-moz-transform:translateY(100px);}*/
        /*80%{-moz-transform:translateY(50px);}*/
        100%{-moz-transform:translateY(0);}
    }
    @-ms-keyframes bounceinB{
        0%{opacity:0;-ms-transform:translateY(380px);}
        /*60%{opacity:1;-ms-transform:translateY(100px);}*/
        /*80%{-ms-transform:translateY(50px);}*/
        100%{-ms-transform:translateY(0);}
    }
    @keyframes bounceinB{
        0%{opacity:0;transform:translateY(380px);}
        /*60%{opacity:1;transform:translateY(100px);}*/
        /*80%{transform:translateY(50px);}*/
        100%{transform:translateY(0);}
    }

    /* 弹出-从下 */
    @-webkit-keyframes bounceoutB{
        0%{opacity:0;-webkit-transform:translateY(0);}
        100%{-webkit-transform:translateY(380px);}
    }
    @-moz-keyframes bounceoutB{
        0%{opacity:0;-moz-transform:translateY(0);}
        100%{-moz-transform:translateY(380px);}
    }
    @-ms-keyframes bounceoutB{
        0%{opacity:0;-ms-transform:translateY(0);}
        100%{-ms-transform:translateY(380px);}
    }
    @keyframes bounceoutB{
        0%{opacity:0;transform:translateY(0);}
        100%{transform:translateY(380px);}
    }






</style>
