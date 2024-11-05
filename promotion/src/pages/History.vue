<template>
    <div>
        <CheckUserPopup v-if="islogin === false"/>
        <div class="containerHistory" v-if="islogin === true">
            <div class="titlehistoryheader">Quà của bạn</div>
            <div v-for="(data, index) in historylist" :key="index">
                <div class="historyItem" @click="openCouponDetail(data.coupon_code)">
                    <div class="historycontainer1">
                        <img class="imghistory" :src="'http://localhost:1331' + data.imgFrontUrl" alt="">
                    </div>
                    <div class="historycontainer2">
                        <div class="historytitle">Mã Coupon:</div>
                        <div>{{ data.coupon_code }}</div>
                        <div class="historytitle">Thời hạn sử dụng:</div>
                        <div>{{ formatDate(data.deadline) }}</div>
                    </div>
                </div>
            </div>
            <div class="loadDataBtn" @click="nextpage" v-if="isLoadAll === false" ><b-icon class="iconBtnLoadData" pack="fa" icon="circle-down"></b-icon> xem thêm</div>
            <div class="loadDataBtn" v-if="isLoadAll === true" >đã tải toàn bộ quà</div>
        </div>
        <PromoLogPopup v-if="isOpenDetail" @closed="isOpenDetail = false" :coupon_code=coupon_code />
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CheckUserPopup from '../popup/CheckUserPopup.vue';
import PromoLogPopup from '../popup/PromoLogPopup.vue';
export default {
    components: {
        moment,
        CheckUserPopup,
        PromoLogPopup
    },
    data() {
        return {
            historylist: [],
            pagination:[],
            islogin: false,
            page:1,
            isLoadAll:false,
            isOpenDetail:false,
            coupon_code:''
        }
    },
    mounted() {
        this.gethistory()
    },
    methods: {
        openCouponDetail(code){
            this.coupon_code = code
            this.isOpenDetail = true
        },
        nextpage(){
            this.page = this.pagination.page + 1
            this.gethistory()
        },
        async gethistory() {
            let userdata = localStorage.getItem('user')
            if (userdata.length - 2 === 0) {
                this.islogin = false
            } else {
                this.islogin = true
                let user1 = JSON.parse(userdata)
                console.log(user1[0].phone);
                let phone = user1[0].phone
                let dataHistory = await axios.get(`http://localhost:1331/api/promotion-log?phone=${phone}&page=${this.page}&pageSize=5`)
                console.log(dataHistory);
                if (dataHistory.status === 200) {
                    this.historylist.push(...dataHistory.data.data) 
                    this.pagination = dataHistory.data.pagination
                    if (this.historylist.length === this.pagination.totalItems) {
                        this.isLoadAll = true
                        console.log(this.isLoadAll);
                        
                    }
                }
            }
        },

        formatDate(date) {
            return moment(date).format("DD-MM-YYYY")
        },
    }

}
</script>

<style lang="scss" scoped>
.containerHistory {
    width: 100%;
    height: 100%;
    padding: 10px;

    .titlehistoryheader {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
        border-left: 4px solid #215AA8;
        padding-left: 5px
    }

    .historyItem {
        display: flex;
        box-sizing: border-box;
        padding: 10px;
        height: 110px;
        border-radius: 10px;
        box-shadow: rgba(187, 192, 196, 0.647) 0px 1px 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .historycontainer1 {
        width: 20%;
        overflow: hidden;
        border-radius: 5px
    }

    .historycontainer2 {
        width: 80%;
        padding-left: 10px;
        font-size: 14px;
        font-weight: 500;

        .historytitle {
            font-size: 14px;
            font-weight: 400;
        }
    }

    .imghistory {
        width: 100%;
    }
    .loadDataBtn{
        display: flex;
        font-size: 14px;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        height: 40px;
        .iconBtnLoadData{
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }
}
</style>