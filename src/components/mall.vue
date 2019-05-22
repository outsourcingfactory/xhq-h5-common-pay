<template>
<div class="mallContainer">
    <div class="header flex flex-item flex-justify">
        <div class="backContainer" @click="backPage">
            <i class="iconfont iconjiantou2 back-icon"></i>
        </div>
        <span class="sp2">外部链接</span>
    </div>
    <iframe frameborder=0 :src="src"></iframe>

</div>
</template>

<script>
    export default {
        name: "mall",
        data(){
            return {
              src:'' //这个是跳转到第三方的src
            }
        },
        created(){
           this.redirectSrc();
        },
        methods:{
            backPage(){
                this.$router.go(-1);
            },
            //重定向 src
            redirectSrc(){
                if(!this.$route.query.src){
                    this.$toast('redirectSrc is null');
                    return;
                };
                this.src=this.$route.query.src;
            }

        }
    }
</script>

<style scoped lang="scss">
    $pay-herder-bg:#ffffff;
    .mallContainer{
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
    }

    /* header-ui*/
    .header{
        width: 100vw;
        height: 128px;
        background-color:$pay-herder-bg;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        position: relative;
        .backContainer{
            padding-left: 40px;
            padding-right: 40px;
            height: 128px;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 128px;
            .back-icon{
                font-size: 50px;
            }

        }
        .sp2{
            font-size: 34px;
            font-weight: bold;
        }
    }

    iframe{
        width: 100%;
        height: 100%;
    }

</style>
