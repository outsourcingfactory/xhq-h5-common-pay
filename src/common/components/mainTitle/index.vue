<template>
    <!-- 头部标题子组件 -->
    <header class="header-title-wrapper" :class="hasLine ? 'has-line' : ''">
        <i class="back-icon iconjiantou2 iconfont" @click="back" v-if="showBackIcon"></i>
        <h4 class="header-title">{{mainTitle}}</h4>
        <span @click="rightClickFn" class="right-btn" v-if="rightBtnText">{{rightBtnText}}</span>
    </header>
</template>

<script>
    // import {handleBack} from '@/common/native/index'
    // const isAndroid = navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') > 0
    export default {
        name: 'mainTitle',
        props: {
            mainTitle: {
                type: String,
                default: '标题'
            },
            noLine: {
                type: Boolean,
                default: false
            },
            showBackIcon: {
                type: Boolean,
                default: true
            },
            rightBtnText: {
                type: String,
                default: ''
            },
            hasLine: {
                type: Boolean,
                default: false
            },
            selfBack: {
                // 是否自定义返回时间
                type: Boolean,
                default: false
            }

        },
        activated () {
            // if (isAndroid) {
            //     handleBack({hasCallback: true}, {success: () => {
            //             this.back()
            //         },
            //         error: (err) => {
            //             console.log(err)
            //         }})
            // }
        },
        methods: {
            back () {
                if (this.selfBack) {
                    this.$emit('backPage')
                } else {
                    this.$router.go(-1)
                }
            },
            // 点击右边按钮
            rightClickFn () {

            }
        }
    }
</script>

<style scoped lang="scss">
    .header-title-wrapper{
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        width: 100%;
        height: 130px;
        z-index: 400;
        background-color: $white;
        box-sizing: border-box;
        padding-top: 40px;
        position: relative;
        &.has-line:after{
            content:'';
            position:absolute;
            left: 0;
            bottom: 0;
            height: 1px;
            background-color: $color-e;
            width: 100%;
        }
        .back-icon{
            position: absolute;
            left: 10px;
            bottom:20px;
            font-size:50px;
            width: 50px;
            height: 50px;
            &:after{
                position: absolute;
                content: '';
                left: -10px;
                top:-10px;
                right:-10px;
                bottom: -10px;
            }
        }
        .right-btn{
            position: absolute;
            right:25px;
            bottom: 20px;
            height: 50px;
            line-height: 50px;
            font-size: 32px;
            color: $color-6;
        }
        .header-title{
            line-height: 90px;
            text-align: center;
            font-size: 34px;
            font-weight: normal;
            color:$color-6;
            box-sizing: border-box;
            padding: 0 70px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

</style>
