<template>
    <div class="ended">
        <img src="/late.png">
        <h1>Chương trình ưu đãi đã kết thúc.<br/> Hãy theo dõi Guta để nhận các ưu đãi tiếp theo nha.</h1><br/>
        <AppDownload />
    </div>
</template>
<script>
import AppDownload from './AppDownload.vue';
export default {
    components: {
        AppDownload
    }
}
</script>
<style lang="scss">
.ended {
    max-width: 500px;
    width: 100%;
    text-align: center;
    margin: auto;
}
</style>