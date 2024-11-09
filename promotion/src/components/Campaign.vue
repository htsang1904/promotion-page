<template>
    <div class="containerbonus-page">
        <div id="bonus-page">
            <Flicking v-if="topBanners.length" ref="topFlicking" class="top-slider" :options="topOption"
                :plugins="topPlugins">
                <div class="flicking-panel" v-for="(banner, index) in topBanners" :key="index">
                    <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
                </div>
            </Flicking>

            <Flicking ref="bottomFlicking" v-if="bottomBanners.length" class="bottom-slider" :options="bottomOption"
                :plugins="bottomPlugins" key="flicking2">

                <div class="flicking-panel" v-for="(banner, index) in bottomBanners" :key="index"
                    @click="onClickReceiveButton">
                    <div>{{ img(banner.banner_img) }}</div>
                    <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
                </div>
            </Flicking>

            <div class="receive-btn">
                <button class="pushable" @click="onClickReceiveButton">
                    <span class="front">Nhận ưu đãi ngay</span>
                </button>
            </div>
            <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
        </div>
        <section>
            <b-modal v-model="isCardModalActive" width='80%' scroll="keep">
                <div class="card">
                    <div class="card-content">
                        <div class="containerPopupLogin">
                            <img class="imgpopopuplogin" src="../assets/referral-bg.png" alt="">
                            <div class="containerTitleLogin">
                                Để bạn có thể nhận quà Guta Cafe cần một số thông tin của bạn để có thể lưu giữ các mã
                                giảm giá.
                            </div>
                            <button class="btnlogin" @click="gotoFormPage">Đăng ký ngay</button>
                        </div>
                    </div>
                </div>
            </b-modal>
        </section>
    </div>
</template>



<script>
const SALTKEY = '8Q21kHR0KJ';
const API_URL = import.meta.env.VITE_APP_API_URL + '/api'
console.log(API_URL);

import axios from 'axios';
import moment from 'moment';
import DeviceDetector from "device-detector-js";
import md5 from 'js-md5'

import {
    AutoPlay,
    Fade
} from "@egjs/flicking-plugins";

export default {
    name: 'App',
    components: {
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
            isCardModalActive: false
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
        gotoFormPage() {
            this.isCardModalActive = false
            this.$router.push('/user')
        },
        img(url) {
            console.log(this.$options.filters.imgUrl(url));

        },
        getDeviceInfo() {
            let deviceDetector = new DeviceDetector();
            let device = deviceDetector.parse(navigator.userAgent);
            return device
        },

        createRequestHash() {
            let time = moment().unix()
            let deviceInfo = this.getDeviceInfo()
            let device_type = deviceInfo.device.type || 'unknown'
            let message = `${time}${device_type}${SALTKEY}`
            let hash = md5(message)
            return {
                time,
                device_type,
                hash
            }
        },

        async getPromotionList() {
            let promoData = await axios.post(`${API_URL}/promotion/promotion-list`)
            if (localStorage.getItem('codes') === null) {
                localStorage.setItem('codes', JSON.stringify([]))
            }
            if (localStorage.getItem('user') === null) {
                localStorage.setItem('user', JSON.stringify([]))
            }
            if (localStorage.getItem('avatar') === null) {
                localStorage.setItem('avatar', JSON.stringify([]))
            }
            if (promoData && promoData.data) {
                let promotionList = promoData.data
                console.log(promotionList);
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
            let userdata = localStorage.getItem('user')
            if (userdata.length - 2 === 0) {
                this.isCardModalActive = true
            } else {
                this.checkhistory()
            }
        },

        async checkhistory() {
            let userdata = localStorage.getItem('user')
            let user1 = JSON.parse(userdata)
            console.log(user1[0].phone);
            let phone = user1[0].phone
            let now = moment().format('DD-MM-YYYY')
            let dataHistory = await axios.get(`${API_URL}/checkpromotion-log?phone=${phone}&getdate=${now}`)
            console.log(dataHistory);
            if (dataHistory.status === 200) {
                console.log(dataHistory.data.data.length);
                let currentIndex = this.$refs.bottomFlicking.index
                if (dataHistory.data.data.length >= 4) {
                    this.$buefy.notification.open({
                        duration: 2500,
                        message: `Số lần lấy mã hôm nay đã hết. </br>Hãy quay lại vào ngày mai nhé`,
                        type: 'is-danger',
                        position: 'is-top',
                    })
                } else {
                    this.getPromoCode(this.bottomBanners[currentIndex])
                }
            }
        },

        async getPromoCode(currentPromotion) {
            try {
                this.isLoading = true
                let user = localStorage.getItem('user')
                let user1 = JSON.parse(user)
                let now = moment().format('DD-MM-YYYY')
                console.log(user1[0].phone);
                let res = await axios.post(`${API_URL}/promotion-log/get-qr-code`, {
                    promotion_count: this.codeCountByPromotion(currentPromotion.id),
                    promotion_id: currentPromotion.id,
                    phone: user1[0].phone,
                    getdate:now,
                    ...this.createRequestHash()
                })
                this.isLoading = false
                if (res && res.data) {
                    if (res.data.success) {
                        let result = res.data
                        this.coupon_code = result.data.coupon_code
                        // this.qrCode = result.data.coupon_code
                        // if (currentPromotion.popup_img) {
                        //     this.imageUrl = (IMG_URL + currentPromotion.popup_img.url)
                        // }
                        // this.promotionDeadline = result.data.expire_at
                        // this.showPromotionCodeModal = true
                        this.saveToLocalstorage(result.data, currentPromotion.id)
                        this.$router.push('/nhan-uu-dai')
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


    },
}
</script>


<style lang="scss">
.containerbonus-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#bonus-page {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    width: 100%;

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
            width: 30%;
            margin: 0 10px;
            cursor: pointer;

            img {
                border-radius: 8px;
                display: block !important;
            }
        }
    }

    .bottom-slider {
        margin-top: 10px;
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

    .receive-btn {
        max-width: 600px;
        width: 90%;
        padding: 14px 0;
        border: none;
        border-radius: 15px;

        color: #fff;
        font-weight: 600;
        font-size: 18px;
        animation: btnAnimation 1.3s infinite;
        cursor: pointer;
    }

    .pushable {
        background-color: #013787;
        border-radius: 10px;
        border: none;
        padding: 0;
        cursor: pointer;
        outline-offset: 4px;
        width: 100%;
    }

    .pushable:focus:not(:focus-visible) {
        outline: none;
    }

    .front {
        display: block;
        padding: 12px 35px;
        border-radius: 10px;
        font-size: 16px;
        background-color: #034ab3;
        color: white;
        transform: translateY(-6px);
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

    .pushable:active .front {
        transform: translateY(-2px);
    }

    .license {
        color: #034ab3;
        text-align: center;
    }

    .modal {
        .modal-background {
            background-color: #fff;
        }

        .modal-content {
            padding: 10px;
            max-height: calc(100vh - 20px) !important;

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

.card {
    border-radius: 10px !important;
}

.containerPopupLogin {
    width: 100%;
    height: 100%;
    text-align: center;

    .imgpopopuplogin {
        width: 60%;
    }

    .containerTitleLogin {
        font-size: 12px;
        font-weight: 500;
        text-align: justify;
        line-height: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .btnlogin {
        width: 100%;
        height: 40px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        background-color: #215AA8;
        border: 0;
        border-radius: 5px
    }
}
</style>
