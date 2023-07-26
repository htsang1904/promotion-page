<template>
    <div class="promotion-card" v-if="promoDetail && promotion" ref="promo_card">
        <div class="card-image">
            <figure class="image" style="object-fit: cover;">
                <img v-if="promotion.imageUrl" :src="promotion.imageUrl">
            </figure>
        </div>
        <div class="promotion-code-detail">
            <div class="qr-code">
                <qrcode-vue class="qrcode" :value="qrCodeRender(promoDetail.coupon_code)" size="100" level="H"></qrcode-vue>
            </div>
            <div class="code-detail">
                <div class="promotion-code">
                    Mã coupon: <br/><span>{{ promoDetail.coupon_code }}</span></div>
                <div class="promotion-expired">Thời hạn sử dụng: <br/><b>{{ moment(promoDetail) }}</b></div>
            </div>
        </div>
        <div>
            <button class="pushable" @click="showPopup">
                <span class="front">Hướng dẫn chụp màn hình điện thoại</span>
            </button>
        </div>
    </div>
</template>
<script>
const API_URL = process.env.VUE_APP_API_URL + '/api'
const IMG_URL =  process.env.VUE_APP_API_URL

import moment from 'moment'
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'
import VueFooter from '@/components/VueFooter.vue'

import ScreenshotTutorial from '@/components/ScreenshotTutorial.vue'
export default {
    components: {
        QrcodeVue,
        ScreenshotTutorial
    },
    data() {
        return {
            promoDetail: null,
            promotion: null,
        }
    },

    created() {
        document.title = 'Nhận ưu đãi thành công'
    },

    mounted() {
        this.getLastPromoCode()
    },

    methods: {
        getLastPromoCode() {
            let lsMemory = localStorage.getItem('codes')
            let memory = JSON.parse(lsMemory)
            if (memory && memory.length) {
                let lastItem = memory[memory.length - 1]
                if (lastItem) {
                    this.promoDetail = lastItem.code
                    this.getPromotion(lastItem.promotionId)
                }
            } else {
                this.$router.push('/')
            }
        },

        getPromotion(promotionId) {
            axios.get(`${API_URL}/promotions/${promotionId}?populate=*`)
            .then(res => {
                this.promotion = res.data.data.attributes
                if (this.promotion.popup_img) {
                    this.promotion.imageUrl = (IMG_URL + this.promotion.popup_img.data.attributes.url)
                }
            })
            .catch(err => {
            })
        },

        moment(item) {
            return moment(item.createdAt).format('DD/MM') + ' - ' + moment(item.expire_at).format('DD/MM/YYYY')
        },

        qrCodeRender(code) {
            if (!code) return ''
            return 'C-' + code
        },

        showPopup() {
            this.$buefy.modal.open({
                parent: this,
                component: ScreenshotTutorial,
                trapFocus: true,
                canCancel: [''],
                width: '90%',
                scroll: 'clip'
            })
        }
    }
}
</script>
<style lang="scss">
.promotion-card {
    position: relative;
    max-width: 500px;
    width: 100%;
    margin: 20px auto 0;
    padding: 10px;
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
            font-size: 14px;
            .promotion-code {
                span {
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            .promotion-expired {
                font-size: 14px;
            }
        }
        @media (max-width: 450px) {
            top: 28%;
        }
    }
    .pushable {
        background-color: #013787;
        border-radius: 6px;
        border: none;
        margin-top: 14px;
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
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        background-color: #034ab3;
        color: white;
        transform: translateY(-6px);
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

    .pushable:active .front {
        transform: translateY(-2px);
    }
}
</style>