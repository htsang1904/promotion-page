<template>
    <div class="containerNoallow1">
        <div class="containerNoallow">
            <img class="imgnoallow" src="../assets/no-allow.png" alt="">
            <div class="titleNoallow">Bạn cần đăng nhập để có thể dùng tính năng này</div>
            <button class="btnNoallow" @click="goToUserInfo">Đăng nhập</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        goToUserInfo() {
            this.$router.push('/user')
        }
    }
}
</script>
<style lang="scss">
.containerNoallow1{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.containerNoallow {
    padding: 20px;

    .imgnoallow {
        width: 100%;
    }

    .titleNoallow {
        font-size: 14px;
        text-align: center;
        font-weight: 500;
    }

    .btnNoallow {
        width: 30%;
        height: 40px;
        border: 0;
        border-radius: 50px;
        color: white;
        font-weight: 600;
        background-color: #034ab3;
        margin-top: 10px;
        margin-left: 35%;
        margin-right: 35%;
    }
}
</style>