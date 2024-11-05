<template>
    <transition name="slide-up">
        <div class="popupcontainer">
            <div class="header">
                <div class="backgroundbackbtn" @click="closePopup">
                    <b-icon class="backbtn" icon="xmark"></b-icon>
                </div><img class="homelogo" src="../assets/home-logo.png" alt="">
            </div>
            <div class="promotion-card" v-if="promoDetail" ref="promo_card">
                <div class="card-image">
                    <figure class="image" style="object-fit: cover;">
                        <img v-if="promoDetail.imgBackUrl" :src="'http://localhost:1331' + promoDetail.imgBackUrl">
                    </figure>
                </div>
                <div class="promotion-code-detail">
                    <div class="qr-code">
                        <qrcode-vue class="qrcode" :value="qrCodeRender(promoDetail.coupon_code)" size="100"
                            level="H"></qrcode-vue>
                    </div>
                    <div class="code-detail">
                        <div class="promotion-code">
                            Mã coupon: <br /><span>{{ promoDetail.coupon_code }}</span></div>
                        <div class="promotion-expired">Thời hạn sử dụng: <br /><b>{{ moment(promoDetail.deadline) }}</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
const API_URL = import.meta.env.VITE_APP_API_URL + '/api'
const IMG_URL = import.meta.env.VITE_APP_API_URL

import moment from 'moment'
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'

import ScreenshotTutorial from '@/components/ScreenshotTutorial.vue'
export default {
    components: {
        QrcodeVue,
        ScreenshotTutorial
    },
    props: {
        coupon_code: {
            type: String,
            default: null,
        }
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
        this.getPromotion()
    },

    methods: {
        closePopup() {
            this.$emit('closed')
        },
        getPromotion() {
            axios.get(`${API_URL}/promotion-log/${this.coupon_code}`)
                .then(res => {
                    this.promoDetail = res.data
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);

                })
        },

        moment(item) {
            return moment(item.createdAt).format('DD/MM') + ' - ' + moment(item.expire_at).format('DD/MM/YYYY')
        },

        qrCodeRender(code) {
            if (!code) return ''
            return 'C-' + code
        },
    }
}
</script>
<style lang="scss">
.popupcontainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    /* Nền mờ */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;


.backgroundbackbtn {
    position: fixed;
    width: fit-content;
    height: fit-content;
    left: 0;
}

.backbtn {
    height: 25px;
    color: white;
    margin-left: 10px;
}



.header {
    position: fixed;
    display: flex;
    top: 0;
    height: 60px;
    width: 100%;
    box-shadow: rgba(185, 185, 189, 0.2) 0px 7px 29px 0px;
    z-index: 100;
    background-color: #215AA8;
    align-items: center;
    align-content: center;
    justify-content: center;
    box-sizing: border-box;
    
    .homelogo {
        height: 20px;
    }
}

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
        padding: 10px 10px;
        border-radius: 6px;
        font-size: 14px;
        background-color: #034ab3;
        color: white;
        transform: translateY(-6px);
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

    .pushable:active .front {
        transform: translateY(-2px);
    }
}}
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter, .slide-up-leave-to /* .slide-up-leave-active in <2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
</style>