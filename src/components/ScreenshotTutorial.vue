<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">HƯỚNG DẪN CHỤP MÀN HÌNH</p>
            <button
                type="button"
                class="delete"
                @click="$emit('close')"
            ></button>
        </header>
        <section class="modal-card-body">
            <div>
                <b-collapse
                    class="card"
                    animation="slide"
                    v-for="(collapse, index) of collapses"
                    :key="index"
                    :open="isOpen == index"
                    @open="isOpen = index"
                    :aria-id="'contentIdForA11y5-' + index">
                    <template #trigger="props">
                        <div
                            class="card-header"
                            role="button"
                            :aria-controls="'contentIdForA11y5-' + index"
                            :aria-expanded="props.open"
                        >
                            <p class="card-header-title">
                                {{ collapse.title }}
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    pack="fa-solid"
                                    :icon="props.open ? 'fa-sort-down' : 'fa-sort-up'"
                                    size="is-small">
                                </b-icon>
                            </a>
                        </div>
                    </template>
                    <div class="card-content">
                        <div class="content">
                            {{ collapse.text }}
                        </div>
                    </div>
                </b-collapse>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'PromotionPageScreenshotTutorial',

    data() {
        return {
            isOpen: 0,
            collapses: [
                {title: 'Apple', text: 'Apple'},
                {title: 'Samsung', text: 'Samsung'},
                {title: 'Xiaomi', text: 'Xiaomi'},
                {title: 'Vivo', text: 'Vivo'},
                {title: 'Oppo', text: 'Oppo'},
                {title: 'Huawei', text: 'Huawei'},
                {title: 'Realme', text: 'Realme'},
                {title: 'Sony', text: 'Sony'},
            ]
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.modal-card {
    height: 100vh;
    width: 100%;
    .modal-card-head {
        padding: 10px;
        .modal-card-title {
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        }   
    }
    .modal-card-body {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>