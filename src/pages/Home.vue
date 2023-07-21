<template>
<div id="home">
    <EndedCampaign />

    <VueFooter />
</div>
</template>

    
    
<script>
import EndedCampaign from '@/components/EndedCampaign.vue';
import VueFooter from '@/components/VueFooter.vue'

export default {
    name: 'App',
    components: {
        EndedCampaign,
        VueFooter
    },

    created() {
        document.title = 'Guta - Ưu đãi'
    },

    mounted() {
    },

    methods: {
        
    },
}
</script>
    
    
<style lang="scss">

</style>
