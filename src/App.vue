<template>
  <div id="bonus-page">
    <Flicking v-if="topBanners.length" ref="topFlicking" class="top-slider" :options="topOption" :plugins="topPlugins">
      <div class="flicking-panel" v-for="(banner, index) in topBanners" :key="index">
        <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
      </div>
    </Flicking>
    <div class="bonus-banner">
      <img src="./assets/banner.png" alt="">
    </div>
    <Flicking ref="bottomFlicking" v-if="bottomBanners.length" class="bottom-slider" :options="bottomOption" :plugins="bottomPlugins" key="flicking2">
      <div class="flicking-panel" v-for="(banner, index) in bottomBanners" :key="index" @click="onCliCkReceiveButton">
        <img v-show="banner.isActive" :src="banner.banner_img | imgUrl" />
      </div>
    </Flicking>
    <button type="button" @click="onCliCkReceiveButton" class="bonus-btn">Nhận mã ưu đãi ngay</button>
    <b-modal 
      v-model="isImageModalActive"
      :width="440" 
      scroll="keep"
      :on-cancel="handleClose"
      :can-cancel="['x']"
      >
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
      .All rights reserved.
    </div>
    <div class="social-network">
            <div class="item">
              <a
                rel="noreferrer"
                href="https://www.facebook.com/gutacafe.vn"
                target="_blank"
                title="Chillta Facebook"
              >
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
                    fill="#3B5998"
                  ></path>
                  <path
                    d="M17.6676 26.0742V17.3693H20.0706L20.389 14.3696H17.6676L17.6717 12.8682C17.6717 12.0858 17.7461 11.6666 18.8698 11.6666H20.372V8.6665H17.9687C15.082 8.6665 14.066 10.1217 14.066 12.5689V14.3699H12.2666V17.3696H14.066V26.0742H17.6676Z"
                    fill="white"
                  ></path>
                </svg>
              </a>
            </div>
            <div class="item">
              <a
                rel="noreferrer"
                href="https://instagram.com/guta.cafe"
                target="_blank"
                title="Chillta Instagram"
              >
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  viewBox="0 0 45 45"
                  style="enable-background: new 0 0 45 45"
                  xml:space="preserve"
                >
                  <linearGradient
                    id="SVGID_1_"
                    gradientUnits="userSpaceOnUse"
                    x1="-584.407"
                    y1="487.933"
                    x2="-558.593"
                    y2="451.067"
                    gradientTransform="translate(594 -447)"
                  >
                    <stop offset="0" style="stop-color: #ffb900" />
                    <stop offset="1" style="stop-color: #9100eb" />
                  </linearGradient>
                  <circle
                    cx="22.5"
                    cy="22.5"
                    r="22.5"
                    style="fill: url(#SVGID_1_)"
                  />
                  <g>
                    <path
                      class="st1"
                      d="M28.9 36.6H16.1c-4.2 0-7.6-3.4-7.6-7.6V16.1c0-4.2 3.4-7.6 7.6-7.6H29c4.2 0 7.6 3.4 7.6 7.6V29c0 4.1-3.5 7.6-7.7 7.6zM16.1 10.8c-2.9 0-5.3 2.4-5.3 5.3V29c0 2.9 2.4 5.3 5.3 5.3H29c2.9 0 5.3-2.4 5.3-5.3V16.1c0-2.9-2.4-5.3-5.3-5.3H16.1z"
                    />
                    <path
                      class="st1"
                      d="M22.5 29.5c-3.9 0-7-3.2-7-7 0-3.9 3.2-7 7-7s7 3.2 7 7c0 3.9-3.1 7-7 7zm0-11.7c-2.6 0-4.7 2.1-4.7 4.7s2.1 4.7 4.7 4.7 4.7-2.1 4.7-4.7-2.1-4.7-4.7-4.7z"
                    />
                    <circle class="st1" cx="30" cy="15" r="1.6" />
                  </g>
                </svg>
              </a>
            </div>
            <div class="item">
              <a
                rel="noreferrer"
                href="http://zalo.me/"
                target="_blank"
                title="Zalo"
              >
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
                    fill="#3171F6"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.0002 5.99984C10.1091 5.99984 5.3335 10.4556 5.3335 15.9522C5.3335 19.0351 6.83597 21.7903 9.19473 23.6158V27.3332L12.8261 25.4565C13.8287 25.7477 14.8948 25.9046 16.0002 25.9046C21.8912 25.9046 26.6668 21.4488 26.6668 15.9522C26.6668 10.4556 21.8912 5.99984 16.0002 5.99984ZM9.87701 18.0804C10.6612 18.0804 11.3932 18.0759 12.125 18.0821C12.5362 18.0856 12.7584 18.2607 12.7962 18.5845C12.8442 18.9944 12.605 19.2664 12.1609 19.2714C11.3233 19.2809 10.4855 19.275 9.64768 19.275C9.40587 19.275 9.16349 19.2835 8.92244 19.2696C8.62187 19.2523 8.32787 19.1928 8.18415 18.8827C8.04006 18.5719 8.14015 18.293 8.33911 18.04C9.13968 17.0219 9.9412 16.0047 10.7422 14.9869C10.7898 14.9265 10.8357 14.8648 10.882 14.8043C10.833 14.7159 10.7554 14.7555 10.6949 14.7551C10.1336 14.7516 9.57215 14.7556 9.01082 14.7511C8.88254 14.7501 8.75044 14.7398 8.62701 14.7074C8.36663 14.6391 8.20854 14.4307 8.20644 14.182C8.20434 13.9329 8.35768 13.722 8.61749 13.6487C8.74025 13.6141 8.87282 13.6021 9.00111 13.6016C9.9252 13.5978 10.8493 13.5981 11.7734 13.6011C11.9367 13.6016 12.1011 13.6058 12.2597 13.6606C12.6101 13.7815 12.7643 14.1045 12.6219 14.4465C12.4978 14.7442 12.3001 14.9973 12.1027 15.2486C11.4252 16.1108 10.7452 16.9709 10.0663 17.8322C10.0136 17.899 9.96292 17.9676 9.87701 18.0804ZM14.0567 17.2472C14.0617 17.4255 14.1205 17.6652 14.2747 17.8732C14.6102 18.3257 15.2984 18.3243 15.6337 17.8723C15.9242 17.4805 15.9227 16.8304 15.6319 16.4389C15.4782 16.2321 15.273 16.1238 15.0169 16.1087C14.4487 16.0753 14.0509 16.5148 14.0567 17.2472ZM15.8889 15.3525C16.0151 15.1936 16.1404 15.0439 16.3538 15.0005C16.7609 14.9174 17.147 15.182 17.1525 15.596C17.1661 16.6319 17.161 17.668 17.1549 18.7041C17.1532 18.987 16.9789 19.2039 16.7239 19.2906C16.4567 19.3814 16.1783 19.3152 15.9998 19.09C15.9124 18.9797 15.875 18.9607 15.7531 19.0596C15.2812 19.4422 14.7489 19.5091 14.1735 19.3225C13.2505 19.023 12.8705 18.3038 12.7703 17.4228C12.6626 16.4766 12.9776 15.6645 13.8246 15.1666C14.5277 14.7532 15.2421 14.788 15.8889 15.3525ZM20.7838 17.1508C20.7824 17.416 20.8448 17.6634 21.0047 17.8783C21.3324 18.3189 22.0136 18.3224 22.348 17.8879C22.6494 17.4962 22.6504 16.8305 22.353 16.4346C22.1979 16.2282 21.9918 16.1217 21.7364 16.1082C21.1766 16.0785 20.7862 16.5065 20.7838 17.1508ZM19.4806 17.276C19.4411 15.9452 20.3142 14.9509 21.556 14.9127C22.8756 14.8721 23.8436 15.7594 23.883 17.0529C23.9229 18.3626 23.1194 19.2917 21.8803 19.416C20.5341 19.5509 19.4614 18.57 19.4806 17.276ZM19.0266 16.2455C19.0266 17.0484 19.0306 17.8513 19.025 18.6542C19.0218 19.1134 18.6166 19.4239 18.1809 19.3139C17.9192 19.2479 17.7236 18.9703 17.7231 18.6468C17.7211 17.2741 17.7223 15.9014 17.7223 14.5287C17.7223 14.287 17.7189 14.0451 17.7231 13.8035C17.7301 13.4051 17.9837 13.1465 18.3649 13.1428C18.7586 13.1389 19.0226 13.3985 19.0252 13.811C19.0302 14.6225 19.0266 15.434 19.0266 16.2455Z"
                    fill="white"
                  ></path>
                </svg>
              </a>
            </div>
    </div>

  </div>
