<template>
<div id="home">
    <EndedCampaign />
</div>
</template>

    
    
<script>
import EndedCampaign from '@/components/EndedCampaign.vue';

export default {
    name: 'App',
    components: {
        EndedCampaign,
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
