<template>
<div id="bonus-page">
    <Flicking v-if="topBanners.length" ref="topFlicking" class="top-slider" :options="topOption" :plugins="topPlugins">
        <div class="flicking-panel" v-for="(banner, index) in topBanners" :key="index">
            <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
        </div>
    </Flicking>
    <Flicking ref="bottomFlicking" v-if="bottomBanners.length" class="bottom-slider" :options="bottomOption" :plugins="bottomPlugins" key="flicking2">
        <div class="flicking-panel" v-for="(banner, index) in bottomBanners" :key="index" @click="onCliCkReceiveButton">
            <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
        </div>
    </Flicking>
    <button type="button" @click="onCliCkReceiveButton" class="bonus-btn">Nhận mã ưu đãi ngay</button>
    <b-modal v-model="isImageModalActive" :width="440" scroll="keep" :on-cancel="handleClose" :can-cancel="['x']">
        <div class="card">
            <div class="card-image">
                <figure class="image" style="object-fit: cover;">
                    <img :src="imageUrl">
                </figure>
            </div>
            <span class="promotion-code">{{ qrCode }}</span>
            <span class="promotion-dealine">{{ promotionDeadline }}</span>
            <qrcode-vue class="qrcode" value="qrCode" size="80" level="H"></qrcode-vue>
        </div>
    </b-modal>
    <div class="license">
        <strong>
            © 2023 Công ty TNHH Guta Việt Nam
        </strong>
    </div>
    <VueFooter />

</div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue'
import VueFooter from '@/components/VueFooter.vue'
const API_URL = process.env.VUE_APP_API_URL + '/api'
const IMG_URL =  process.env.VUE_APP_API_URL
import {
    AutoPlay,
    Fade
} from "@egjs/flicking-plugins";
export default {
    name: 'App',
    components: {
        QrcodeVue,
        VueFooter
    },
    data() {
        return {
            topPlugins: [new AutoPlay({
                duration: 1400,
                direction: "PREV"
            }), new Fade()],
            bottomPlugins: [new AutoPlay({
                duration: 1400,
                direction: "NEXT"
            }), new Fade()],
            codes: [],
            isImageModalActive: false,
            imageUrl: null,
            qrCode: null,
            promotionDeadline: null,
            currentPromotionId: null,
            topBanners: [],
            bottomBanners: [],
            topOption: {
                align: 'center',
                circular: true,
                defaultIndex: 1,
                inputType: ["pointer"],
            },
            bottomOption: {
                align: 'center',
                circular: true,
                defaultIndex: 1,
                inputType: ["pointer"],
            },
        };
    },

    created() {
        document.title = 'Guta - Ưu đãi'
    },

    mounted() {
        this.getPromotionList()
        this.clearMemory()
    },

    methods: {
        async getPromotionList() {
            let promoData =  await axios.post(`${API_URL}/promotion/promotion-list`)
            if (localStorage.getItem('codes') === null) {
                localStorage.setItem('codes', JSON.stringify([]))
            }
            if (promoData && promoData.data) {
                let promotionList = promoData.data
                promotionList.forEach(promotion => {
                    if (promotion.position === 'top') {
                        this.topBanners.push(promotion)
                    } else {
                        this.bottomBanners.push(promotion)
                    }
                })
                console.log(this.bottomBanners)
            }
        },
        async createQrCode() {
            let data = {
                today: new Date(),
                promotion_id: this.currentPromotionId,
            }
            await axios.post(`${API_URL}/promotion-log/get-qr-code`, data).then((res) => {
                this.qrCode = res.data.qr_code

                let available_date = new Date(res.data.createdAt).toJSON().slice(0, 10).split('-').reverse().join('/')
                let old_data = JSON.parse(localStorage.getItem('codes'))
                old_data.push({
                    code: this.qrCode,
                    createdAt: available_date
                })
                localStorage.setItem('codes', JSON.stringify(old_data))
            })
        },
        onCliCkReceiveButton() {
            let currentIndex = this.$refs.bottomFlicking.index
            let dl = this.bottomBanners[currentIndex].deadline
            if (JSON.parse(localStorage.getItem('codes')).length >= 5) {
                this.$buefy.notification.open({
                    duration: 2500,
                    message: `Số lần lấy mã hôm nay đã hết. </br>Hãy quay lại vào ngày mai nhé`,
                    type: 'is-danger',
                })
            } else {
                this.currentPromotionId = this.bottomBanners[currentIndex].id
                this.imageUrl = IMG_URL + this.bottomBanners[currentIndex].popup_img.url
                this.promotionDeadline = new Date(dl).toJSON().slice(0, 10).split('-').reverse().join('/')
                this.isImageModalActive = true
                this.createQrCode()
            }
        },
        clearMemory() {
            let lsMemory = localStorage.getItem('codes')
            let memory = JSON.parse(lsMemory)
            if (memory && memory.length) {
                let lastItem = memory.findLast((e) => e)
                let lastIndex = memory.findLastIndex((e) => e)
                let lastDate = lastItem.createdAt
                let now = new Date().toJSON().slice(0, 10).split('-').reverse().join('/')
                if (lastDate != now) {
                    localStorage.setItem('codes', JSON.stringify([]))
                }
            }
        },
        handleClose() {
            this.isImageModalActive = false
        }
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
    margin: 0;
    font-family: Montserrat;
}

#bonus-page {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    background-color: #F6EE0753;
    min-height: 100vh;

    .bonus-banner {
        img {
            width: 100%;
        }
    }

    .top-slider {
        margin: 10px 0;
        max-width: 700px;
        width: 100%;
        overflow: hidden;

        .flicking-panel {
            width: 50%;
            margin: 0 10px;
            cursor: pointer;

            img {
                border-radius: 8px;
                display: block !important;
            }
        }
    }

    .bottom-slider {
        margin: 10px 0;
        max-width: 700px;
        width: 100%;

        .flicking-panel {
            width: 50%;
            min-width: 300px;
            margin: 0 10px;
            cursor: pointer;

            img {
                border-radius: 8px;
                height: 100%;
                display: block !important;
            }
        }
    }

    .bonus-btn {
        margin: 10px 0;
        max-width: 600px;
        width: 90%;
        padding: 14px 0;
        border: none;
        border-radius: 15px;
        background-color: #034ab3;
        color: #fff;
        font-weight: 600;
        font-size: 18px;
        animation: btnAnimation 1.3s infinite;
        cursor: pointer;
    }

    .license {
        color: #034ab3;
        text-align: center;
    }

    .social-network {
        margin: 20px;
        width: 180px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .item {
            width: 45px;
        }
    }

    .modal {
        .modal-background {
            background-color: #000;
        }

        .modal-content {
            padding: 10px;

            .card {
                position: relative;

                .promotion-code {
                    position: absolute;
                    font-size: 18px;
                    font-weight: 500;
                    top: 22%;
                    left: 40%;
                }

                .promotion-dealine {
                    position: absolute;
                    font-weight: 600;
                    top: 27%;
                    font-size: 14px;
                    left: 40%;
                    color: #000;
                }

                .qrcode {
                    position: absolute;
                    bottom: 4%;
                    left: 4%;
                }
            }
        }
    }
}

@keyframes btnAnimation {
    0% {
        transform: scale(1)
    }

    10% {
        transform: scale(0.86)
    }

    30% {
        transform: scale(0.95)
    }

    50% {
        transform: scale(0.86)
    }

    70% {
        transform: scale(1)
    }

    100% {
        transform: scale(1)
    }
}
.flicking-panel {
    img {
       
    }
}
</style>
