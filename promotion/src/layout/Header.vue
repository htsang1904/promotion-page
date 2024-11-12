<template>
    <div class="header">
        <img class="homelogo" src="../assets/guta-voucher-logo.png" @click="gotohome" alt="">
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {

        };
    },

    created() {
    },

    mounted() {
    },

    methods: {
        gotohome(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    box-shadow: rgba(185, 185, 189, 0.2) 0px 7px 29px 0px;
    z-index: 100;
    background-color: #215AA8;
    align-items: center;
    align-content: center;
    box-sizing: border-box;

    .homelogo {
        height: 25px;
        margin-left: 5px;
    }
}
</style>