</template>
<script>

import axios  from 'axios';
import QrcodeVue from 'qrcode.vue'
import imgUrl from '@/helper/imgurl'
const API_URL = "http://localhost:1331/api"
const IMG_URL = "http://localhost:1331"
import { AutoPlay, Fade } from "@egjs/flicking-plugins";
export default {
  name: 'App',
  components: {
    QrcodeVue,
  },
  data() {
      return {
        topPlugins: [new AutoPlay({ duration: 1400, direction: "PREV"}), new Fade()],
        bottomPlugins: [new AutoPlay({ duration: 1400, direction: "NEXT"}), new Fade()],
        codes: [],
        isImageModalActive: false,
        imageUrl: null,
        qrCode: null,
        promotionDeadline: null,
        currentPromotionId: null,
        topBanners: [],
        bottomBanners: [],
        topOption: { align: 'center', circular: true , defaultIndex: 1, inputType: ["pointer"], },
        bottomOption: { align: 'center', circular: true , defaultIndex: 1, inputType: ["pointer"], },
      };
  },
  mounted() {
    this.getPromotionList()
    this.clearMemory()
  },
  methods: {
    async getPromotionList() {
      await axios.post(`${API_URL}/promotion/promotion-list`)
        .then((res) => {
          if(localStorage.getItem('codes') === null) {
            localStorage.setItem('codes', JSON.stringify([]))
          }
          let promotionList = res.data
          promotionList.forEach(promotion => {
            if(promotion.position === 'top') {
              this.topBanners.push(promotion)
            }else{
              this.bottomBanners.push(promotion)
            }
          })
        })
    },
    async createQrCode() {
      let data = {
        today: new Date(),
        promotion_id: this.currentPromotionId,
      }
      await axios.post(`${API_URL}/promotion-log/get-qr-code`, data).then((res) => {
        this.qrCode = res.data.qr_code

        let available_date = new Date(res.data.createdAt).toJSON().slice(0,10).split('-').reverse().join('/')
        let old_data = JSON.parse(localStorage.getItem('codes'))
        old_data.push({code: this.qrCode, createdAt: available_date})
        localStorage.setItem('codes', JSON.stringify(old_data))
      })
    },
    onCliCkReceiveButton() {
      let currentIndex = this.$refs.bottomFlicking.index
      let dl = this.bottomBanners[currentIndex].deadline
      if(JSON.parse(localStorage.getItem('codes')).length >= 5) {
        this.$buefy.notification.open({
          duration: 2500,
          message: `Số lần lấy mã hôm nay đã hết. </br>Hãy quay lại vào ngày mai nhé`,
          type: 'is-danger',
        })
      }else {
        this.currentPromotionId = this.bottomBanners[currentIndex].id
        this.imageUrl = IMG_URL + this.bottomBanners[currentIndex].popup_img.url
        this.promotionDeadline = new Date(dl).toJSON().slice(0,10).split('-').reverse().join('/')
        this.isImageModalActive = true
        this.createQrCode()
      }
    },
    clearMemory() {
      let memory = JSON.parse(localStorage.getItem('codes'))
      let lastItem = memory.findLast((e) => e)
      let lastIndex = memory.findLastIndex((e) => e)
      let lastDate = lastItem.createdAt
      let now = new Date().toJSON().slice(0,10).split('-').reverse().join('/')
      if(lastDate != now) {
        localStorage.setItem('codes', JSON.stringify([]))
      }
      console.log(memory)
    },
    handleClose() {
      this.isImageModalActive = false
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body{
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
      }
    }
  }
  .bottom-slider {
    margin: 10px 0;
    max-width: 700px;
    width: 100%;
    .flicking-panel {
      width: 50%;
      margin: 0 10px;
      cursor: pointer;
      img {
        border-radius: 8px;
        height: 100%;
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
  0% { transform: scale(1) }
  10% { transform: scale(0.86) }
  30% { transform: scale(0.95) }
  50% { transform: scale(0.86) }
  70% { transform: scale(1) }
  100% { transform: scale(1) }
}
</style>
