<template>
    <div class="loading-container">
        <img src="~/image/GIF.gif" alt="">
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {}
        },
    }
</script>

<style scoped lang="scss">
    .loading-container{
        overflow: hidden;
        width: 100%;
        height: 100%;
        img{
            width: 110px;
            height: 110px;
            display: block;
            margin: 340px auto 0 auto;
        }
    }

</style>
