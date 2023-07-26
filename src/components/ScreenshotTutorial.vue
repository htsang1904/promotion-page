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
                    <div class="card-content" v-for="content in collapse.description">
                        <div class="content">
                            {{ content.text }}
                        </div>
                        <img class="image" :src="require(`../assets/screenshot-tutorial/${content.src}`)" alt="">
                        <div class="note">
                            {{ content.note }}
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
            locale: 'iphone1.png',
            isOpen: null,
            collapses: [
                {
                    title: 'Apple', 
                    description: [
                        {
                            text: 'Đối với iPhone có nút home',
                            src: 'iphone2.jpg',
                            note: 'Đồng thời cả hai nút “Home” và nút “Nguồn”'
                        },
                        {
                            text: 'Đối với điện thoại iPhone có Face ID',
                            src: 'iphone3.png',
                            note: 'Đồng thời cả nút “Nguồn” và nút “Tăng” âm lượng'
                        }
                    ]
                },
                {
                    title: 'Samsung', 
                    description: [
                        {
                            text: 'Đối với điện thoại Samsung KHÔNG CÓ phím Home vật lý',
                            src: 'samsung1.jpg',
                            note: 'Đồng thời cả hai nút “Nguồn” và nút “Giảm” âm lượng'
                        },
                        {
                            text: 'Đối với điện thoại Samsung Có phím Home vật lý ',
                            src: 'samsung2.jpg',
                            note: 'Đồng thời cả hai nút “Home” và nút “Nguồn”'
                        }
                    ]
                },
                {
                    title: 'Xiaomi', 
                    description: [
                        {
                            text: 'Chụp màn hình Xiaomi bằng phím cứng',
                            src: 'xiaomi1.jpg',
                            note: 'Đồng thời cả hai nút “Nguồn” và nút “Giảm” âm lượng'
                        }
                    ]
                },
                {
                    title: 'Vivo', 
                    description: [
                        {
                            text: 'Chụp màn hình Vivo bằng phím cứng',
                            src: 'vivo1.jpg',
                            note: 'Đồng thời cả hai nút “Nguồn” và nút “Giảm” âm lượng'
                        }
                    ]
                },
                {
                    title: 'Oppo', 
                    description: [
                        {
                            text: 'Chụp màn hình Oppo bằng phím cứng',
                            src: 'oppo1.jpg',
                            note: 'Đồng thời cả hai nút “Nguồn” và nút “Giảm” âm lượng'
                        }
                    ]
                },
                {
                    title: 'Huawei', 
                    description: [
                        {
                            text: 'Chụp màn hình Huawei bằng phím cứng',
                            src: 'huawei1.jpg',
                            note: 'Đồng thời cả hai nút “Nguồn” và nút “Giảm” âm lượng'
                        }
                    ]
                },
                {
                    title: 'Realme', 
                    description: [
                        {
                            text: 'Chụp màn hình Realme bằng phím cứng',
                            src: 'realme1.jpg',
                            note: 'Đồng thời cả hai nút “Nguồn” và nút “Giảm” âm lượng'
                        }
                    ]
                },
                {
                    title: 'Sony', 
                    description: [
                        {
                            text: 'Chụp màn hình Sony bằng phím cứng',
                            src: 'sony1.jpg',
                            note: 'Đồng thời cả hai nút “Nguồn” và nút “Giảm” âm lượng'
                        }
                    ]
                },
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
    .card-header {
        margin-bottom: 6px;
    }
    .card-content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .content {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .image {
            width: 100%;
            max-width: 360px;
        }
        .note {
            text-align: center;
            margin-top: 10px;
        }
    }
}
</style>