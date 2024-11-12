<template>
    <div class="footerContainer">
        <div class="containerItemFooter">
            <router-link to="/" exact active-class="my-active-class" class="default-link" >
                <b-icon class="footerIcon" icon="gift">
                </b-icon>
                <div class="titlefooterbar">Trang chủ</div>
            </router-link>
        </div>
        <div class="containerItemFooter">
            <router-link to="/history"  active-class="my-active-class" class="default-link">
                <b-icon class="footerIcon" icon="clock-rotate-left">
                </b-icon>
                <div class="titlefooterbar">Lịch sử quà tặng</div>
            </router-link>
        </div>
        <div class="containerItemFooter">
            <router-link to="/user" active-class="my-active-class" class="default-link">
                <b-icon class="footerIcon" icon="user">
                </b-icon>
                <div class="titlefooterbar">Cá nhân</div>
            </router-link>
        </div>
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
    }
}
</script>

<style lang="scss" scoped>
.footerContainer {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: rgba(185, 185, 189, 0.2) 0px 7px 29px 0px;
    display: grid;
    grid-template-columns: auto auto auto;

    .containerItemFooter {
        background-color: white;
        text-align: center;
        box-sizing: border-box;
        padding-top: 10px;
        padding-bottom: 10px;

        .footerIcon {
            width: 20px;
            height: 20px;
        }

        .titlefooterbar {
            height: fit-content;
            font-size: 12px;
            font-weight: 500;
        }
    }
}
.default-link{
    color: gray;
}
.default-link:focus {
    outline: none;
    -webkit-tap-highlight-color: transparent;
}
.my-active-class{
    color: #215AA8
}

</style>