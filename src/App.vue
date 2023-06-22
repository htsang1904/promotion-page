<template>
<div id="bonus-page">
    <Flicking v-if="topBanners.length" ref="topFlicking" class="top-slider" :options="topOption" :plugins="topPlugins">
        <div class="flicking-panel" v-for="(banner, index) in topBanners" :key="index">
            <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
        </div>
    </Flicking>
    <Flicking ref="bottomFlicking" v-if="bottomBanners.length" class="bottom-slider" :options="bottomOption" :plugins="bottomPlugins" key="flicking2">
        <div class="flicking-panel" v-for="(banner, index) in bottomBanners" :key="index" @click="onClickReceiveButton">
            <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
        </div>
    </Flicking>
    <button type="button" @click="onClickReceiveButton" class="bonus-btn">Nhận mã ưu đãi ngay</button>
    <b-modal v-model="showPromotionCodeModal" :can-cancel="['x']">
        <div class="card">
            <div class="card-image">
                <figure class="image" style="object-fit: cover;">
                    <img v-if="imageUrl" :src="imageUrl">
                </figure>
            </div>
            <div class="promotion-code-detail">
                <div class="qr-code">
                    <qrcode-vue class="qrcode" v-model="qrCode" size="100" level="H"></qrcode-vue>
                </div>
                <div class="code-detail">
                    <div class="promotion-code">
                        Mã coupon: <br/><span>{{ qrCode }}</span></div>
                    <div class="promotion-dealine">Thời hạn sử dụng: <br/><b>{{ moment(promotionDeadline) }}</b></div>
                </div>
                

            </div>
            
        </div>
    </b-modal>
    <div class="license">
        <strong>
            © 2023 Công ty TNHH Guta Việt Nam
        </strong>
    </div>
    <VueFooter />
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import DeviceDetector from "device-detector-js";
import md5 from 'js-md5'
import QrcodeVue from 'qrcode.vue'
import VueFooter from '@/components/VueFooter.vue'
const SALTKEY = '8Q21kHR0KJ';
const API_URL = process.env.VUE_APP_API_URL + '/api'
const IMG_URL =  process.env.VUE_APP_API_URL
import { AutoPlay,  Fade } from "@egjs/flicking-plugins";

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
            isLoading: false,
            codes: [],
            showPromotionCodeModal: false,
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
        this.clearLocalstorage()
    },

    methods: {
        getDeviceInfo() {
            let deviceDetector = new DeviceDetector();
            let device = deviceDetector.parse(navigator.userAgent);
            return device
        },

        createRequestHash() {
            let time = moment().unix()
            let deviceInfo = this.getDeviceInfo()
            let device_type = deviceInfo.device.type
            let message = `${time}${device_type}${SALTKEY}`
            let hash = md5(message)
            return {
                time,
                device_type,
                hash
            }
        },

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
            }
        },

        onClickReceiveButton() {
            let currentIndex = this.$refs.bottomFlicking.index
            
            if (JSON.parse(localStorage.getItem('codes')).length >= 10) {
                this.$buefy.notification.open({
                    duration: 2500,
                    message: `Số lần lấy mã hôm nay đã hết. </br>Hãy quay lại vào ngày mai nhé`,
                    type: 'is-danger',
                    position: 'is-top',
                })
            } else {
                this.getPromoCode(this.bottomBanners[currentIndex])
            }
        },

        async getPromoCode(currentPromotion) {
            try {
                this.isLoading = true
                let res =  await axios.post(`${API_URL}/promotion-log/get-qr-code`, {
                    promotion_count: this.codeCountByPromotion(currentPromotion.id),
                    promotion_id: currentPromotion.id,
                    ...this.createRequestHash()
                })
                this.isLoading = false
                if (res && res.data) {
                    if (res.data.success) {
                        let result = res.data
                        this.qrCode = result.data.coupon_code
                        if (currentPromotion.popup_img) {
                            this.imageUrl = (IMG_URL + currentPromotion.popup_img.url)
                        }
                        this.promotionDeadline = result.data.expire_at
                        this.showPromotionCodeModal = true
                        this.saveToLocalstorage(result.data, currentPromotion.id)
                    } else {
                        this.$buefy.notification.open({
                            duration: 2500,
                            message: res.data.message || `Có lỗi xảy ra. Vui lòng thử lại sau`,
                            type: 'is-danger',
                            position: 'is-top',
                        })
                    }
                }
            } catch (e) {
                console.log(e)
                this.isLoading = false
                this.$buefy.notification.open({
                    duration: 2500,
                    message: `Có lỗi xảy ra. Vui lòng thử lại sau`,
                    type: 'is-danger',
                    position: 'is-top',
                })
            }
        },
        
        clearLocalstorage() {
            let lsMemory = localStorage.getItem('codes')
            let memory = JSON.parse(lsMemory)
            if (memory && memory.length) {
                let lastItem = memory[memory.length - 1]
                let lastDate = moment(lastItem.createdAt).format('YYYY-MM-DD')
                let now = moment().format('YYYY-MM-DD')
                if (lastDate !== now) {
                    localStorage.setItem('codes', JSON.stringify([]))
                }
            }
        },

        saveToLocalstorage(code, promotionId) {
            let lsMemory = localStorage.getItem('codes')
            let memory = JSON.parse(lsMemory)
            memory.push({
                code: code,
                promotionId: promotionId,
                createdAt: moment().format('YYYY-MM-DD'),
            })
            localStorage.setItem('codes', JSON.stringify(memory))
        },

        codeCountByPromotion(id) {
            let lsMemory = localStorage.getItem('codes')
            let memory = JSON.parse(lsMemory)
            let count = 0
            let promotionById = memory.filter((e) => e.promotionId === id)
            if (promotionById && promotionById.length) {
                count = promotionById.length
            }
            return count
        },

        handleClose() {
            this.showPromotionCodeModal = false
        },

        moment(time) {
            return moment().format('DD/MM') + ' - ' + moment(time).format('DD/MM/YYYY')
        }
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
                height: auto;
                display: block !important;
                pointer-events: none;
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
            background-color: #fff;
        }

        .modal-content {
            padding: 10px;
            max-height: calc(100vh - 20px) !important;
            .card {
                position: relative;
                max-width: 500px;
                width: 100%;
                margin: auto;
                .promotion-code-detail {
                    position: absolute;
                    top: 30%;
                    background: #fff;
                    border-radius: 4px;
                    left: 0;
                    right: 0;
                    display: flex;
                    margin: auto;
                    max-width: 330px;
                    .qr-code {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .qrcode {
                            width: 100%;
                            text-align: center;
                        }
                    }
                    .code-detail {
                        width: 160px;
                        .promotion-code {
                            span {
                                font-size: 18px;
                                font-weight: bold;
                            }
                        }
                    }
                    @media (max-width: 450px) {
                        top: 28%;
                    }
                }
            }
        }

        .modal-close {
            background: #000;
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
