<template>
    <div class="containerApp">
        <Header />
        <div id="app-content">
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>
<script>
import Footer from './layout/Footer.vue';
import Header from './layout/Header.vue';
export default {
    components: {
        Footer,
        Header
    },
    data() {
        return {
        };
    },

    created() {
    },

    mounted() {
        window.addEventListener('beforeunload', this.clearLocalStorage);
    },
    beforeDestroy() {
        // Hủy sự kiện beforeunload khi component bị hủy
        window.removeEventListener('beforeunload', this.clearLocalStorage);
    },
    methods: {
        clearLocalStorage() {
            // Xóa toàn bộ localStorage khi đóng trình duyệt
            localStorage.clear();
        }
    }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    margin: 0;
    font-family: Montserrat;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    height: fit-content
}

.containerApp {
    width: 100%;
    height: 100%;
    user-select: none;
}

#app-content {
    width: 100%;
    margin-top: 60px;
    margin-bottom: 60px;
}
</style>